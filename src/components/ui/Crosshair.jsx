import PropTypes from "prop-types";

export const Crosshair = ({ className = "" }) => {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-[var(--crosshair)] shrink-0 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <line x1="0" y1="5.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
      <line x1="5.5" y1="0" x2="5.5" y2="11" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
    </svg>
  );
};

Crosshair.propTypes = {
  className: PropTypes.string,
};

export default Crosshair;

