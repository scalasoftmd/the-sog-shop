import '@fortawesome/fontawesome-free/css/all.css';
// import HeroSection from '../components/home/HeroSection';
// import ProductSections from '../components/home/ProductSections';
// import AboutSection from '../components/home/AboutSection';
// import StayInTouchSection from '../components/home/SatyInTouchSection';
// import ProductSection2 from '../components/home/ProductSection-2';
// import BooksProductSections from '../components/home/BooksProductSections';
import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import NavBarHome from '../components/home/NavBarHome';
import { FiCreditCard, FiGlobe, FiTruck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ProductSection from '../components/home/ProductSection';
import Loader from '../components/Loader';

const apiUrl = import.meta.env.VITE_API_URL;

export default function Home() {
  const [showNavBar, setShowNavBar] = useState(false);
  const [navBarClass, setNavBarClass] = useState('opacity-0 -translate-y-full');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  
  // ProductSections state
  const [newArrivals, setNewArrivals] = useState([]);
  const [kidsProducts, setKidsProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // AboutSection state
  const [showVideo, setShowVideo] = useState(false);

  // const openVideo = () => setShowVideo(true);
  const closeVideo = () => setShowVideo(false);

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

  // ProductSections effect
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Fetch New Arrivals (Men)
        const menRes = await fetch(`${apiUrl}/variations/new`);
        const menData = await menRes.json();
        const menMapped = (menData.entries || []).map((product: any) => ({
          id: product.item.id,
          image: product.images?.[0]?.url,
          name: product?.name || "Product Name",
          price: "EUR " + (product.variationSalesPrices?.[0]?.price || "0.00"),
        }));

        // Fetch Kids Products
        const kidsRes = await fetch(`${apiUrl}/variations/kids?itemsPerPage=4`);
        const kidsData = await kidsRes.json();
        const kidsMapped = (kidsData.entries || []).map((product: any) => ({
          id: product.item.id,
          image: product.images?.[0]?.url,
          name: product.name || "Product Name",
          price: "EUR " + (product.variationSalesPrices?.[0]?.price || "0.00"),
        }));

        setNewArrivals(menMapped);
        setKidsProducts(kidsMapped);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      
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

      {/* HeroSection */}
      <section className="hero md:mt-0 mt-20 relative w-full h-[92vh] bg-gray-100 text-center pt-16 mb-20">
        <img
          src="/assets/hero.webp"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover brightness-60"
        />
        <div className="relative z-10 container mx-auto px-4 py-10 sm:py-20 h-full flex flex-col sm:justify-start sm:items-start justify-center items-center sm:ml-[8%]">
          <img
            src="/assets/hero-header.png"
            alt="Text Image"
            className="scale-75 sm:scale-65 mx-auto sm:mx-0"
          />
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left sm:ml-[17%] sm:mt-[-2%]">
            <Link to="/fashion" className="text-white text-xl sm:text-3xl font-bold bg-transparent border-none mb-4 sm:mb-0 sm:mr-8 sm:ml-[-3vw] ml-[-40vw]">
              Shop Now &gt;
            </Link>
            <p className="hidden sm:block text-white text-[2vw] sm:text-2xl">
              This piece carries more than a logo — it carries a calling.<br />
              Son of God stands for identity, courage, and faith lived out loud.<br />
              Every shirt is a reminder that creation is waiting for you to rise and shine.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center bg-black text-white p-4 w-full sm:w-[80%] absolute bottom-0 left-1/2 transform -translate-x-1/2 h-24 sm:h-24">
            <div className="flex items-center justify-center gap-4 sm:gap-8 mx-auto">
              <Link to="https://open.spotify.com/episode/7jxb7CnCFlPECEwfSwrUQj?si=l97dQeioT-ytIFqA7B6DVQ" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-spotify h-3 w-3 sm:h-4 sm:w-4 text-white hover:text-yellow-400"></i>
              </Link>
              <Link to="https://www.tiktok.com/@leadership.forum" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-tiktok h-3 w-3 sm:h-4 sm:w-4 text-white hover:text-yellow-400"></i>
              </Link>
              <Link to="https://www.youtube.com/@leadershipforum-eu" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube h-3 w-3 sm:h-4 sm:w-4 text-white hover:text-yellow-400"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ProductSections */}
      <div>
        <ProductSection
          title="New Arrivals"
          subtitle="elevate your style"
          showAllHref="/fashion"
          products={isLoading ? Array(4).fill({}) : newArrivals}
        />

        <ProductSection
          title="Kids"
          subtitle="the next Generation"
          showAllHref="/fashion/kids"
          products={isLoading ? Array(4).fill({}) : kidsProducts}
        />
      </div>

      <img
        src="/assets/wear-what-you-believe.png"
        alt="Wear what you believe"
        className="w-full mt-30 md:h-auto h-[45vw] object-cover"
      />

      {/* AboutSection */}
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
                      This verse carries a powerful truth — that all of creation is longing, even groaning, for the sons and daughters of God to rise and step into their true identity. It speaks of a world waiting for light, hope, and the visible expression of God's family on earth.
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 mt-4 leading-relaxed">
                      <strong>Son of God</strong> was born out of this conviction. We believe faith is not hidden, but lived. It is not only words, but action — visible in the way we walk, the way we love, and yes, even in what we wear. Every collection, every product, every event is part of this movement: a call to rise, to stand bold, and to reflect the One who has called us His own.
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 mt-4 leading-relaxed">
                      This is more than fashion. It is a reminder that your life carries purpose. When you wear <strong>Son of God</strong>, you don't just put on clothing — you carry a statement, you step into identity, and you make visible what creation has been waiting for all along.
                  </p>
              </div>
            </div>
            <div className="relative w-full mt-20 mb-20 md:h-auto h-[80vw] md:h-[45vw]">
              <img src="/assets/about.jpg" alt="About us" className="w-full h-full object-cover object-left" />
              {/* <button
                // onClick={openVideo}
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
              </button> */}
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

      {/* Features Section */}
      <div className="flex flex-col md:flex-row justify-center px-20 bg-gray-100 w-full md:grid-cols-4 gap-10 mb-20 py-10 mx-auto">
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
      <div className="flex flex-col items-center justify-center pb-20 bg-white">
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
}