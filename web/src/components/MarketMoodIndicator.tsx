"use client";
import { useState } from "react";

type Mood = "fearful" | "cautious" | "neutral" | "optimistic" | "greedy";

interface MoodData {
  label: string;
  emoji: string;
  color: string;
  gradient: string;
  description: string;
}

const moodData: Record<Mood, MoodData> = {
  fearful: {
    label: "Extreme Fear",
    emoji: "😨",
    color: "text-red-400",
    gradient: "from-red-500/20 to-red-600/10",
    description: "Maximum pessimism - Contrarian opportunity"
  },
  cautious: {
    label: "Fear",
    emoji: "😰",
    color: "text-orange-400",
    gradient: "from-orange-500/20 to-orange-600/10",
    description: "Investors are worried - Be selective"
  },
  neutral: {
    label: "Neutral",
    emoji: "😐",
    color: "text-gray-400",
    gradient: "from-gray-500/20 to-gray-600/10",
    description: "Balanced sentiment - Wait for signals"
  },
  optimistic: {
    label: "Greed",
    emoji: "😊",
    color: "text-green-400",
    gradient: "from-green-500/20 to-green-600/10",
    description: "Confidence is high - Take profits"
  },
  greedy: {
    label: "Extreme Greed",
    emoji: "🤑",
    color: "text-green-400",
    gradient: "from-green-500/20 to-green-600/10",
    description: "Maximum euphoria - Time to be cautious"
  }
};

const currentMoodIndex = 65; // 0-100 scale

const getMoodFromIndex = (index: number): Mood => {
  if (index <= 20) return "fearful";
  if (index <= 40) return "cautious";
  if (index <= 60) return "neutral";
  if (index <= 80) return "optimistic";
  return "greedy";
};

export default function MarketMoodIndicator() {
  const [hoveredMood, setHoveredMood] = useState<Mood | null>(null);
  const currentMood = getMoodFromIndex(currentMoodIndex);
  const displayMood = hoveredMood || currentMood;
  const mood = moodData[displayMood];

  return (
    <div className="relative z-10 py-24 border-t border-white/5">
      <div className="container mx-auto px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider px-4 py-2 rounded-full border border-purple-400/30 bg-purple-400/5">
                Live Market Sentiment
              </span>
            </div>
            <h2 className="text-5xl font-bold text-white mb-4">
              Market <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Mood</span> Index
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Understanding crowd psychology is the key to successful trading
            </p>
          </div>

          {/* Main Mood Display */}
          <div className={`p-12 rounded-3xl bg-gradient-to-br ${mood.gradient} border border-white/10 mb-8 transition-all duration-500`}>
            <div className="text-center">
              {/* Emoji */}
              <div className="text-8xl mb-6 animate-bounce-slow">
                {mood.emoji}
              </div>

              {/* Mood Label */}
              <h3 className={`text-4xl font-bold mb-4 ${mood.color}`}>
                {mood.label}
              </h3>

              {/* Index Value */}
              <div className="text-6xl font-bold text-white mb-4">
                {currentMoodIndex}
                <span className="text-2xl text-gray-400">/100</span>
              </div>

              {/* Description */}
              <p className="text-xl text-gray-300">
                {mood.description}
              </p>
            </div>
          </div>

          {/* Mood Scale */}
          <div className="mb-8">
            <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
              {/* Gradient Bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-gray-500 to-green-500 opacity-50" />
              
              {/* Current Position Indicator */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-500 border-2 border-blue-400"
                style={{ left: `${currentMoodIndex}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75" />
              </div>
            </div>

            {/* Scale Labels */}
            <div className="flex justify-between mt-4 text-sm">
              <div
                className="cursor-pointer hover:scale-110 transition-transform"
                onMouseEnter={() => setHoveredMood("fearful")}
                onMouseLeave={() => setHoveredMood(null)}
              >
                <div className="text-3xl mb-1">😨</div>
                <div className="text-red-400 font-semibold">Fear</div>
                <div className="text-gray-500 text-xs">0-20</div>
              </div>
              <div
                className="cursor-pointer hover:scale-110 transition-transform"
                onMouseEnter={() => setHoveredMood("cautious")}
                onMouseLeave={() => setHoveredMood(null)}
              >
                <div className="text-3xl mb-1">😰</div>
                <div className="text-orange-400 font-semibold">Cautious</div>
                <div className="text-gray-500 text-xs">21-40</div>
              </div>
              <div
                className="cursor-pointer hover:scale-110 transition-transform"
                onMouseEnter={() => setHoveredMood("neutral")}
                onMouseLeave={() => setHoveredMood(null)}
              >
                <div className="text-3xl mb-1">😐</div>
                <div className="text-gray-400 font-semibold">Neutral</div>
                <div className="text-gray-500 text-xs">41-60</div>
              </div>
              <div
                className="cursor-pointer hover:scale-110 transition-transform"
                onMouseEnter={() => setHoveredMood("optimistic")}
                onMouseLeave={() => setHoveredMood(null)}
              >
                <div className="text-3xl mb-1">😊</div>
                <div className="text-green-400 font-semibold">Optimistic</div>
                <div className="text-gray-500 text-xs">61-80</div>
              </div>
              <div
                className="cursor-pointer hover:scale-110 transition-transform"
                onMouseEnter={() => setHoveredMood("greedy")}
                onMouseLeave={() => setHoveredMood(null)}
              >
                <div className="text-3xl mb-1">🤑</div>
                <div className="text-green-400 font-semibold">Greed</div>
                <div className="text-gray-500 text-xs">81-100</div>
              </div>
            </div>
          </div>

          {/* Famous Quote */}
          <div className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <p className="text-xl text-gray-300 italic mb-3">
              &ldquo;Be fearful when others are greedy, and greedy when others are fearful.&rdquo;
            </p>
            <p className="text-sm text-gray-500">— Warren Buffett</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
