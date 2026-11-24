import { Link } from "react-router-dom";
import BlueprintSection from "../components/ui/BlueprintSection";
import SectionHeader from "../components/ui/SectionHeader";
import Footer from "../components/Footer";
import { ArrowLeftIcon, ShieldCheckIcon, CheckTickCircleIcon } from "../components/icons";
import { playClickSound } from "../utils/sound";

const Privacy = () => {
  return (
    <div className="w-full flex flex-col">
      <BlueprintSection id="privacy-policy" ariaLabel="Privacy Policy" noTopBorder={true}>
        {/* Header */}
        <SectionHeader
          number="01"
          label="LEGAL"
          title="Privacy"
          accentWord="Policy"
          description="How data is handled, stored, and protected on this portfolio"
        />

        {/* Content Container */}
        <div className="p-6 sm:p-10 md:p-14 max-w-4xl mx-auto flex flex-col gap-10 text-gray-700 dark:text-gray-300 font-sans leading-relaxed">
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--line)] font-tech text-xs text-gray-500 dark:text-[#71717A]">
            <div className="flex items-center gap-2">
              <span>STATUS: ACTIVE &amp; COMPLIANT</span>
            </div>
            <div>LAST REVISED: NOVEMBER 24, 2026</div>
          </div>

          {/* Quick Summary Pill Banner */}
          <div className="p-5 border border-[var(--line)] bg-[var(--surface)] flex items-start gap-4">
            <div className="flex flex-col gap-1 text-xs sm:text-sm">
              <strong className="text-gray-900 dark:text-[#F4F4F5] font-tech uppercase tracking-wider">
                Summary of Practices
              </strong>
              <p className="text-gray-500 dark:text-[#71717A]">
                This site is a developer portfolio. It does not sell personal information, does not track you across other websites, and utilizes privacy-first, cookieless telemetry.
              </p>
            </div>
          </div>

          {/* Section 1: Overview */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-[#F4F4F5] font-tech uppercase tracking-wide">
              1. Overview
            </h2>
            <p className="text-sm sm:text-base">
              This Privacy Policy describes how <strong>Shaurya Upadhyay</strong> (&ldquo;I&rdquo;, &ldquo;me&rdquo;, or &ldquo;my&rdquo;) handles personal data collected through this website (<span className="text-[#CDBDFF] font-tech">https://www.ershaurya.dev</span>). I value your privacy and aim to collect only what is necessary to operate, optimize, and secure this site.
            </p>
          </section>

          {/* Section 2: Information Collected */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-[#F4F4F5] font-tech uppercase tracking-wide">
              2. Information Collected
            </h2>
            <div className="flex flex-col gap-3 text-sm sm:text-base">
              <p>
                <strong>A. Contact Inquiries:</strong> When you submit the contact form or send an email, I receive the information you provide, such as your name, email address, message body, and timestamps. This information is used strictly to communicate back with you regarding open engineering roles, collaborations, or inquiries.
              </p>
              <p>
                <strong>B. Privacy-Preserving Analytics:</strong> This site uses an instance of Umami Cloud analytics to measure anonymous page views and interactions. Umami does not set cookies, does not collect personal data, does not store IP addresses, and does not track users across websites or sessions.
              </p>
              <p>
                <strong>C. Client-Side Preferences:</strong> Your UI preferences (such as light/dark mode and sound mute status) and ephemeral API caches are retained locally in your browser&apos;s <code className="font-tech text-xs px-1.5 py-0.5 border border-[var(--line)] bg-[var(--surface)] text-gray-900 dark:text-gray-200">localStorage</code> and <code className="font-tech text-xs px-1.5 py-0.5 border border-[var(--line)] bg-[var(--surface)] text-gray-900 dark:text-gray-200">sessionStorage</code>. This data never leaves your device.
              </p>
            </div>
          </section>

          {/* Section 3: Third-Party Infrastructure */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-[#F4F4F5] font-tech uppercase tracking-wide">
              3. Third-Party Infrastructure
            </h2>
            <p className="text-sm sm:text-base">
              To host, build, and deliver this portfolio smoothly, the following third-party infrastructure providers may process standard HTTP network metadata (such as IP addresses and user agents) in server logs:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm font-tech">
              <li className="p-3 border border-[var(--line)] bg-[var(--surface)] flex items-center gap-2">
                <CheckTickCircleIcon width={14} height={14} className="text-emerald-500 shrink-0" />
                <span>Vercel (Hosting &amp; Edge CDN)</span>
              </li>
              <li className="p-3 border border-[var(--line)] bg-[var(--surface)] flex items-center gap-2">
                <CheckTickCircleIcon width={14} height={14} className="text-emerald-500 shrink-0" />
                <span>Google Firebase (Firestore Data)</span>
              </li>
              <li className="p-3 border border-[var(--line)] bg-[var(--surface)] flex items-center gap-2">
                <CheckTickCircleIcon width={14} height={14} className="text-emerald-500 shrink-0" />
                <span>EmailJS (Contact Form Delivery)</span>
              </li>
              <li className="p-3 border border-[var(--line)] bg-[var(--surface)] flex items-center gap-2">
                <CheckTickCircleIcon width={14} height={14} className="text-emerald-500 shrink-0" />
                <span>Umami (Cookieless Analytics)</span>
              </li>
            </ul>
          </section>

          {/* Section 4: Data Retention & Rights */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-[#F4F4F5] font-tech uppercase tracking-wide">
              4. Data Retention &amp; Your Rights
            </h2>
            <p className="text-sm sm:text-base">
              Contact messages sent through the site are retained only as long as necessary to conduct correspondence or project discussions. You have the right at any time to request the deletion or correction of any correspondence you have sent me.
            </p>
          </section>

          {/* Section 5: Contact */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-[#F4F4F5] font-tech uppercase tracking-wide">
              5. Contact Information
            </h2>
            <p className="text-sm sm:text-base">
              If you have any questions or privacy concerns regarding this policy, please email me directly:
            </p>
            <div className="pt-1">
              <a
                href="mailto:shaurya01836@gmail.com"
                className="inline-flex items-center gap-2 font-tech text-xs tracking-wider uppercase text-gray-900 dark:text-[#F4F4F5] hover:text-[#CDBDFF] dark:hover:text-[#CDBDFF] transition-colors underline underline-offset-4"
              >
                shaurya01836@gmail.com
              </a>
            </div>
          </section>

          {/* Back Navigation Button */}
          <div className="pt-8 border-t border-[var(--line)]">
            <Link
              to="/"
              onClick={playClickSound}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--line)] bg-gray-950 dark:bg-[#F4F4F5] text-white dark:text-[#07070A] font-tech text-xs tracking-wider uppercase transition-all hover:bg-gray-800 dark:hover:bg-white hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDBDFF]"
            >
              <ArrowLeftIcon width={15} height={15} aria-hidden />
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      </BlueprintSection>

      <Footer />
    </div>
  );
};

export default Privacy;
