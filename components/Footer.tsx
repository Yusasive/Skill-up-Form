"use client";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#252525] to-[#676767] text-white py-6 shadow-md">
      <div className="container mx-auto flex flex-col items-center text-center">
       
        <h2 className="text-2xl font-extrabold tracking-wide drop-shadow-lg">
          Developed by{" "}
          <a
            href="https://linkedin.com/in/yuusuf-abdullahi-temidayo-yusasive/"
            className="text-yellow-200 hover:text-yellow-400 transition duration-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yusasive
          </a>
        </h2>
        <p className="text-sm mt-2 opacity-90">
          © {new Date().getFullYear()} All rights reserved.
        </p>

    
        <div className="w-20 h-1 bg-white rounded-full mt-3 opacity-80"></div>
      </div>
    </footer>
  );
}
