import React from 'react';
import StayInTouchSection from '../components/home/SatyInTouchSection';
import { FiCreditCard, FiGlobe, FiTruck } from 'react-icons/fi';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState('THE MISSION');
  const [isLoading, setIsLoading] = React.useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);

  React.useEffect(() => {
    // Simulate loading time for page initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string, buttonName: string) => {
    setActiveSection(buttonName);
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Adjust this value based on your navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const openVideo = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideo = () => {
    setIsVideoModalOpen(false);
  };

  const navigationSections = [
    { name: 'THE MISSION', id: 'mission-section' },
    { name: 'IMAGEFILM', id: 'imagefilm-section' },
    { name: 'TIMELINE', id: 'timeline-section' },
    { name: 'MOVEMENT', id: 'movement-section' },
    { name: 'PARTNER', id: 'partner-section' },
    { name: 'CONTACT', id: 'contact-section' }
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="relative mb-12 mt-8">
        <div className="relative w-full h-auto">
          <img 
            src="/assets/about-header.webp" 
            alt="About header" 
            className="w-full h-full object-cover"
          />
          <div className="absolute md:-top-[50px] inset-0 bg-opacity-40 flex items-start justify-center">
            <h1 className="text-8xl md:text-9xl lg:text-[18rem] font-bold text-white tracking-wider opacity-60">ABOUT</h1>
          </div>
        </div>
      </div>

      <div className='md:px-70'>
        <div className="mb-12">
            <div className="flex">
                <div className="flex gap-2 md:gap-4 flex-wrap justify-center">
                    {navigationSections.map((section) => (
                      <button 
                        key={section.name}
                        onClick={() => scrollToSection(section.id, section.name)}
                        className={`w-27 md:w-43 px-2 md:px-10 py-10 text-xs md:text-xs font-light md:font-medium text-black hover:bg-white transition-colors cursor-pointer ${
                          activeSection === section.name ? 'bg-white' : 'bg-gray-200'
                        }`}
                      >
                        {section.name}
                      </button>
                    ))}
                </div>
            </div>
        </div>

        <div className="mb-20" id="mission-section">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="order-2 md:order-1 p-7 md:p-0 md:w-1/2">
              <h2 className="text-xl font-bold mb-6 text-left">BORN FOR MORE. BUILT TO REIGN.</h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                SOG (Sons of God) is more than a brand — it is a movement, a calling, and a culture.
                Rooted in Kingdom identity, SOG exists to awaken sons and daughters of God to live out divine purpose with faith, excellence, and influence in every sphere of life.
              </p>

              {/* OUR ORIGIN Section */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">OUR ORIGIN</h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  Founded through Kingdom visionaries Justine Birichi and George Weber, SOG was birthed from a shared conviction:
                </p>
                <p className="text-gray-700 leading-relaxed text-base italic">
                  True leadership begins with identity, and transformation starts when sons rise.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed text-base">
                  From prophetic insight and creative leadership (Justine) to strategic and structural wisdom (George), the SOG story embodies the union of vision and execution, spirit and structure, faith and function — shaping a movement that bridges heaven's values with earth's realities.
                </p>
              </div>

              {/* OUR MISSION Section */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">OUR MISSION</h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  To raise a generation of Kingdom leaders who:
                </p>
                <ul className="text-gray-700 leading-relaxed text-base list-disc list-inside ml-4">
                  <li>Know who they are in God.</li>
                  <li>Lead with integrity, excellence, and love.</li>
                  <li>Influence culture without losing Kingdom character.</li>
                </ul>
                <p className="text-gray-700 mb-4 leading-relaxed text-base">
                  We believe that when identity is restored, authority flows naturally — and when sons stand tall, the world is transformed.
                </p>
              </div>

              {/* OUR VALUES Section */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">OUR VALUES</h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  Faith. Integrity. Excellence. Empowerment. Impact.
                  These five pillars form the DNA of everything we build — from content and community to commerce and culture.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed text-base">
                  They reflect our commitment to create with purpose, lead with grace, and live with eternal significance.
                </p>
              </div>

              {/* OUR COLLECTIVE Section */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-3">OUR COLLECTIVE</h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  SOG is stewarded by a growing community of creatives, entrepreneurs, and leaders who share one heart — to represent the King authentically in every domain of influence.
                </p>
                <p className="text-gray-700 leading-relaxed text-base">
                  It's not about one person or platform; it's about a generation rising together.
                </p>
                <p className="text-gray-700 mb-8 leading-relaxed text-base italic">
                  "We are sons. We rise. We reign — not for dominance, but for service."
                </p>
              </div>
            </div>
            
            <div className="order-1 md:order-2 flex flex-col items-center md:w-1/2">
              <img 
                src="/assets/founder.png" 
                alt="Justine Birichi" 
                className="h-80 md:h-180 w-auto mb-6"
              />
              
              <div className="flex flex-col items-center gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-center">MEET THE VISIONARY</h3>
                <div className='flex flex-col md:flex-row gap-4'>
                  <img 
                    src="/assets/founder-signature.png" 
                    alt="Justine Birichi Signature" 
                    className="h-15 w-auto"
                  />

                  <img 
                    src="/assets/founder-signature.webp" 
                    alt="Justine Birichi Signature" 
                    className="h-15 w-auto"
                  />

                </div>
                <button 
                  onClick={() => scrollToSection('timeline-section', 'IMAGEFILM')}
                  className="bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors w-fit cursor-pointer"
                >
                  Watch our Story
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16 p-5 md:p-0">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-left">
              <img 
                src="/assets/faith-in-action.png" 
                alt="Faith in Action" 
                className="w-full h-64 object-cover mb-4"
              />
              <h3 className="text-xl font-bold mb-3">Faith in Action</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                The message of SOG is expressed not only in words but in lifestyle and excellence.
                Through apparel, design, media, and leadership initiatives, SOG carries a prophetic yet practical call to live with purpose, integrity, and influence.
                Each project reflects the same heartbeat: to raise a generation who knows who they are in God — and walks in that truth boldly.
              </p>
            </div>

            <div className="text-left">
              <img 
                src="/assets/transforming-leadership.png" 
                alt="Transforming Leadership" 
                className="w-full h-64 object-cover mb-4"
              />
              <h3 className="text-xl font-bold mb-3">Transforming Leadership</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                At its core, SOG is a leadership culture — one that believes identity is the foundation of true authority.
                We exist to raise Kingdom-minded leaders who influence culture without losing Kingdom character.
                Through teaching, mentorship, and creative collaboration, we are building a global community of authentic leaders.
              </p>
            </div>

            <div className="text-left">
              <img 
                src="/assets/navigating-change.png" 
                alt="Navigating Change" 
                className="w-full h-64 object-cover mb-4"
              />
              <h3 className="text-xl font-bold mb-3">Navigating Change. Cultivating Calling.</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                In an ever-shifting world, SOG stands as a reminder that faith is not passive — it's prophetic.
                We help leaders and believers alike to discern the times, align with God's purpose, and live courageously in their calling.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16 p-5 md:p-0">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-left">
              <img 
                src="/assets/expanding-influence.png" 
                alt="Expanding Influence" 
                className="w-full h-64 object-cover mb-4"
              />
              <h3 className="text-xl font-bold mb-3">Expanding Influence</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                SOG continues to grow its reach through partnerships, media initiatives, and creative expressions.
                From design studios to leadership forums, the vision remains the same: to represent the King with authenticity and grace.
              </p>
            </div>

            <div className="text-left">
              <img 
                src="/assets/media-mentorship.png" 
                alt="Media and Ministry" 
                className="w-full h-64 object-cover mb-4"
              />
              <h3 className="text-xl font-bold mb-3">Media and Ministry</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Through the Portmedia ecosystem, SOG is extending its impact into new spaces — connecting Kingdom identity with creativity, storytelling, and global influence.
              </p>
            </div>

            <div className="text-left">
              <img 
                src="/assets/bible-studies.png" 
                alt="Shift thoughts for Everyday Life" 
                className="w-full h-64 object-cover mb-4"
              />
              <h3 className="text-xl font-bold mb-3">Shift thoughts for Everyday Life</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Faith must be lived, not only spoken. Our devotionals, studies, and live sessions bring Scripture into practical application — helping believers live with wisdom, purpose, and consistency in every area of life.
              </p>
            </div>
          </div>
        </div>
      </div>

        <div className="md:px-70 mb-16 bg-gray-50 p-0 md:p-8" id="imagefilm-section">
          <div className="mb-6 flex flex-col md:flex-row md:justify-between items-center md:items-center">
            <span className="text-md md:text-xl mb-4 md:mb-0 text-center md:text-left">Experience the Vision <span className="text-gray-500">- The Story Behind Sons of God</span></span>
            <button className="bg-black text-white px-4 py-2 text-sm w-fit md:ml-4">
              <Link to="https://www.youtube.com/@leadershipforum-eu">Discover More Stories</Link>
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="flex-1 relative">
              <video 
                className="w-full h-64 md:h-80 object-cover"
                poster="/assets/podcast-bible-image.png"
                preload="metadata"
                muted
              >
                <source src="/assets/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <button
                onClick={openVideo}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-10 cursor-pointer"
                style={{outline: 'none'}}
              >
                <span className="flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-white bg-black bg-opacity-30 hover:bg-opacity-60 transition">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-8 md:h-8">
                    <polygon points="9,6 21,12 9,18" fill="white" />
                  </svg>
                </span>
              </button>
            </div>
            <div className="flex-1 p-5">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">A Glimpse into the Heart of Sons of God</h2>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                A glimpse into the heart of the movement that began as revelation and has become a lifestyle of identity, excellence, and faith.
              </p>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {isVideoModalOpen && (
          <div className="fixed h-full inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="absolute w-full max-w-4xl mx-4">
              <button
                onClick={closeVideo}
                className="absolute cursor-pointer -top-12 right-0 text-white hover:text-gray-300 z-100 p-2"
                aria-label="Close video"
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path 
                    d="M18 6L6 18M6 6L18 18" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <video
                className="w-full h-[70vh] md:h-[80vh]"
                controls
                autoPlay
                playsInline
                poster="/assets/podcast-bible-image.png"
                onError={(e) => console.error('Video error:', e)}
                onCanPlay={() => console.log('Video can play')}
                onLoadStart={() => console.log('Video load started')}
              >
                <source src="/assets/video.mp4" type="video/mp4" />
                <p>Your browser does not support the video tag or the video file could not be loaded.</p>
              </video>
            </div>
          </div>
        )}

        <div className="bg-black text-white py-16 px-8 relative" id="timeline-section">
          {/* Background HISTORY text */}
          <div className="absolute inset-0 flex items-start mt-20 justify-center pointer-events-none">
            <h1 className="text-8xl md:text-12xl lg:text-[25rem] font-bold text-white tracking-wider opacity-20">HISTORY</h1>
          </div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-start mb-16">
              <h3 className="text-white mb-4">History - <span className="text-gray-400">The Journey of Justine Birichi (JB)</span></h3>
            </div>
            
            {/* Desktop Timeline */}
            <div className="hidden md:block relative mt-50 md:px-40">
              {/* Timeline line - extended below last dot */}
              <div className="absolute left-1/2 transform -translate-x-px w-0.5 bg-white" style={{ height: 'calc(100% + 120px)' }}></div>
              
              {/* Timeline items */}
              <div className="space-y-16">
                {/* 1998-2002 */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <img src="/assets/1998-2002.png" alt="1998-2002" className="w-128 h-96 object-cover ml-auto mb-4 border-16 border-white" />
                  </div>
                  <div className="w-4 h-4 bg-white rounded-full relative z-10"></div>
                  <div className="w-1/2 pl-8">
                    <h3 className="text-3xl font-bold mb-6">1996 - 2002</h3>
                    <h4 className="text-2xl mb-6">Beginnings on the Field</h4>
                    <p className="text-lg text-gray-300">A journey that started through sports and leadership, shaping discipline and vision.</p>
                  </div>
                </div>

                {/* 2002 */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <img src="/assets/2002.png" alt="2002" className="w-128 h-96 object-cover ml-auto mb-4 border-16 border-white" />
                  </div>
                  <div className="w-4 h-4 bg-white rounded-full relative z-10"></div>
                  <div className="w-1/2 pl-8">
                    <h3 className="text-3xl font-bold mb-6">2002</h3>
                    <h4 className="text-2xl mb-6">Founding the Peace Boys Initiative</h4>
                    <p className="text-lg text-gray-300">Raising hope through youth programs that blended sport, purpose, and mentorship.</p>
                  </div>
                </div>

                {/* 2004-2006 */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <img src="/assets/2004-2006.png" alt="2004-2006" className="w-128 h-96 object-cover ml-auto mb-4 border-16 border-white" />
                  </div>
                  <div className="w-4 h-4 bg-white rounded-full relative z-10"></div>
                  <div className="w-1/2 pl-8">
                    <h3 className="text-3xl font-bold mb-6">2004 - 2006</h3>
                    <h4 className="text-2xl mb-6">A Calling Beyond Sport</h4>
                    <p className="text-lg text-gray-300">Transitioning into leadership and ministry, igniting passion for transformation and faith-driven leadership.</p>
                  </div>
                </div>

                {/* 2007-2009 */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <img src="/assets/2007-2009.png" alt="2007-2009" className="w-128 h-96 object-cover ml-auto mb-4 border-16 border-white" />
                  </div>
                  <div className="w-4 h-4 bg-white rounded-full relative z-10"></div>
                  <div className="w-1/2 pl-8">
                    <h3 className="text-3xl font-bold mb-6">2007 - 2009</h3>
                    <h4 className="text-2xl mb-6">Leadership Through Sport</h4>
                    <p className="text-lg text-gray-300">Launching programs and clubs that influenced communities and created safe spaces for youth to thrive.</p>
                  </div>
                </div>

                {/* 2010-2016 */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <img src="/assets/2010-2016.png" alt="2010-2016" className="w-128 h-96 object-cover ml-auto mb-4 border-16 border-white" />
                  </div>
                  <div className="w-4 h-4 bg-white rounded-full relative z-10"></div>
                  <div className="w-1/2 pl-8">
                    <h3 className="text-3xl font-bold mb-6">2010 - 2016</h3>
                    <h4 className="text-2xl mb-6">Expanding through Consulting & Marketplace Leadership</h4>
                    <p className="text-lg text-gray-300">Shaping leaders and organizations across Africa and Europe through values-based consulting and mentorship.</p>
                  </div>
                </div>

                {/* 2017-2020 */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <img src="/assets/2017-2020.png" alt="2017-2020" className="w-128 h-96 object-cover ml-auto mb-4 border-16 border-white" />
                  </div>
                  <div className="w-4 h-4 bg-white rounded-full relative z-10"></div>
                  <div className="w-1/2 pl-8">
                    <h3 className="text-3xl font-bold mb-6">2017 - 2020</h3>
                    <h4 className="text-2xl mb-6">Expanding Influence Across Continents</h4>
                    <p className="text-lg text-gray-300">Collaborating with ministries and leadership organizations globally, establishing the groundwork for a cross-cultural Kingdom movement.</p>
                  </div>
                </div>

                {/* 2020-Present */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <img src="/assets/2020-present.png" alt="2020-Present" className="w-128 h-96 object-cover ml-auto mb-4 border-16 border-white" />
                  </div>
                  <div className="w-4 h-4 bg-white rounded-full relative z-10"></div>
                  <div className="w-1/2 pl-8">
                    <h3 className="text-3xl font-bold mb-6">2020 - Present</h3>
                    <h4 className="text-2xl mb-6">CEO & Visionary Leader at PM International</h4>
                    <p className="text-lg text-gray-300">Merging faith, media, and business under one mission: to awaken identity and purpose through Kingdom excellence.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="md:hidden relative mt-10">
              {/* Timeline line for mobile */}
              <div className="absolute left-[1px] top-0 w-0.5 bg-white h-full"></div>
              
              {/* Timeline items for mobile */}
              <div className="space-y-12">
                {/* 1998-2002 */}
                <div className="flex">
                  <div className="w-4 h-4 bg-white rounded-full relative z-10 mt-2 flex-shrink-0" style={{ marginLeft: '-6px', marginRight: '24px' }}></div>
                  <div className="flex-1">
                    <img src="/assets/1998-2002.png" alt="1998-2002" className="w-full h-48 object-cover mb-4 border-4 border-white" />
                    <h3 className="text-xl font-bold mb-3">1996 - 2002</h3>
                    <h4 className="text-lg mb-3">Beginnings on the Field</h4>
                    <p className="text-sm text-gray-300">A journey that started through sports and leadership, shaping discipline and vision.</p>
                  </div>
                </div>

                {/* 2002 */}
                <div className="flex">
                  <div className="w-4 h-4 bg-white rounded-full relative z-10 mt-2 flex-shrink-0" style={{ marginLeft: '-6px', marginRight: '24px' }}></div>
                  <div className="flex-1">
                    <img src="/assets/2002.png" alt="2002" className="w-full h-48 object-cover mb-4 border-4 border-white" />
                    <h3 className="text-xl font-bold mb-3">2002</h3>
                    <h4 className="text-lg mb-3">Founding the Peace Boys Initiative</h4>
                    <p className="text-sm text-gray-300">Raising hope through youth programs that blended sport, purpose, and mentorship.</p>
                  </div>
                </div>

                {/* 2004-2006 */}
                <div className="flex">
                  <div className="w-4 h-4 bg-white rounded-full relative z-10 mt-2 flex-shrink-0" style={{ marginLeft: '-6px', marginRight: '24px' }}></div>
                  <div className="flex-1">
                    <img src="/assets/2004-2006.png" alt="2004-2006" className="w-full h-48 object-cover mb-4 border-4 border-white" />
                    <h3 className="text-xl font-bold mb-3">2004 - 2006</h3>
                    <h4 className="text-lg mb-3">A Calling Beyond Sport</h4>
                    <p className="text-sm text-gray-300">Transitioning into leadership and ministry, igniting passion for transformation and faith-driven leadership.</p>
                  </div>
                </div>

                {/* 2007-2009 */}
                <div className="flex">
                  <div className="w-4 h-4 bg-white rounded-full relative z-10 mt-2 flex-shrink-0" style={{ marginLeft: '-6px', marginRight: '24px' }}></div>
                  <div className="flex-1">
                    <img src="/assets/2007-2009.png" alt="2007-2009" className="w-full h-48 object-cover mb-4 border-4 border-white" />
                    <h3 className="text-xl font-bold mb-3">2007 - 2009</h3>
                    <h4 className="text-lg mb-3">Leadership Through Sport</h4>
                    <p className="text-sm text-gray-300">Launching programs and clubs that influenced communities and created safe spaces for youth to thrive.</p>
                  </div>
                </div>

                {/* 2010-2016 */}
                <div className="flex">
                  <div className="w-4 h-4 bg-white rounded-full relative z-10 mt-2 flex-shrink-0" style={{ marginLeft: '-6px', marginRight: '24px' }}></div>
                  <div className="flex-1">
                    <img src="/assets/2010-2016.png" alt="2010-2016" className="w-full h-48 object-cover mb-4 border-4 border-white" />
                    <h3 className="text-xl font-bold mb-3">2010 - 2016</h3>
                    <h4 className="text-lg mb-3">Expanding through Consulting & Marketplace Leadership</h4>
                    <p className="text-sm text-gray-300">Shaping leaders and organizations across Africa and Europe through values-based consulting and mentorship.</p>
                  </div>
                </div>

                {/* 2017-2020 */}
                <div className="flex">
                  <div className="w-4 h-4 bg-white rounded-full relative z-10 mt-2 flex-shrink-0" style={{ marginLeft: '-6px', marginRight: '24px' }}></div>
                  <div className="flex-1">
                    <img src="/assets/2017-2020.png" alt="2017-2020" className="w-full h-48 object-cover mb-4 border-4 border-white" />
                    <h3 className="text-xl font-bold mb-3">2017 - 2020</h3>
                    <h4 className="text-lg mb-3">Expanding Influence Across Continents</h4>
                    <p className="text-sm text-gray-300">Collaborating with ministries and leadership organizations globally, establishing the groundwork for a cross-cultural Kingdom movement.</p>
                  </div>
                </div>

                {/* 2020-Present */}
                <div className="flex">
                  <div className="w-4 h-4 bg-white rounded-full relative z-10 mt-2 flex-shrink-0" style={{ marginLeft: '-6px', marginRight: '24px' }}></div>
                  <div className="flex-1">
                    <img src="/assets/2020-present.png" alt="2020-Present" className="w-full h-48 object-cover mb-4 border-4 border-white" />
                    <h3 className="text-xl font-bold mb-3">2020 - Present</h3>
                    <h4 className="text-lg mb-3">CEO & Visionary Leader at PM International</h4>
                    <p className="text-sm text-gray-300">Merging faith, media, and business under one mission: to awaken identity and purpose through Kingdom excellence.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-20 mb-16 relative">
              {/* <button className="bg-white text-black px-8 py-4 font-medium hover:bg-gray-100 transition-colors">
                Be Part of the Movement
              </button> */}
              <div className="mt-8">
                <p className="text-white text-lg leading-relaxed">The journey continues — inspiring a generation to rise,</p>
                <p className="text-white text-lg leading-relaxed">lead with purpose, and shape a world that reflects Kingdom values.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Global Presence Section */}
        <div className="bg-white py-16 px-8" id="movement-section">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Global Presence</h2>
              <p className="text-xl text-gray-600">One Vision, Many Nations</p>
              <p className="text-gray-700 mt-4 max-w-4xl mx-auto leading-relaxed">
                From Europe to Africa, from churches to boardrooms — the Sons of God movement is growing across continents. 
                Each location reflects the same heartbeat: to awaken identity, empower leaders, and shape culture with Kingdom purpose. 
                Discover where transformation is happening and join the movement near you.
              </p>
            </div>

            {/* First Row - 3 Cards */}
            <div className="grid md:grid-cols-3 gap-5 mb-12">
              <div className="bg-gray-50">
                <img 
                  src="/assets/germany-europe-flag.png" 
                  alt="Germany/Europe Hub" 
                  className="w-full h-100 object-cover mb-4"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Germany / Europe Hub</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Our European base serves as the strategic center for conferences, leadership development, and media production. From Germany, the SOG movement connects with churches, creatives, and entrepreneurs across the continent.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50">
                <img 
                  src="/assets/kenya.png" 
                  alt="Kenya/Africa Network" 
                  className="w-full h-100 object-cover mb-4"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Kenya / Africa Network</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    In Africa, Sons of God began as a spark — igniting hearts, transforming communities, ministries, and youth movements. Through mentorship and discipleship programs, the Africa Network empowers a new generation to rise and lead with Kingdom values.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50">
                <img 
                  src="/assets/online-platform.png" 
                  alt="Online Platform" 
                  className="w-full h-100 object-cover mb-4"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Online Platform</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Our online platform connects believers, entrepreneurs, and creatives worldwide. Explore teachings, resources, and community tools designed to equip you for purpose-driven living — wherever you are.
                  </p>
                </div>
              </div>
            </div>

            {/* Second Row - 2 Cards + CTA */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50">
                <img 
                  src="/assets/events.png" 
                  alt="Events & Conferences" 
                  className="w-full h-100 object-cover mb-4"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Events & Initiatives</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    •	Events/Tours & Conferences: Gathering believers and leaders to experience transformation together.
                  <br></br>  •	Training & Workshops: Practical equipping for Kingdom leadership and creative influence.
                  <br></br>  •	Join the Movement: Be part of a global community of sons rising in every sphere.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50">
                <img 
                  src="/assets/trainings.png" 
                  alt="Training & Workshops" 
                  className="w-full h-100 object-cover mb-4"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Training & Workshops</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Unlock Cyber-Real, Die Mentoring der Marketplace und Entwicklung digitaler Lebensstil.
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 p-8 flex flex-col justify-center items-center text-center">
                <h3 className="text-5xl font-bold mb-6">Ready to Join the Movement?</h3>
                <p className="text-gray-700 mb-2 text-lg">Ready to rise with purpose?</p>
                <p className="text-gray-700 mb-8 text-lg">
                  Whether you're a leader, creative, or entrepreneur — there's a place for you in the Sons of God community.
                </p>
                <button className="bg-black text-white px-8 py-4 font-medium hover:bg-gray-800 transition-colors text-sm">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className='md:mt-30'>
            <StayInTouchSection />
        </div>

        {/* Meet the Visionary Section */}
          <div className="py-16 px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-left mb-16">
                <h2 className="text-2xl mb-4">Meet the Visionary — <span className="text-gray-500">The Man Behind the Movement</span></h2>
                <p className="text-gray-700 leading-relaxed max-w-4xl">
                  From the football fields of Africa to the boardrooms of Europe, Justine Birichi’s journey is one of faith, leadership, and transformation. As the visionary behind Sons of God, together with his partner George and a passionate team, he continues to bridge business, culture, and purpose — inspiring a new generation of leaders to rise with identity, excellence, and impact. Rooted in a shared Kingdom vision through PortMedia, this movement reflects more than a brand — it’s a calling to reveal heaven’s design in everyday life and leadership.
                </p>
              </div>

              {/* Three Cards */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white flex flex-col">
                  <img 
                    src="/assets/leadership.png" 
                    alt="Leadership & Vision" 
                    className="w-full h-80 object-cover"
                  />
                  <div className="bg-gray-100 p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-4">Leadership & Vision</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-1">
                      Through over 15 years of leadership across Africa and Europe, Justine has guided teams, entrepreneurs, and future leaders with wisdom, authenticity, and integrity. His passion is to empower people through transformation and help them lead with Kingdom purpose.
                    </p>
                    <button className="text-black underline font-medium">
                      Explore His Vision
                    </button>
                  </div>
                </div>

                <div className="bg-white flex flex-col">
                  <img 
                    src="/assets/portmetals.png" 
                    alt="Portmetals International GmbH" 
                    className="w-full h-80 object-cover"
                  />
                  <div className="bg-gray-100 p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-4">Portmedia GmbH</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-1">
                      As CEO and Managing Director, Justine spearheads a platform that unites global trade, leadership, innovation, and media ventures. His work in business and ministry integrates Kingdom values into the marketplace — creating lasting transformation in business and society.
                    </p>
                    <button className="text-black underline font-medium">
                      <Link to="/portmedia">Discover Portmedia</Link>
                    </button>
                  </div>
                </div>

                <div className="bg-white flex flex-col">
                  <img 
                    src="/assets/shift.png" 
                    alt="Sons of God & SHIFT" 
                    className="w-full h-80 object-cover"
                  />
                  <div className="bg-gray-100 p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-4">Sons of God & SHIFT</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-1">
                      What began as a spark has grown into a movement. Sons of God and SHIFT equip a new generation of leaders to live with faith, authenticity, and divine purpose. From conferences to mentorship, Justine's mission is to raise leaders who shape the world with Kingdom identity.
                    </p>
                    <button className="text-black underline font-medium">
                      Read the SHIFT now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* From Fantasy to Faith Section */}
        <div className="bg-gray-50 py-16 px-8">
          <div className="max-w-6xl mx-auto">
            <p className="text-gray-500 text-md mb-8">Leadership forum - Live Experience</p>
            
            {/* Desktop Layout */}
            <div className="hidden md:flex gap-12 items-center bg-black">
              <div className="w-3/4">
                <img 
                  src="/assets/faith.png" 
                  alt="True Imagination Live Experience" 
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="w-1/4 p-2">
                <h2 className="text-4xl text-white font-bold mb-6">True Imagination</h2>
                <p className="text-white leading-relaxed mb-6 mr-6">
                  In this message, Bernardo Schmidt and Justin Birichi reveal how to break free from false fantasies and embrace God's true vision for your life — raw, powerful, and transformant.
                </p>
                <button className="bg-white text-black border border-gray-300 px-12 py-3 font-medium hover:bg-gray-50 transition-colors">
                  Watch now
                </button>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden bg-black">
              <div className="w-full">
                <img 
                  src="/assets/faith.png" 
                  alt="True Imagination Live Experience" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl text-white font-bold mb-4">True Imagination</h2>
                <p className="text-white leading-relaxed mb-6 text-sm">
                  In this message, Bernardo Schmidt and Justin Birichi reveal how to break free from false fantasies and embrace God's true vision for your life — raw, powerful, and transformant.
                </p>
                <button className="bg-white text-black border border-gray-300 px-8 py-3 font-medium hover:bg-gray-50 transition-colors w-full">
                  Watch now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Our Partners Section */}
        <div className="bg-white py-16 px-8" id="partner-section">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-xl md:text-2xl mb-4">Our Partners - <span className="text-gray-500">Building the Kingdom Together</span></h2>
              <p className="text-gray-700 leading-relaxed max-w-4xl text-sm md:text-base">
                Strategic partnerships are an essential part of Sons of God's growth concept. Through strategic collaborations 
                with renowned organizations, we offer tailored solutions and high-quality resources for a variety of ministries and communities.
              </p>
            </div>

            {/* Partner Logos */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 mb-12">
              <div className="bg-gray-100 h-24 md:h-32 flex items-center justify-center">
                <img 
                  src="/assets/christ-ministries.png" 
                  alt="Christ Ministries" 
                  className="h-6 md:h-8 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Church Partnership Section */}
        <div className="bg-black py-16 px-8" id="contact-section">
          <div className="max-w-6xl mx-auto">
            {/* Desktop Layout */}
            <div className="hidden md:flex gap-12 bg-white items-center">
              <div className="w-1/2">
                <img 
                  src="/assets/heart-church.png" 
                  alt="Church Ministry Collage" 
                  className="w-full h-96 object-contain"
                />
              </div>
              <div className="w-1/2 mr-20">
                <input 
                  type="text" 
                  placeholder="Your Church / Ministry"
                  className="w-90 px-4 py-3 border border-gray-300 focus:outline-none focus:border-black mb-4"
                />
                <h2 className="text-3xl font-bold mb-6">Be Part of a Global Move of Sons Rising in Purpose.</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  We’re connecting Kingdom-minded churches, ministries, and believers who long to see heaven’s culture revealed on earth. Let’s unite for transformation and lasting impact.
                </p>
                <div className="flex gap-4">
                  <input 
                    type="email" 
                    placeholder="Your mail address"
                    className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
                  />
                  <button className="bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden bg-white">
              <div className="w-full">
                <img 
                  src="/assets/heart-church.png" 
                  alt="Church Ministry Collage" 
                  className="w-full h-64 object-contain"
                />
              </div>
              <div className="p-6">
                <input 
                  type="text" 
                  placeholder="Your Church / Ministry"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black mb-4"
                />
                <h2 className="text-xl font-bold mb-4">Be Part of a Global Move of Sons Rising in Purpose.</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                  We’re connecting Kingdom-minded churches, ministries, and believers who long to see heaven’s culture revealed on earth. Let’s unite for transformation and lasting impact.
                </p>
                <div className="flex flex-col gap-3">
                  <input 
                    type="email" 
                    placeholder="Your mail address"
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
                  />
                  <button className="bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
              <div className="flex flex-col md:flex-row justify-center px-20 bg-gray-100 w-full md:grid-cols-4 gap-10 py-10 mx-auto">
                <div className="flex flex-col md:flex-row justify-center grid-cols-1">
                  <div className="text-center py-10 md:p-10 max-w-[400px]">
                    <div className="mb-4">
                      <FiCreditCard size={24} className="mx-auto text-gray-400" />
                    </div>
                    <h3 className="font-bold text-lg">MULTIPLE PAYMENT OPTIONS</h3>
                    <p className="text-xs text-gray-500 mt-2">Pay the way that suits you best – flexible and secure.</p> {/* Added mt-2 */}
                  </div>
                  <div className="text-center py-10 md:p-10 max-w-[400px]">
                    <div className="mb-4">
                      <FiTruck size={24} className="mx-auto text-gray-400" />
                    </div>
                    <h3 className="font-bold text-lg">FREE SHIPPING WITHIN GERMANY</h3>
                    <p className="text-xs text-gray-500 mt-2">All prices include VAT plus shipping costs. Free shipping within Germany - excluding islands</p> {/* Added mt-2 */}
                  </div>
                  <div className="text-center py-10 md:p-10 max-w-[400px]">
                    <div className="mb-4">
                      <FiGlobe size={24} className="mx-auto text-gray-400" />
                    </div>
                    <h3 className="font-bold text-lg">THE PORTAL FOR CHRISTIANS</h3>
                    <p className="text-xs text-gray-500 mt-2">Fashion, products, and inspiration – all in one place. Living visibly what we believe, together.</p> {/* Added mt-2 */}
                  </div>
                </div>
              </div>
        
              {/* Discover Section */}
              <div className="flex flex-col items-center justify-center pb-20 md:pt-20 bg-white">
                  <img 
                    src="/assets/discover-sog.webp" 
                    alt="Discover Sons of God" 
                    className="w-full md:px-50 h-auto object-cover mb-6" 
                  />
                <div className="w-full px-10 md:px-50">
                  <h2 className="text-3xl font-bold mb-6 text-left mt-15">DISCOVER THE WORLD OF SONS OF GOD</h2>
                  <p className="text-gray-500 text-base leading-relaxed text-left">
                    The Sons of God website is more than an online store — it is a platform created to inspire, equip, and connect believers. 
                    Here you will find a wide range of categories that reflect every aspect of Christian life. In the Fashion section, explore 
                    premium clothing designed to combine style with a powerful message, so that what you wear becomes a visible statement of your identity.
                  </p>
                  <p className="text-gray-500 text-base leading-relaxed text-left mt-4">
                    The Merchandise and Home & Living areas offer products that bring faith into your daily surroundings, from meaningful accessories 
                    to inspiring décor for your home.
                  </p>
                  <p className="text-gray-500 text-base leading-relaxed text-left mt-4">
                    For those who want to go deeper, our Books section provides resources for faith, study, and inspiration — from theology to practical 
                    guides and material for the next generation. In Training, you can access online courses, workshops, and certifications designed to 
                    strengthen leadership, faith, and practical living.
                  </p>
                  <p className="text-gray-500 text-base leading-relaxed text-left mt-4">
                    The Events area keeps you updated about upcoming gatherings, where you can experience community, worship, and teaching live, and even 
                    purchase your tickets directly online.
                  </p>
                  <p className="text-gray-500 text-base leading-relaxed text-left mt-4">
                    At Sons of God, everything is connected through our mission, rooted in Romans 8:19: creation is waiting for the sons and daughters of 
                    God to be revealed. This site is your place to discover, to grow, and to make your faith visible in everyday life — through what you 
                    wear, what you read, and how you live.
                  </p>
                </div>
              </div>
        
              {/* Newsletter Section */}
              <div className="bg-gray-100 p-10 md:px-50 text-center">
                <h2 className="text-2xl font-bold mb-4">Newsletter</h2>
                <p className="text-gray-700 text-sm mb-6">
                  Enjoy €10 off your next order and benefit from our news and offers.
                </p>
                <div className="flex justify-center items-center gap-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="hover:none focus:outline-none bg-white px-4 py-2 w-full max-w-md"
                  />
                  <button className="min-w-[120px] bg-black text-white px-6 py-2 border-none">Sign Up</button>
                </div>
                <p className="text-gray-500 text-xs mt-4">
                  By signing up, you agree that your data will be used for our newsletter distribution. 
                  The newsletter can be unsubscribed at any time. Further information and cancellation 
                  instructions can be found in our <a href="/privacy-policy" className="underline">Privacy Policy</a>.
                </p>
              </div>
        
    </div>
  );
};

export default About;
