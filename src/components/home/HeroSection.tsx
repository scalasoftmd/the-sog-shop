import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';

export default function HeroSection() {
  return (
    <section className="hero md:mt-0 mt-20 relative w-full h-[92vh] bg-gray-100 text-center pt-16 mb-20">
      <img
        src="/assets/hero.png"
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

        {/* Black Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center bg-black text-white p-4 w-full sm:w-[80%] absolute bottom-0 left-1/2 transform -translate-x-1/2 h-24 sm:h-24">
          {/* <div className="hidden sm:flex items-center gap-4 sm:gap-17 mb-4 sm:mb-0 sm:ml-[7%]">
            <i className="fas fa-chevron-up text-xs sm:text-sm cursor-pointer text-white"></i>
            <i className="fas fa-chevron-down text-xs sm:text-sm cursor-pointer text-white"></i>
          </div> */}
          {/* <div className="hidden sm:flex items-center justify-center mx-auto w-full sm:w-[70%]">
            <i className="fas fa-search text-xs sm:text-base font-light mr-2 text-white"></i>
            <input
              type="text"
              placeholder="search here for product ..."
              className="w-full sm:w-[60%] p-1 text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none mb-2 mt-2 bg-transparent"
              style={{ borderBottom: '1px solid white', borderRadius: '0' }}
            />
          </div> */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 mx-auto">
            <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f h-3 w-3 sm:h-4 sm:w-4 text-white hover:text-yellow-400"></i>
            </Link>
            <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram h-3 w-3 sm:h-4 sm:w-4 text-white hover:text-yellow-400"></i>
            </Link>
            <Link to="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube h-3 w-3 sm:h-4 sm:w-4 text-white hover:text-yellow-400"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}