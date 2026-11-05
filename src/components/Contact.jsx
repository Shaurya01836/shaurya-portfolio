import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import {
  RiMailLine,
  RiSendPlaneLine,
  RiLoader4Line,
  RiCheckLine,
  RiTimeLine,
  RiMapPinLine,
} from "@remixicon/react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        timestamp: serverTimestamp(),
      });

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

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

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  return (
    <div
      id="contact"
      className="flex w-full flex-col gap-4 px-8 py-10 text-black dark:text-white transition-colors duration-300"
    >
      {/* Section Header */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
          Contact
        </h1>
        <div className="h-[1px] flex-grow bg-gray-200 dark:bg-[#1F1F1F] relative overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-16 tech-ruler-ticks-x opacity-40" />
        </div>
      </div>

      {/* Structural Communication Matrix Frame */}
      <div className="flex flex-col border border-gray-200 dark:border-[#1F1F1F] rounded-md overflow-hidden bg-white dark:bg-[#0A0A0A]">
        {/* Header Strip with System Metadata */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/80 dark:bg-[#121212] border-b border-gray-200 dark:border-[#1F1F1F] select-none">
          <div className="flex items-center gap-2">
            <h2 className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider font-tech">
              Direct Transmission
            </h2>
          </div>
          
        </div>

        {/* Connected 2-Pane Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-[#1F1F1F]">
          {/* Left 5 Columns: Coordinates Ledger */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white dark:bg-[#0A0A0A]">
            <div className="p-6 sm:p-7 flex flex-col gap-3">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-snug">
                Let&apos;s build something scalable.
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Whether you have an engineering opportunity, a technical project to discuss, or a collaborative inquiry, I am available to connect.
              </p>
            </div>

            {/* Ledger Cells */}
            <div className="flex flex-col border-t border-gray-200 dark:border-[#1F1F1F] divide-y divide-gray-200 dark:divide-[#1F1F1F]">
              {/* Email */}
              <a
                href="mailto:shaurya01836@gmail.com"
                className="p-4 sm:p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#121212] transition-colors group select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded border border-gray-200 dark:border-[#222222] bg-gray-50 dark:bg-[#141414] text-gray-600 dark:text-gray-400">
                    <RiMailLine size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-tech text-[10px] text-gray-400 dark:text-gray-500 uppercase">
                      01. Direct Email
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors">
                      shaurya01836@gmail.com
                    </span>
                  </div>
                </div>
                <span className="font-tech text-xs text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                  ↗
                </span>
              </a>

              {/* Response Window */}
              <div className="p-4 sm:p-5 flex items-center gap-3 select-none">
                <div className="p-2 rounded border border-gray-200 dark:border-[#222222] bg-gray-50 dark:bg-[#141414] text-gray-600 dark:text-gray-400">
                  <RiTimeLine size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="font-tech text-[10px] text-gray-400 dark:text-gray-500 uppercase">
                    02. Response Window
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Within 24 Hours
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 sm:p-5 flex items-center gap-3 select-none">
                <div className="p-2 rounded border border-gray-200 dark:border-[#222222] bg-gray-50 dark:bg-[#141414] text-gray-600 dark:text-gray-400">
                  <RiMapPinLine size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="font-tech text-[10px] text-gray-400 dark:text-gray-500 uppercase">
                    03. Base Region
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Jaipur, India (IST / UTC+5:30)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Transmission Form */}
          <div className="lg:col-span-7 p-6 sm:p-7 flex flex-col justify-between bg-white dark:bg-[#0A0A0A]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#1A1A1A] select-none">
                <span className="font-tech text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Compose Transmission
                </span>
                <span className="font-tech text-[10px] text-gray-400">
                  ENCRYPTED
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="font-tech text-[10px] uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                  Sender Name *
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full rounded border border-gray-200 dark:border-[#1F1F1F] bg-gray-50/50 dark:bg-[#0E0E0E] px-3.5 py-2.5 font-tech text-xs sm:text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:border-gray-400 dark:focus:border-gray-600 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="font-tech text-[10px] uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                  Sender Email *
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full rounded border border-gray-200 dark:border-[#1F1F1F] bg-gray-50/50 dark:bg-[#0E0E0E] px-3.5 py-2.5 font-tech text-xs sm:text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:border-gray-400 dark:focus:border-gray-600 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="font-tech text-[10px] uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                  Transmission Message *
                </label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message or project requirements..."
                  className="w-full resize-none rounded border border-gray-200 dark:border-[#1F1F1F] bg-gray-50/50 dark:bg-[#0E0E0E] px-3.5 py-2.5 font-tech text-xs sm:text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:border-gray-400 dark:focus:border-gray-600 focus:outline-none transition-colors"
                />
              </div>

              <button
                disabled={isLoading || isSuccess}
                type="submit"
                className={`mt-2 flex items-center justify-center gap-2 rounded px-6 py-2.5 font-tech text-xs uppercase tracking-wider transition-all duration-200 select-none ${
                  isSuccess
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-xs"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {isLoading ? (
                  <>
                    <RiLoader4Line className="animate-spin" size={16} />
                    <span>Transmitting...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <RiCheckLine size={16} />
                    <span>Transmission Received!</span>
                  </>
                ) : (
                  <>
                    <RiSendPlaneLine size={16} />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>

              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="font-tech text-xs text-rose-500 text-center select-none"
                  >
                    Transmission failed. Please check network connection or retry.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
