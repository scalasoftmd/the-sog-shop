import React from 'react';
import { FiCreditCard, FiGlobe, FiTruck } from 'react-icons/fi';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import Newsletter from '../components/Newsletter';

const MeetVisionary: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading time for page initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className='md:px-70'>
        <div className="mb-20 md:pl-50 md:pr-50 relative">
          {/* Background VISIONARY text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-6xl md:text-15xl lg:text-[16rem] font-bold text-gray-400 tracking-wider opacity-30">VISIONARY</h1>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center relative z-10">
            <div className="order-1 md:order-2 flex flex-col items-center">
              <img 
                src="/assets/founder.png" 
                alt="Justine Birichi" 
                className="p-5 md:h-150 w-auto mb-6 relative z-20"
              />
              
              <div className="flex flex-col items-center gap-4 md:gap-8 relative z-20">
                <h2 className="text-lg font-bold text-center">MEET THE VISIONARY</h2>
                <div className='flex flex-col md:flex-row gap-4'>
                  <img 
                    src="/assets/founder-signature.png" 
                    alt="Justine Birichi Signature" 
                    className="h-15 w-auto"
                  />
                </div>
                <button 
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
            <div className="absolute left-1/2 transform -translate-x-px w-0.5 bg-white" style={{ height: 'calc(100% + 10px)' }}></div>
            
            <div className="space-y-16">
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
            <div className="absolute left-[1px] top-0 w-0.5 bg-white h-full"></div>
            
            <div className="space-y-12">
              <div className="flex">
                <div className="w-4 h-4 bg-white rounded-full relative z-10 mt-2 flex-shrink-0" style={{ marginLeft: '-6px', marginRight: '24px' }}></div>
                <div className="flex-1">
                  <img src="/assets/1998-2002.png" alt="1998-2002" className="w-full h-48 object-cover mb-4 border-4 border-white" />
                  <h3 className="text-xl font-bold mb-3">1996 - 2002</h3>
                  <h4 className="text-lg mb-3">Beginnings on the Field</h4>
                  <p className="text-sm text-gray-300">A journey that started through sports and leadership, shaping discipline and vision.</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-4 h-4 bg-white rounded-full relative z-10 mt-2 flex-shrink-0" style={{ marginLeft: '-6px', marginRight: '24px' }}></div>
                <div className="flex-1">
                  <img src="/assets/2002.png" alt="2002" className="w-full h-48 object-cover mb-4 border-4 border-white" />
                  <h3 className="text-xl font-bold mb-3">2002</h3>
                  <h4 className="text-lg mb-3">Founding the Peace Boys Initiative</h4>
                  <p className="text-sm text-gray-300">Raising hope through youth programs that blended sport, purpose, and mentorship.</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-4 h-4 bg-white rounded-full relative z-10 mt-2 flex-shrink-0" style={{ marginLeft: '-6px', marginRight: '24px' }}></div>
                <div className="flex-1">
                  <img src="/assets/2004-2006.png" alt="2004-2006" className="w-full h-48 object-cover mb-4 border-4 border-white" />
                  <h3 className="text-xl font-bold mb-3">2004 - 2006</h3>
                  <h4 className="text-lg mb-3">A Calling Beyond Sport</h4>
                  <p className="text-sm text-gray-300">Transitioning into leadership and ministry, igniting passion for transformation and faith-driven leadership.</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-4 h-4 bg-white rounded-full relative z-10 mt-2 flex-shrink-0" style={{ marginLeft: '-6px', marginRight: '24px' }}></div>
                <div className="flex-1">
                  <img src="/assets/2007-2009.png" alt="2007-2009" className="w-full h-48 object-cover mb-4 border-4 border-white" />
                  <h3 className="text-xl font-bold mb-3">2007 - 2009</h3>
                  <h4 className="text-lg mb-3">Leadership Through Sport</h4>
                  <p className="text-sm text-gray-300">Launching programs and clubs that influenced communities and created safe spaces for youth to thrive.</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-4 h-4 bg-white rounded-full relative z-10 mt-2 flex-shrink-0" style={{ marginLeft: '-6px', marginRight: '24px' }}></div>
                <div className="flex-1">
                  <img src="/assets/2010-2016.png" alt="2010-2016" className="w-full h-48 object-cover mb-4 border-4 border-white" />
                  <h3 className="text-xl font-bold mb-3">2010 - 2016</h3>
                  <h4 className="text-lg mb-3">Expanding through Consulting & Marketplace Leadership</h4>
                  <p className="text-sm text-gray-300">Shaping leaders and organizations across Africa and Europe through values-based consulting and mentorship.</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-4 h-4 bg-white rounded-full relative z-10 mt-2 flex-shrink-0" style={{ marginLeft: '-6px', marginRight: '24px' }}></div>
                <div className="flex-1">
                  <img src="/assets/2017-2020.png" alt="2017-2020" className="w-full h-48 object-cover mb-4 border-4 border-white" />
                  <h3 className="text-xl font-bold mb-3">2017 - 2020</h3>
                  <h4 className="text-lg mb-3">Expanding Influence Across Continents</h4>
                  <p className="text-sm text-gray-300">Collaborating with ministries and leadership organizations globally, establishing the groundwork for a cross-cultural Kingdom movement.</p>
                </div>
              </div>

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
            <button className="bg-white text-black px-8 py-4 font-medium hover:bg-gray-100 transition-colors">
              Be Part of the Movement
            </button>
            <div className="mt-8">
              <p className="text-white text-lg leading-relaxed">The journey continues — inspiring a generation to rise,</p>
              <p className="text-white text-lg leading-relaxed">lead with purpose, and shape a world that reflects Kingdom values.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Meet the Visionary Section */}
      <div className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-left mb-16">
            <h2 className="text-2xl mb-4">Meet the Visionary — <span className="text-gray-500">The Man Behind the Movement</span></h2>
            <p className="text-gray-700 leading-relaxed max-w-4xl">
              From the football fields of Africa to the boardrooms of Europe, Justine Birichi's journey is one of faith, leadership, and transformation. As the visionary behind Sons of God, together with his partner George and a passionate team, he continues to bridge business, culture, and purpose — inspiring a new generation of leaders to rise with identity, excellence, and impact. Rooted in a shared Kingdom vision through PortMedia, this movement reflects more than a brand — it's a calling to reveal heaven's design in everyday life and leadership.
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

      {/* Features Section */}
      <div className="flex flex-col md:flex-row justify-center px-20 bg-gray-100 w-full md:grid-cols-4 gap-10 mx-auto mb-20 md:mb-0">
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

      {/* Discover Section */}
      <div className="flex flex-col items-center justify-center pb-20 md:pt-20 bg-white">
        <img 
          src="/assets/discover-sog.webp" 
          alt="Discover Sons of God" 
          className="w-full md:px-50 h-auto object-cover mb-6" 
        />
        <div className="w-full px-10 md:px-50">
          <h2 className="text-3xl font-bold mb-6 text-left mt-15">THE MOVEMENT CONTINUES</h2>
          <p className="text-gray-500 text-base leading-relaxed text-left mb-8">
            Through the Portmedia ecosystem, SOG extends its reach across media, design, leadership, and cultural innovation — inspiring people everywhere to live with purpose, create with excellence, and build with eternity in mind.
          </p>
          
          <h2 className="text-3xl font-bold mb-6 text-left">DISCOVER THE WORLD OF SOG</h2>
          <p className="text-gray-500 text-base leading-relaxed text-left">
            Explore our collections, stories, and resources designed to help you live your faith with excellence and style.
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default MeetVisionary;
