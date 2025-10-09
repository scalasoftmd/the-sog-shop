import '@fortawesome/fontawesome-free/css/all.css';
import HeroSection from '../components/home/HeroSection';
import ProductSections from '../components/home/ProductSections';
import AboutSection from '../components/home/AboutSection';
// import StayInTouchSection from '../components/home/SatyInTouchSection';
// import ProductSection2 from '../components/home/ProductSection-2';
// import BooksProductSections from '../components/home/BooksProductSections';
import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import NavBarHome from '../components/home/NavBarHome';
import { FiCreditCard, FiGlobe, FiTruck } from 'react-icons/fi';

export default function Home() {
  const [showNavBar, setShowNavBar] = useState(false);
  const [navBarClass, setNavBarClass] = useState('opacity-0 -translate-y-full'); // Initial animation class
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768); // Check if the screen is desktop

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // Update the screen type on resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isDesktop) { // Apply scroll logic only for desktop
      const handleScroll = () => {
        const scrollThreshold = window.innerHeight * 0.07; // 7% of the viewport height
        const shouldShowNavBar = window.scrollY > scrollThreshold;

        if (shouldShowNavBar && !showNavBar) {
          setShowNavBar(true);
          setTimeout(() => setNavBarClass('opacity-100 translate-y-0'), 200); // Fade-in and slide-down
        } else if (!shouldShowNavBar && showNavBar) {
          setNavBarClass('opacity-0 -translate-y-full'); // Fade-out and slide-up
          setTimeout(() => setShowNavBar(false), 300); // Remove after animation
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showNavBar, isDesktop]);

  return (
    <div>
      {isDesktop ? (
        <>
          <NavBarHome /> {/* Always render NavBarHome for desktop */}
          {showNavBar && (
            <div
              className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ease-in-out ${navBarClass}`}
            >
              <NavBar /> {/* Overlay NavBar with animations */}
            </div>
          )}
        </>
      ) : (
        <NavBar /> // Always render NavBar for mobile
      )}
      <HeroSection />
      <ProductSections />
      <img
        src="/assets/wear-what-you-believe.png"
        alt="Wear what you believe"
        className="w-full mt-30 md:h-auto h-[45vw] object-cover"
      />
      <AboutSection />

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
            <h3 className="font-bold text-lg">FREE SHIPPING FROM €100</h3>
            <p className="text-xs text-gray-500 mt-2">Get free delivery within Germany on all orders over €100.</p> {/* Added mt-2 */}
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
            src="/assets/discover-sog.png" 
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
}