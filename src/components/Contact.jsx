import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { RiMailLine, RiSendPlaneLine, RiLoader4Line, RiCheckLine } from "@remixicon/react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Error sending message: ", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div id="contact" className="flex flex-col py-20 w-full px-8 gap-8 text-black dark:text-white">
      <div className="flex items-center gap-4">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
          Contact
        </h1>
        <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full mx-auto">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Get in touch</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            Whether you have a question, a project idea, or just want to say hi, my inbox is always open. I'll do my best to get back to you as soon as possible!
          </p>
          
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
              <div className="p-3 rounded-md bg-gray-100 dark:bg-[#1F1F1F] text-blue-500">
                <RiMailLine size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-500 font-medium">Email</p>
                <p className="text-lg font-semibold">shaurya01836@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="px-4 py-3 bg-white dark:bg-[#0D0D0D] border border-solid border-gray-200 dark:border-[#1F1F1F] rounded-md focus:outline-none focus:border-blue-500 transition-colors w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="px-4 py-3 bg-white dark:bg-[#0D0D0D] border border-solid border-gray-200 dark:border-[#1F1F1F] rounded-md focus:outline-none focus:border-blue-500 transition-colors w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              required
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="How can I help you?"
              className="px-4 py-3 bg-white dark:bg-[#0D0D0D] border border-solid border-gray-200 dark:border-[#1F1F1F] rounded-md focus:outline-none focus:border-blue-500 transition-colors w-full resize-none"
            ></textarea>
          </div>

          <button
            disabled={status === "loading" || status === "success"}
            type="submit"
            className={`mt-4 px-8 py-3 rounded-md font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
              status === "success"
                ? "bg-green-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl active:scale-95"
            } disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {status === "loading" ? (
              <>
                <RiLoader4Line className="animate-spin" size={20} />
                Sending...
              </>
            ) : status === "success" ? (
              <>
                <RiCheckLine size={20} />
                Message Sent!
              </>
            ) : (
              <>
                <RiSendPlaneLine size={20} />
                Send Message
              </>
            )}
          </button>
          
          {status === "error" && (
            <p className="text-red-500 text-sm mt-2 text-center">
              Failed to send message. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
