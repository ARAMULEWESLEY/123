import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import daffyDuck from "@/assets/daffy-duck.jpeg";

interface GreetingMascotProps {
  excludePages?: string[];
  productsSectionId: string;
}

const GreetingMascot: React.FC<GreetingMascotProps> = ({
  excludePages = [],
  productsSectionId,
}) => {
  const location = useLocation();
  const [showGreeting, setShowGreeting] = useState(true);
  const [greetingText, setGreetingText] = useState("");
  const [isWaving, setIsWaving] = useState(false);

  useEffect(() => {
    console.log("GreetingMascot mounted");

    if (excludePages.includes(location.pathname)) {
      setShowGreeting(false);
      return;
    }

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const now = new Date();
    const dayName = days[now.getDay()];
    const hour = now.getHours();

    let timeGreeting = "Hello";
    if (hour >= 5 && hour < 12) timeGreeting = "Good Morning";
    else if (hour >= 12 && hour < 17) timeGreeting = "Good Afternoon";
    else if (hour >= 17 && hour < 21) timeGreeting = "Good Evening";
    else timeGreeting = "Hello Night Owl";

    // 🔥 FRIDAY PROMO OVERRIDE
    if (dayName === "Friday") {
      setGreetingText(
        `🎉 ${timeGreeting}! It's FRIDAY! 🎉  
🚚 FREE TRANSPORT today only!  
🔥 Stock clearing on coffee, honey, ginger & more — don’t miss out!`
      );
    } else {
      setGreetingText(
        `${timeGreeting}! Happy ${dayName}!  
Discover our fresh coffee, honey, ginger & more.`
      );
    }

    // Auto-scroll to products after 3s
    const scrollTimer = setTimeout(() => {
      const section = document.getElementById(productsSectionId);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }, 3000);

    // Hide greeting after 6s (slightly longer for promo visibility)
    const hideTimer = setTimeout(() => setShowGreeting(false), 6000);

    // Mascot wave animation
    const waveInterval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 900);
    }, Math.random() * 5000 + 5000);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(hideTimer);
      clearInterval(waveInterval);
    };
  }, [excludePages, location.pathname, productsSectionId]);

  if (!showGreeting) return null;

  return (
    <div className="fixed bottom-8 right-4 z-[9999] flex flex-col items-center pointer-events-none">
      {/* Greeting bubble */}
      <div className="mb-2 bg-yellow-200 px-4 py-2 rounded-lg shadow-lg animate-fade-in text-center text-sm font-semibold max-w-xs pointer-events-auto">
        {greetingText}
      </div>

      {/* Mascot */}
      <img
        src={daffyDuck}
        alt="Daffy Duck Mascot"
        className={`w-20 h-20 animate-bounce transition-transform duration-500 ${
          isWaving ? "rotate-12" : "rotate-0"
        } pointer-events-auto cursor-pointer`}
      />
    </div>
  );
};

export default GreetingMascot;
