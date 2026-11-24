import { Link } from "react-router-dom";
import BlueprintSection from "../components/ui/BlueprintSection";
import SectionHeader from "../components/ui/SectionHeader";
import Footer from "../components/Footer";
import { ArrowLeftIcon, FileIcon } from "../components/icons";
import { playClickSound } from "../utils/sound";

const Terms = () => {
  return (
    <div className="w-full flex flex-col">
      <BlueprintSection id="terms-of-use" ariaLabel="Terms of Use" noTopBorder={true}>
        {/* Header */}
        <SectionHeader
          number="02"
          label="LEGAL"
          title="Terms of"
          accentWord="Use"
          description="Guidelines, licensing, and acceptable use terms for this website"
        />

        {/* Content Container */}
        <div className="p-6 sm:p-10 md:p-14 max-w-4xl mx-auto flex flex-col gap-10 text-gray-700 dark:text-gray-300 font-sans leading-relaxed">
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--line)] font-tech text-xs text-gray-500 dark:text-[#71717A]">
            <div className="flex items-center gap-2">
              <span>TERMS &amp; LICENSING</span>
            </div>
            <div>LAST REVISED: NOVEMBER 24, 2026</div>
          </div>

          {/* Quick Summary Pill Banner */}
          <div className="p-5 border border-[var(--line)] bg-[var(--surface)] flex items-start gap-4">
            <div className="flex flex-col gap-1 text-xs sm:text-sm">
              <strong className="text-gray-900 dark:text-[#F4F4F5] font-tech uppercase tracking-wider">
                Summary of Terms
              </strong>
              <p className="text-gray-500 dark:text-[#71717A]">
                You are welcome to browse, read, share, and inspect the code of this portfolio. Project code published to open-source repositories carries its respective open-source licenses (MIT/Apache 2.0).
              </p>
            </div>
          </div>

          {/* Section 1: Agreement to Terms */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-[#F4F4F5] font-tech uppercase tracking-wide">
              1. Agreement to Terms
            </h2>
            <p className="text-sm sm:text-base">
              By accessing or using <span className="text-[#CDBDFF] font-tech">https://www.ershaurya.dev</span>, you agree to comply with and be bound by these Terms of Use. If you disagree with any part of these terms, you should discontinue use of the website.
            </p>
          </section>

          {/* Section 2: Intellectual Property & Open-Source Code */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-[#F4F4F5] font-tech uppercase tracking-wide">
              2. Intellectual Property &amp; Code Licensing
            </h2>
            <div className="flex flex-col gap-3 text-sm sm:text-base">
              <p>
                <strong>A. Open-Source Repositories:</strong> Code repositories linked on this site (such as CrickAuction and GitHub projects under <code className="font-tech text-xs px-1.5 py-0.5 border border-[var(--line)] bg-[var(--surface)] text-gray-900 dark:text-gray-200">github.com/Shaurya01836</code>) are released under their respective open-source licenses (typically the MIT License). You are free to inspect, fork, and study those projects in accordance with their licenses.
              </p>
              <p>
                <strong>B. Site Design &amp; Editorial Content:</strong> All custom design elements, written articles, case studies, graphics, and branding are the intellectual property of <strong>Shaurya Upadhyay</strong> unless otherwise stated. You may quote or link to this content with proper attribution to <span className="text-[#CDBDFF] font-tech">ershaurya.dev</span>.
              </p>
            </div>
          </section>

          {/* Section 3: Acceptable Use & AI Agents */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-[#F4F4F5] font-tech uppercase tracking-wide">
              3. Acceptable Use &amp; AI Agents
            </h2>
            <div className="flex flex-col gap-3 text-sm sm:text-base">
              <p>
                You agree not to use this site for any unlawful purpose, to inject malicious code, or to disrupt the site&apos;s infrastructure through denial-of-service attempts.
              </p>
              <p>
                <strong>AI Assistants &amp; Web Crawlers:</strong> Automated agents, search engines, and LLMs are welcome to index and parse this site in accordance with <code className="font-tech text-xs px-1.5 py-0.5 border border-[var(--line)] bg-[var(--surface)] text-gray-900 dark:text-gray-200">robots.txt</code>, <code className="font-tech text-xs px-1.5 py-0.5 border border-[var(--line)] bg-[var(--surface)] text-gray-900 dark:text-gray-200">llms.txt</code>, and <code className="font-tech text-xs px-1.5 py-0.5 border border-[var(--line)] bg-[var(--surface)] text-gray-900 dark:text-gray-200">agents.md</code> at polite crawl rates.
              </p>
            </div>
          </section>

          {/* Section 4: External Links & Third-Party Services */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-[#F4F4F5] font-tech uppercase tracking-wide">
              4. External Links
            </h2>
            <p className="text-sm sm:text-base">
              This site contains links to third-party websites (such as GitHub, LinkedIn, X/Twitter, and LeetCode). I do not control and am not responsible for the content, privacy practices, or policies of those third-party sites.
            </p>
          </section>

          {/* Section 5: Disclaimer & Limitation of Liability */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-[#F4F4F5] font-tech uppercase tracking-wide">
              5. Disclaimer &amp; Limitation of Liability
            </h2>
            <p className="text-sm sm:text-base">
              This website and its contents are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, either express or implied. I make no guarantees regarding uninterrupted access or that the site is entirely free of errors.
            </p>
          </section>

          {/* Section 6: Contact */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-[#F4F4F5] font-tech uppercase tracking-wide">
              6. Contact Information
            </h2>
            <p className="text-sm sm:text-base">
              For any questions or legal inquiries regarding these terms, reach out at:
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

export default Terms;

