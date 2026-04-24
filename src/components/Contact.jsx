import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import {
  RiMailLine,
  RiSendPlaneLine,
  RiLoader4Line,
  RiCheckLine,
  RiTimeLine,
  RiMessage3Line,
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
      className="flex w-full flex-col gap-8 px-8 py-20 text-black dark:text-white"
    >
      <div className="flex items-center gap-4">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
          Contact
        </h1>
        <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]"></div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-xl border border-solid border-gray-200 bg-white p-6 shadow-sm dark:border-[#1F1F1F] dark:bg-[#0A0A0A]"
        >
          <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-blue-100/70 blur-3xl dark:bg-blue-900/20" />
          <div className="relative flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Let&apos;s build something useful.
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              Whether you have a project idea, collaboration in mind, or just want
              to say hello, I&apos;m happy to connect.
            </p>

            <div className="mt-2 grid gap-3">
              <motion.a
                href="mailto:shaurya01836@gmail.com"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                className="group flex items-center gap-4 rounded-md border border-solid border-gray-200 bg-gray-50 p-4 transition-colors hover:border-gray-300 dark:border-[#1F1F1F] dark:bg-[#111111] dark:hover:border-[#2B2B2B]"
              >
                <div className="rounded-md bg-white p-3 text-blue-500 shadow-sm dark:bg-[#1A1A1A]">
                  <RiMailLine size={22} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500">
                    Email
                  </p>
                  <p className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                    shaurya01836@gmail.com
                  </p>
                </div>
              </motion.a>

              <motion.div
                whileHover={{ y: -2 }}
                className="flex items-center gap-4 rounded-md border border-solid border-gray-200 bg-gray-50 p-4 transition-colors hover:border-gray-300 dark:border-[#1F1F1F] dark:bg-[#111111] dark:hover:border-[#2B2B2B]"
              >
                <div className="rounded-md bg-white p-3 text-blue-500 shadow-sm dark:bg-[#1A1A1A]">
                  <RiTimeLine size={22} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500">
                    Response Time
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Usually within 24 hours
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="flex w-full flex-col gap-4 rounded-xl border border-solid border-gray-200 bg-white p-6 shadow-sm dark:border-[#1F1F1F] dark:bg-[#0A0A0A]"
        >
          <div className="mb-1 flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <RiMessage3Line size={18} className="text-blue-500" />
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Send a message
            </span>
          </div>

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
              className="w-full rounded-md border border-solid border-gray-200 bg-white px-4 py-3 transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-[#1F1F1F] dark:bg-[#0D0D0D]"
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
              className="w-full rounded-md border border-solid border-gray-200 bg-white px-4 py-3 transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-[#1F1F1F] dark:bg-[#0D0D0D]"
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
              className="w-full resize-none rounded-md border border-solid border-gray-200 bg-white px-4 py-3 transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-[#1F1F1F] dark:bg-[#0D0D0D]"
            ></textarea>
          </div>

          <motion.button
            whileHover={!isLoading && !isSuccess ? { y: -1 } : {}}
            whileTap={!isLoading && !isSuccess ? { scale: 0.98 } : {}}
            disabled={isLoading || isSuccess}
            type="submit"
            className={`mt-2 flex items-center justify-center gap-2 rounded-md px-8 py-3 font-bold transition-all duration-300 ${
              isSuccess
                ? "bg-green-600 text-white"
                : "bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:shadow-xl"
            } disabled:cursor-not-allowed disabled:opacity-70`}
          >
            {isLoading ? (
              <>
                <RiLoader4Line className="animate-spin" size={20} />
                Sending...
              </>
            ) : isSuccess ? (
              <>
                <RiCheckLine size={20} />
                Message Sent!
              </>
            ) : (
              <>
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  <RiSendPlaneLine size={20} />
                </motion.span>
                Send Message
              </>
            )}
          </motion.button>

          <AnimatePresence>
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-1 text-center text-sm text-red-500"
              >
                Failed to send message. Please try again.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
