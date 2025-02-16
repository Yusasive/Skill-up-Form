export default function AnimatedDivider() {
  return (
    <div className="relative w-full overflow-hidden leading-none">
      <svg
        className="absolute left-0 w-full h-20 text-white"
        viewBox="0 0 1440 320"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,256L60,245.3C120,235,240,213,360,181.3C480,149,600,107,720,106.7C840,107,960,149,1080,170.7C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </svg>
    </div>
  );
}
