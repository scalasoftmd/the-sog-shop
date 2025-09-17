import { useState } from 'react';

export default function AboutSection() {
  const [showVideo, setShowVideo] = useState(false);

  const openVideo = () => setShowVideo(true);
  const closeVideo = () => setShowVideo(false);

  return (
    <section className="about-section mx-full pt-25 sm:p-8 md:pl-40 md:pr-40 md:pt-10">
      <div className="container mx-full">
        <div className="flex flex-col justify-center md:flex-row items-center gap-10">
            <div>
                <div className="w-30 border-t border-gray-700 mb-10"></div>
                <h3 className="text-3xl sm:text-4xl md:text-7xl font-semibold mb-4 leading-none">The world is <br /> waiting for the <br /> sons and <br /> daughters of God <br /> to rise. We are <br /> here to make faith <br /> visible.</h3>
            </div>
            <div className="flex flex-col gap-4 md:w-1/2 pl-15 pr-15 pb-0 sm:p-5 md:p-10 lg:p-20">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Our name and our vision are rooted in <strong>Romans 8:19</strong>: "For the creation waits in eager expectation for the children of God to be revealed."
                    This verse carries a powerful truth — that all of creation is longing, even groaning, for the sons and daughters of God to rise and step into their true identity. It speaks of a world waiting for light, hope, and the visible expression of God’s family on earth.
                </p>
                <p className="text-base sm:text-lg text-gray-700 mt-4 leading-relaxed">
                    <strong>Son of God</strong> was born out of this conviction. We believe faith is not hidden, but lived. It is not only words, but action — visible in the way we walk, the way we love, and yes, even in what we wear. Every collection, every product, every event is part of this movement: a call to rise, to stand bold, and to reflect the One who has called us His own.
                </p>
                <p className="text-base sm:text-lg text-gray-700 mt-4 leading-relaxed">
                    This is more than fashion. It is a reminder that your life carries purpose. When you wear <strong>Son of God</strong>, you don’t just put on clothing — you carry a statement, you step into identity, and you make visible what creation has been waiting for all along.
                </p>
            </div>
          </div>
          <div className="relative w-full mt-20 mb-20 md:h-auto h-[80vw] md:h-[45vw]">
            <img src="/assets/about.jpg" alt="About us" className="w-full h-full object-cover object-left" />
            <button
              onClick={openVideo}
              className="absolute top-15 right-15 flex flex-col items-center group z-10 cursor-pointer"
              style={{outline: 'none'}}
              aria-label="Play video"
            >
              <span className="flex items-center justify-center w-24 h-24 rounded-full border-2 border-white bg-black bg-opacity-30 hover:bg-opacity-60 transition">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="30,22 58,40 30,58" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="mt-2 text-white text-xl"><b>play</b> <span className="font-normal">video</span></span>
            </button>
            {showVideo && (
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="relative w-[90%] h-[90%] bg-black rounded-lg shadow-lg flex items-center justify-center">
                  <button
                    onClick={closeVideo}
                    className="absolute -top-5 -right-5 text-2xl p-2 md:text-3xl md:p-0 text-white font-bold z-10 cursor-pointer"
                    aria-label="Close video"
                  >
                    &times;
                  </button>
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/X6Mtpk4jeVA?autoplay=1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg w-full h-full"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
      </div>
    </section>
  );
}