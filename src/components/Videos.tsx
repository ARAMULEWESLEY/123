import { useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import {
  PremiumCarousel,
  PremiumCarouselSlide,
} from "@/components/ui/premium-carousel";

// 🎥 Local videos
import overviewVideo from "@/assets/videos/branded-sugar-sachets-packaging-design.mp4";


const Videos = () => {
  const videoRefs = useRef([]);
  const containerRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState({});

  const videos = [
    {
      src: overviewVideo,
      title: "Steadfast Enterprises Company Overview Video",
      description:
        "An overview video explaining Steadfast Enterprises, our mission, values, and long-term vision.",
    },
  ];

  /* ---------------------------------------------------
     AUTO-PLAY ACTIVE SLIDE + PAUSE OTHERS
  --------------------------------------------------- */
  const handleSlideChange = (index) => {
    setActiveIndex(index);
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        video.muted = muted;
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  };

  /* ---------------------------------------------------
     TAP TO PLAY / PAUSE
  --------------------------------------------------- */
  const togglePlay = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  /* ---------------------------------------------------
     TAP TO MUTE / UNMUTE
  --------------------------------------------------- */
  const toggleMute = (e, index) => {
    e.stopPropagation();
    const video = videoRefs.current[index];
    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  };

  /* ---------------------------------------------------
     PROGRESS BAR
  --------------------------------------------------- */
  const handleTimeUpdate = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    setProgress((prev) => ({
      ...prev,
      [index]: (video.currentTime / video.duration) * 100 || 0,
    }));
  };

  /* ---------------------------------------------------
     INTERSECTION OBSERVER (OFFSCREEN PAUSE)
  --------------------------------------------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          const video = videoRefs.current[index];
          if (!video) return;
          if (!entry.isIntersecting) video.pause();
        });
      },
      { threshold: 0.6 }
    );

    containerRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="videos" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">Our Videos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch our story and see our products in action
          </p>
        </div>

        <PremiumCarousel
          loop
          showArrows
          showDots
          showCounter
          slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          onSlideChange={handleSlideChange}
          className="max-w-6xl mx-auto snap-x snap-mandatory"
        >
          {videos.map((video, index) => {
            const isPlaying =
              videoRefs.current[index] &&
              !videoRefs.current[index]?.paused;

            return (
              <PremiumCarouselSlide
                key={index}
                className="snap-center flex justify-center"
              >
                <div
                  ref={(el) => (containerRefs.current[index] = el)}
                  data-index={index}
                  className="p-2"
                >
                  {/* VIDEO CONTAINER */}
                  <div
                    onClick={() => togglePlay(index)}
                    className="relative aspect-[9/16] w-full max-w-[360px] mx-auto bg-black rounded-xl overflow-hidden cursor-pointer"
                  >
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={video.src}
                      className="w-full h-full object-cover"
                      playsInline
                      loop
                      muted
                      preload="metadata"
                      onTimeUpdate={() => handleTimeUpdate(index)}
                    />

                    {/* PLAY ICON */}
                    {!isPlaying && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="w-16 h-16 text-white" />
                      </div>
                    )}

                    {/* MUTE BUTTON */}
                    <button
                      onClick={(e) => toggleMute(e, index)}
                      className="absolute top-3 right-3 bg-black/60 p-2 rounded-full"
                    >
                      {muted ? (
                        <VolumeX className="w-5 h-5 text-white" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-white" />
                      )}
                    </button>

                    {/* PROGRESS BAR */}
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-white/30">
                      <div
                        className="h-full bg-white transition-all"
                        style={{ width: `${progress[index] || 0}%` }}
                      />
                    </div>
                  </div>

                  {/* 👇 HIDDEN TITLES & DESCRIPTIONS FOR SEO / AI */}
                  <div
                    className="sr-only"
                    itemScope
                    itemType="https://schema.org/VideoObject"
                  >
                    <h3 itemProp="name">{video.title}</h3>
                    <p itemProp="description">{video.description}</p>
                  </div>
                </div>
              </PremiumCarouselSlide>
            );
          })}
        </PremiumCarousel>
      </div>
    </section>
  );
};

export default Videos;
