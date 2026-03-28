import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase.config";

const MigrateBlogs = () => {
    const [status, setStatus] = useState("idle");
    const [progress, setProgress] = useState(0);
    const [total, setTotal] = useState(0);
    const [logs, setLogs] = useState([]);

    const PROD_API = "https://blog-api-nhru.onrender.com";

    const addLog = (msg) => setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);

    const startMigration = async () => {
        setStatus("migrating");
        addLog("Starting migration...");
        
        try {
            // 1. Fetch from Render
            addLog(`Fetching from ${PROD_API}/api/blogs...`);
            const response = await fetch(`${PROD_API}/api/blogs`);
            if (!response.ok) throw new Error("Failed to fetch from Render API");
            
            const blogs = await response.json();
            setTotal(blogs.length);
            addLog(`Found ${blogs.length} blogs.`);

            // 2. Upload to Firestore
            for (let i = 0; i < blogs.length; i++) {
                const blog = blogs[i];
                
                // Check if blog already exists by title (to avoid duplicates)
                const q = query(collection(db, "blogs"), where("title", "==", blog.title));
                const existingSnap = await getDocs(q);
                
                if (existingSnap.empty) {
                    addLog(`Migrating: "${blog.title}"...`);
                    await addDoc(collection(db, "blogs"), {
                        title: blog.title,
                        content: blog.content,
                        category: blog.category || "General",
                        thumbnailUrl: blog.thumbnailUrl || "",
                        createdAt: blog.createdAt ? new Date(blog.createdAt) : serverTimestamp(),
                    });
                } else {
                    addLog(`Skipped: "${blog.title}" (Already exists)`);
                }
                
                setProgress(i + 1);
            }

            setStatus("success");
            addLog("MIGRATION COMPLETE!");
        } catch (error) {
            console.error(error);
            setStatus("error");
            addLog(`ERROR: ${error.message}`);
        }
    };

    return (
        <div className="p-8 flex flex-col gap-6 max-w-2xl mx-auto dark:text-white">
            <h1 className="text-2xl font-bold">Blog Migration Tool</h1>
            <p className="text-gray-500">Moves data from Render API to Firestore.</p>

            {status === "idle" && (
                <button 
                    onClick={startMigration}
                    className="bg-blue-600 px-6 py-2 rounded-md font-bold text-white hover:bg-blue-700 transition-colors"
                >
                    Start Migration
                </button>
            )}

            {(status === "migrating" || status === "success" || status === "error") && (
                <div className="flex flex-col gap-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-4 overflow-hidden">
                        <div 
                            className="bg-green-500 h-full transition-all duration-300" 
                            style={{ width: `${(progress / total) * 100}%` }}
                        ></div>
                    </div>
                    <p className="font-medium text-center">{progress} / {total} blogs processed</p>
                    
                    <div className="bg-gray-100 dark:bg-[#111] p-4 rounded-md font-mono text-sm h-64 overflow-y-auto flex flex-col gap-1 border border-gray-200 dark:border-gray-800">
                        {logs.map((log, i) => (
                            <div key={i} className="border-b border-gray-200 dark:border-gray-800/50 pb-1">{log}</div>
                        ))}
                    </div>

                    {status === "success" && (
                        <div className="bg-green-100/10 border border-green-500/50 text-green-500 p-4 rounded-md text-center font-bold">
                            ✅ Migration Successful! You can now remove this component.
                        </div>
                    )}

                    {status === "error" && (
                        <div className="bg-red-100/10 border border-red-500/50 text-red-500 p-4 rounded-md text-center font-bold">
                            ❌ Migration Failed. See logs above.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MigrateBlogs;
