import React from 'react';
import { FiCreditCard, FiGlobe, FiTruck } from 'react-icons/fi';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import Newsletter from '../components/Newsletter';

const About: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState('THE MISSION');
  const [isLoading, setIsLoading] = React.useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);
  const [churchName, setChurchName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isSubscribing, setIsSubscribing] = React.useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = React.useState('');

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
    { name: 'MOVEMENT', id: 'movement-section' },
    { name: 'PODCAST', id: 'podcast-section' },
    { name: 'PARTNER', id: 'partner-section' },
    { name: 'CONTACT', id: 'contact-section' }
  ];

  const handleSubscribe = async () => {
    if (!email) {
      setSubscriptionMessage('Please enter your email address');
      return;
    }

    setIsSubscribing(true);
    setSubscriptionMessage('');

    try {
      const response = await fetch('https://us-central1-the-sog-shop.cloudfunctions.net/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          firstName: churchName || '', // Use church name as firstName
          lastName: '' // Empty lastName since we only have church name
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscriptionMessage('Successfully subscribed!');
        setEmail('');
        setChurchName('');
      } else {
        setSubscriptionMessage(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setSubscriptionMessage('Failed to subscribe. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

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

        <div className="mb-20 md:pl-10 md:pr-10" id="mission-section">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="order-2 md:order-1 p-7 md:p-0">
              <h2 className="text-xl font-bold mb-6 text-center">BORN FOR MORE. BUILT TO REIGN.</h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg text-center">
                SOG (Sons of God) is more than a brand — it is a movement, a calling, and a culture.
                Rooted in Kingdom identity, SOG exists to awaken sons and daughters of God to live out divine purpose with faith, excellence, and influence in every sphere of life.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                  <h3 className="text-lg font-bold mb-3">OUR ORIGIN</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Founded through Kingdom visionaries Justine Birichi and Eugen Wiebe, SOG was birthed from a shared conviction:
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm italic mt-2">
                    True leadership begins with identity, and transformation starts when sons rise.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm mt-2">
                    From prophetic insight and creative leadership (Justine) to strategic and structural wisdom (Eugen), the SOG story embodies the union of vision and execution, spirit and structure, faith and function — shaping a movement that bridges heaven's values with earth's realities.
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-bold mb-3">OUR MISSION</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    To raise a generation of Kingdom leaders who:
                  </p>
                  <ul className="text-gray-700 leading-relaxed text-sm list-disc list-inside mt-2">
                    <li>Know who they are in God.</li>
                    <li>Lead with integrity, excellence, and love.</li>
                    <li>Influence culture without losing Kingdom character.</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed text-sm mt-2">
                    We believe that when identity is restored, authority flows naturally — and when sons stand tall, the world is transformed.
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-bold mb-3">OUR VALUES</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Faith. Integrity. Excellence. Empowerment. Impact.
                    These five pillars form the DNA of everything we build — from content and community to commerce and culture.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm mt-2">
                    They reflect our commitment to create with purpose, lead with grace, and live with eternal significance.
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-bold mb-3">OUR COLLECTIVE</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    SOG is stewarded by a growing community of creatives, entrepreneurs, and leaders who share one heart — to represent the King authentically in every domain of influence.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm mt-2">
                    It's not about one person or platform; it's about a generation rising together.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm italic mt-2">
                    "We are sons. We rise. We reign — not for dominance, but for service."
                  </p>
                </div>
              </div>
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

            <div className="grid md:grid-cols-3 md:grid-rows-2 gap-5 mb-12">
              {/* First Column - Germany/Europe Hub */}
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

              {/* Second Column - Online Platform */}
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

              {/* Third Column - Full Height Spanning Both Rows */}
              <div className="bg-gray-100 p-8 flex flex-col justify-center items-center text-center md:row-span-2">
                <h3 className="text-5xl font-bold mb-6">Ready to Join the Movement?</h3>
                <p className="text-gray-700 mb-2 text-lg">Ready to rise with purpose?</p>
                <p className="text-gray-700 mb-8 text-lg">
                  Whether you're a leader, creative, or entrepreneur — there's a place for you in the Sons of God community.
                </p>
                <button 
                  className="bg-black text-white px-8 py-4 font-medium hover:bg-gray-800 transition-colors text-sm cursor-pointer"
                  onClick={() => {
                    const newsletterElement = document.querySelector('[data-newsletter]');
                    if (newsletterElement) {
                      const navbarHeight = 80;
                      const elementPosition = newsletterElement.getBoundingClientRect().top + window.pageYOffset;
                      const offsetPosition = elementPosition - navbarHeight;
                      
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  Subscribe Now
                </button>
              </div>

              {/* First Column Second Row - Events & Initiatives */}
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

              {/* Second Column Second Row - Training & Workshops */}
              <div className="bg-gray-50">
                <img 
                  src="/assets/trainings.png" 
                  alt="Training & Workshops" 
                  className="w-full h-100 object-cover mb-4"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Training & Workshops</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Unlock Cyber-Real, Die Mentoring der Marketplace und Entwicklung digitaler Lebensstil.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="bg-gray-50 py-16 px-8" id="podcast-section">
          <div className="max-w-6xl mx-auto">
            <p className="text-gray-500 text-md mb-8">SOG Podcast - Live Experience</p>

            <div className="hidden md:flex gap-12 items-center bg-black">
              <div className="w-3/4">
                <img 
                  src="/assets/faith.png" 
                  alt="True Imagination Live Experience" 
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="w-1/4 p-2">
                <h2 className="text-2xl text-white font-bold mb-2">True Imagination</h2>
                <p className="text-white leading-relaxed mb-4 mr-6">
                  In this message, Bernardo Schmidt and Justin Birichi reveal how to break free from false fantasies and embrace God's true vision for your life — raw, powerful, and transformant.
                </p>
                <button className="bg-white text-black border border-gray-300 px-12 py-3 font-medium hover:bg-gray-50 transition-colors">
                  <Link to="https://www.youtube.com/watch?app=desktop&v=Xt_qzeD0eos">Watch now</Link>
                </button>
              </div>
            </div>

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
                  <Link to="https://www.youtube.com/watch?app=desktop&v=Xt_qzeD0eos">Watch now</Link>
                </button>
              </div>
            </div>
          </div>
        </div> */}

        <div className="bg-white py-16 px-8" id="partner-section">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-xl md:text-2xl mb-4">Our Partners - <span className="text-gray-500">Building the Kingdom Together</span></h2>
              <p className="text-gray-700 leading-relaxed max-w-4xl text-sm md:text-base">
                SOG collaborates with ministries, creatives, and businesses that share our passion for excellence, integrity, and impact.
                Partners: CHRIST ministries, hold on hope africa, ZCMG +, Media & Faith Studios, and more.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-black py-16 px-8" id="contact-section">
          <div className="max-w-6xl mx-auto">
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
                  value={churchName}
                  onChange={(e) => setChurchName(e.target.value)}
                  className="w-90 px-4 py-3 border border-gray-300 focus:outline-none focus:border-black mb-4"
                />
                <h2 className="text-3xl font-bold mb-6">Be Part of a Global Move of Sons Rising in Purpose.</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  We're connecting Kingdom-minded churches, ministries, and believers who long to see heaven's culture revealed on earth. Let's unite for transformation and lasting impact.
                </p>
                <div className="flex gap-4">
                  <input 
                    type="email" 
                    placeholder="Your mail address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
                  />
                  <button 
                    onClick={handleSubscribe}
                    disabled={isSubscribing}
                    className="bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
                {subscriptionMessage && (
                  <p className={`mt-4 text-sm ${subscriptionMessage.includes('Successfully') ? 'text-green-600' : 'text-red-600'}`}>
                    {subscriptionMessage}
                  </p>
                )}
              </div>
            </div>

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
                  value={churchName}
                  onChange={(e) => setChurchName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black mb-4"
                />
                <h2 className="text-xl font-bold mb-4">Be Part of a Global Move of Sons Rising in Purpose.</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                  We're connecting Kingdom-minded churches, ministries, and believers who long to see heaven's culture revealed on earth. Let's unite for transformation and lasting impact.
                </p>
                <div className="flex flex-col gap-3">
                  <input 
                    type="email" 
                    placeholder="Your mail address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
                  />
                  <button 
                    onClick={handleSubscribe}
                    disabled={isSubscribing}
                    className="bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
                {subscriptionMessage && (
                  <p className={`mt-4 text-sm ${subscriptionMessage.includes('Successfully') ? 'text-green-600' : 'text-red-600'}`}>
                    {subscriptionMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center px-20 bg-gray-100 w-full md:grid-cols-4 gap-10 py-10 mx-auto mt-20 mb-20 md:mb-0">
          <div className="flex flex-col md:flex-row justify-center grid-cols-1">
            <div className="text-center py-10 md:p-10 max-w-[400px]">
              <div className="mb-4">
                <FiCreditCard size={24} className="mx-auto text-gray-400" />
              </div>
              <h3 className="font-bold text-lg">MULTIPLE PAYMENT OPTIONS</h3>
              <p className="text-xs text-gray-500 mt-2">Pay the way that suits you best – flexible and secure.</p>
            </div>
            <div className="text-center py-10 md:p-10 max-w-[400px]">
              <div className="mb-4">
                <FiTruck size={24} className="mx-auto text-gray-400" />
              </div>
              <h3 className="font-bold text-lg">FREE SHIPPING WITHIN GERMANY</h3>
              <p className="text-xs text-gray-500 mt-2">All prices include VAT plus shipping costs. Free shipping within Germany - excluding islands</p>
            </div>
            <div className="text-center py-10 md:p-10 max-w-[400px]">
              <div className="mb-4">
                <FiGlobe size={24} className="mx-auto text-gray-400" />
              </div>
              <h3 className="font-bold text-lg">THE PORTAL FOR CHRISTIANS</h3>
              <p className="text-xs text-gray-500 mt-2">Fashion, products, and inspiration – all in one place. Living visibly what we believe, together.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center pb-20 md:pt-20 bg-white">
            <img 
              src="/assets/discover-sog.webp" 
              alt="Discover Sons of God" 
              className="w-full md:px-50 h-auto object-cover mb-6" 
            />
        </div>

        <div data-newsletter>
          <Newsletter />
        </div>
    </div>
  );
};

export default About;
