import { useState } from "react";
import {
  RiMailLine,
  RiGithubLine,
  RiLinkedinLine,
  RiTwitterXLine,
  RiSendPlaneLine,
  RiLoader4Line,
  RiCheckLine,
  RiExternalLinkLine,
} from "@remixicon/react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import CopyField from "./ui/copy-field";
import BlueprintSection from "./ui/BlueprintSection";
import SectionHeader from "./ui/SectionHeader";

const socialChannels = [
  {
    name: "GitHub",
    href: "https://github.com/Shaurya01836",
    icon: RiGithubLine,
    handle: "@Shaurya01836",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/this-is-shaurya-upadhyay",
    icon: RiLinkedinLine,
    handle: "Shaurya Upadhyay",
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/shaurya01836",
    icon: RiTwitterXLine,
    handle: "@shaurya01836",
  },
  {
    name: "Email Direct",
    href: "mailto:shaurya01836@gmail.com",
    icon: RiMailLine,
    handle: "shaurya01836@gmail.com",
  },
];

const ContactSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
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

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
          publicKey
        );
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setStatus("idle");
        setShowForm(false);
      }, 4000);
    } catch (err) {
      console.error("Error submitting contact:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <BlueprintSection id="contact" ariaLabel="Contact Information">
      {/* 2-cell Section Header */}
      <SectionHeader
        number="07"
        label="CONTACT"
        title="Direct"
        accentWord="Transmission"
        description="Available for full-time engineering roles, high-throughput systems, and consulting"
      />

      {/* Main Grid: Left side Email + Actions, Right side Social Cells */}
      <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[var(--line)]">
        {/* Left Side: Copy Field + CTAs */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between gap-6 border-b md:border-b-0 md:border-r border-[var(--line)]">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-[#F4F4F5]">
              Let&apos;s build together.
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-[#71717A] leading-relaxed">
              Have an open position, an ambitious web product, or need a robust Java / React architecture? Reach out directly or initiate a transmission below.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Interactive Copy Field */}
            <CopyField text="shaurya01836@gmail.com" label="EMAIL" />

            <div className="flex flex-wrap items-center gap-3">
              {/* Primary Email Button: Solid White / Near-black */}
              <a
                href="mailto:shaurya01836@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-gray-950 dark:bg-[#F4F4F5] text-white dark:text-[#07070A] font-medium text-xs font-tech tracking-wider uppercase transition-colors hover:bg-gray-800 dark:hover:bg-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF]"
              >
                <RiMailLine size={16} />
                <span>OPEN MAIL CLIENT</span>
                <span className="text-xs">↗</span>
              </a>

              {/* Toggle Contact Form Button: 1px Outlined */}
              <button
                type="button"
                onClick={() => setShowForm(!showForm)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-none border border-[var(--line)] bg-[var(--surface)] text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04] text-xs font-tech tracking-wider uppercase transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF]"
              >
                <span>{showForm ? "HIDE FORM" : "SEND MESSAGE"}</span>
                <span className="font-tech text-xs">{showForm ? "−" : "+"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: 4 Social Cells in 2x2 Grid with 1px hairlines */}
        <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 bg-black/[0.015] dark:bg-white/[0.01]">
          {socialChannels.map((channel, i) => {
            const Icon = channel.icon;
            return (
              <a
                key={channel.name}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`p-6 flex flex-col justify-between gap-4 border-b border-r last:border-r-0 border-[var(--line)] hover:bg-black/[0.03] dark:hover:bg-white/[0.025] transition-colors group ${
                  i % 2 === 1 ? "sm:border-r-0" : ""
                }`}
              >
                <div className="flex items-center justify-between text-gray-400 dark:text-[#71717A] group-hover:text-black dark:group-hover:text-[#CDBDFF] transition-colors">
                  <Icon size={20} />
                  <RiExternalLinkLine size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-tech text-xs font-medium text-gray-900 dark:text-[#F4F4F5] uppercase tracking-wider">
                    {channel.name}
                  </span>
                  <span className="font-tech text-[11px] text-gray-500 dark:text-[#71717A] truncate">
                    {channel.handle}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Expandable Contact Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-b border-[var(--line)] bg-[var(--surface)]"
          >
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 flex flex-col gap-5 max-w-2xl mx-auto">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                <span className="font-tech text-xs tracking-wider uppercase text-gray-400 dark:text-[#71717A]">
                  [Direct Message Transmission]
                </span>
                <span className="font-tech text-[10px] text-gray-400">ENCRYPTED / FIRESTORE</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="font-tech text-xs text-gray-500 dark:text-[#71717A] uppercase tracking-wider">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-3.5 py-2.5 rounded-none border border-[var(--line)] bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 font-tech text-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="font-tech text-xs text-gray-500 dark:text-[#71717A] uppercase tracking-wider">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-none border border-[var(--line)] bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 font-tech text-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="font-tech text-xs text-gray-500 dark:text-[#71717A] uppercase tracking-wider">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, timeline, or open role..."
                  className="w-full px-3.5 py-2.5 rounded-none border border-[var(--line)] bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 font-tech text-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF] resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-none bg-gray-950 dark:bg-[#F4F4F5] text-white dark:text-[#07070A] font-medium text-xs font-tech tracking-wider uppercase transition-colors hover:bg-gray-800 dark:hover:bg-white disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <RiLoader4Line size={15} className="animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : status === "success" ? (
                    <>
                      <RiCheckLine size={15} className="text-emerald-500" />
                      <span>Message Transmitted!</span>
                    </>
                  ) : (
                    <>
                      <RiSendPlaneLine size={14} />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>

                {status === "error" && (
                  <span className="text-xs font-tech text-rose-500">
                    Transmission failed. Please use direct email.
                  </span>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </BlueprintSection>
  );
};

export default ContactSection;
