import '@fortawesome/fontawesome-free/css/all.css';
import HeroSection from '../components/home/HeroSection';
import ProductSections from '../components/home/ProductSections';
import AboutSection from '../components/home/AboutSection';
import StayInTouchSection from '../components/home/SatyInTouchSection';
import ProductSection2 from '../components/home/ProductSection-2';
import BooksProductSections from '../components/home/BooksProductSections';
import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import NavBarHome from '../components/home/NavBarHome';

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
      <div className="hidden md:block">
        <StayInTouchSection />
      </div>
      <ProductSection2 
        title="Essentials"
        subtitle="for everyday"
        showAllHref="/essentials"
        assets={[
          '/assets/steel-cup.jpg',
          '/assets/bag.jpg',
          '/assets/pillow.jpg'
        ]}
        products={[
          {
            image: 'https://picsum.photos/300/400?random=2',
            name: 'Product 1',
            price: '$19.99',
          },
          {
            image: 'https://picsum.photos/300/400?random=3',
            name: 'Product 2',
            price: '$29.99',
          },
          {
            image: 'https://picsum.photos/300/400?random=4',
            name: 'Product 3',
            price: '$39.99',
          }
        ]}
      />
      <BooksProductSections products={[
        {
          image: 'https://picsum.photos/300/400?random=5',
          name: 'Book 1',
          price: '$19.99',
        },
        {
          image: 'https://picsum.photos/300/400?random=6',
          name: 'Book 2',
          price: '$29.99',
        },
        {
          image: 'https://picsum.photos/300/400?random=7',
          name: 'Book 3',
          price: '$39.99',
        },
        {
          image: 'https://picsum.photos/300/400?random=8',
          name: 'Book 4',
          price: '$49.99',
        },
      ]} />

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