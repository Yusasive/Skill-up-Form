"use client";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-800 to-green-600 text-white py-6 shadow-md">
      <div className="container mx-auto flex flex-col items-center text-center">
        {/* Footer Content */}
        <h2 className="text-2xl font-extrabold tracking-wide drop-shadow-lg">
          Developed by{" "}
          <a
            href="https://linkedin.com/in/yuusuf-abdullahi-temidayo-yusasive/"
            className="text-yellow-300 hover:text-yellow-400 transition duration-300"
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
