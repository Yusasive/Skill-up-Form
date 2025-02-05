"use client";

export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-100">
      <h1 className="text-6xl font-extrabold text-pink-600 animate-bounce">
        🚫 Uh-Oh! No No Zone! 🚫
      </h1>
      <p className="mt-4 text-lg text-gray-700 text-center">
        Oopsie woopsie! You’re not allowed here, little explorer! 🍼 <br />
        Maybe try going back before the internet police catch you! 🚓
      </p>
      <img
        src="https://media.giphy.com/media/3o7527pa7qs9kCG78A/giphy.gif"
        alt="Cute baby confused"
        className="mt-6 w-60 rounded-xl shadow-lg"
      />
      <button
        onClick={() => window.history.back()}
        className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        🏃‍♂️ Run Back!
      </button>
    </div>
  );
}
