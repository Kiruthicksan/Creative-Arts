import { Timer, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import ArtNature from "../../../assets/ArtNature.jpeg";

const FlashDeal = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-20 rounded-3xl overflow-hidden relative">
      {/* Background with Gradient and Blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative px-8 py-12 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Content Side */}
        <div className="flex-1 text-white z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={14} className="text-yellow-300" />
            <span>Limited Time Offer</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            The Ultimate <br />
            <span className="text-yellow-300">Creator Bundle</span>
          </h2>

          <p className="text-indigo-100 text-lg mb-8 max-w-md">
            Get access to 500+ premium resources including fonts, 3D assets, and
            mockups at an unbeatable price.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">₹2,499</span>
              <span className="text-indigo-200 text-sm line-through">
                ₹12,500
              </span>
            </div>
            <button className="bg-white text-indigo-700 px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-yellow-300 hover:text-indigo-900 transition-all shadow-lg shadow-indigo-900/20 active:scale-95">
              Grab the Deal <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Visual/Timer Side */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Countdown Timer Cards */}
          <div className="flex items-center gap-3 md:gap-4">
            <TimerUnit value={timeLeft.hours} label="Hours" />
            <span className="text-2xl font-bold text-white/50 mb-6">:</span>
            <TimerUnit value={timeLeft.minutes} label="Mins" />
            <span className="text-2xl font-bold text-white/50 mb-6">:</span>
            <TimerUnit value={timeLeft.seconds} label="Secs" />
          </div>

          {/* Mockup visual floating behind or near timer could go here, 
                       but kept simple for now with just the timer prominence */}
          <div className="mt-8 relative w-full max-w-sm">
            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full"></div>
            <img
              src={ArtNature}
              alt="Bundle Preview"
              className="relative w-full h-48 object-cover rounded-2xl shadow-2xl border-4 border-white/10 rotate-3 hover:rotate-0 transition-all duration-500"
            />
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-indigo-900 font-bold w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform rotate-12">
              -80%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimerUnit = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="bg-white/10 backdrop-blur-md border border-white/20 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-2 shadow-lg">
      <span className="text-2xl md:text-3xl font-bold text-white font-mono">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="text-xs uppercase tracking-wider text-indigo-200 font-medium">
      {label}
    </span>
  </div>
);

export default FlashDeal;
