export const ArrowToMeDoodle = () => (
  <div className="select-none" style={{ transform: "rotate(-22deg)", transformOrigin: "center" }}>
    <svg viewBox="0 0 120 80" className="w-28 h-20 fill-none stroke-pink-500 dark:stroke-pink-400 stroke-[3.5px] overflow-visible">

      <text
        x="15"
        y="18"
        className="fill-pink-500 dark:fill-pink-400 font-bold stroke-none"
        stroke="none"
        style={{
          fontFamily: "'Caveat', cursive",
          fontSize: "21px",
        }}
        transform="rotate(26 50 18)"
      >
        that's me! 👋
      </text>

      <path
        d="M 85 38 C 80 60, 50 70, 22 50"
        strokeLinecap="round"
      />

      <path
        d="M 38 40 L 22 50 L 24 66"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export const UnderlineDoodle = () => (
  <div className="w-full relative py-1 pointer-events-none select-none">
    <svg viewBox="0 0 220 20" className="w-full h-5 fill-none stroke-purple-500 dark:stroke-purple-400 stroke-[3px] overflow-visible">
      <path
        d="M 5 8 C 55 12, 110 5, 215 8"
        strokeLinecap="round"
      />
      <path
        d="M 15 13 C 70 17, 130 11, 205 12"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

export const ResumeHighlightDoodle = () => (
  <div className="absolute left-[65px] top-[-35px] select-none pointer-events-none w-36 h-16">
    <svg viewBox="0 0 130 60" className="w-full h-full fill-none stroke-amber-500 dark:stroke-amber-400 stroke-[2.5px] overflow-visible">

      <text
        x="45"
        y="10"
        className="fill-amber-500 dark:fill-amber-400 font-bold stroke-none"
        stroke="none"
        style={{
          fontFamily: "'Caveat', cursive",
          fontSize: "17px",
        }}
        transform="rotate(-4 65 18)"
      >
        view my resume!
      </text>

      <path
        d="M 95 26 C 75 22, 45 25, 20 45"
        strokeLinecap="round"
      />

      <path
        d="M 32 26 L 20 45 L 34 62"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);
