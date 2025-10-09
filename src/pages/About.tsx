import React from 'react';
import StayInTouchSection from '../components/home/SatyInTouchSection';
import { FiCreditCard, FiGlobe, FiTruck } from 'react-icons/fi';

const About: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState('THE MISSION');

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

  const navigationSections = [
    { name: 'THE MISSION', id: 'mission-section' },
    { name: 'IMAGEFILM', id: 'imagefilm-section' },
    { name: 'TIMELINE', id: 'timeline-section' },
    { name: 'MOVEMENT', id: 'movement-section' },
    { name: 'PARTNER', id: 'partner-section' },
    { name: 'CONTACT', id: 'contact-section' }
  ];

  return (
    <div>
      <div className="relative mb-12 mt-5">
        <div className="relative w-full h-auto">
          <img 
            src="/assets/about-header.png" 
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
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <div className="order-2 md:order-1 p-5 md:p-0">
              <h2 className="text-xl font-bold mb-6 text-left">From Vision to Movement: The Birth of Sons of God</h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                In the heart of Europe, a movement was born — one that carries the sound of transformation and the power of divine purpose. Sons of God (SOG) emerged from a vision to awaken identity, empower leaders, and shape cultures with Kingdom values.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                What began as a spark in the heart of visionary leader Justine Birichi has grown into a global platform uniting believers, entrepreneurs, and creatives under one calling: to manifest the glory of God in every sphere of life.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                From conferences and media to leadership training and apparel, every part of SOG reflects one truth — creation is waiting for the sons of God to rise (Romans 8:19).
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                Our mission is to equip and inspire a generation to lead with purpose, influence with integrity, and bring transformation wherever they are planted.
              </p>
              <div className="flex flex-col order-2 md:order-1 md:flex-row items-center gap-8 md:gap-20">

                <img 
                  src="/assets/founder-signature.png" 
                  alt="Justine Birichi Signature" 
                  className=" md:hidden h-15 w-auto"
                />

                <button className="bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors w-fit">
                  Watch our Story
                </button>
                <img 
                  src="/assets/founder-signature.png" 
                  alt="Justine Birichi Signature" 
                  className="hidden md:block h-15 w-auto"
                />
              </div>
            </div>
            <img 
              src="/assets/founder.png" 
              alt="Justine Birichi" 
              className="h-80 md:h-140 w-auto order-1 md:order-2"
            />
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
                The message of Sons of God goes beyond pulpits — it's a lifestyle of purpose and transformation. What began at prayer rooms and small gatherings has grown into a movement that touches every sphere of life. Through coaching, leadership, and community, SOG inspires believers to embrace new faith levels and guidance on every project, initiative, and product carries a message of hope and identity — reflecting Kingdom values in real-world culture.
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
                True transformation begins within. In The Leader's SHIFT, Justine Birichi guides readers through the nine journey steps every leader must take — from managing people to embracing purpose. Drawing from decades of experience in leadership, faith, and culture, he shares how mindset, values, and spiritual maturity shape authentic influence. This book is a blueprint for leaders ready to move beyond performance.
              </p>
            </div>

            <div className="text-left">
              <img 
                src="/assets/navigating-change.png" 
                alt="Navigating Change" 
                className="w-full h-64 object-cover mb-4"
              />
              <h3 className="text-xl font-bold mb-3">Navigating Change, Culture & Calling</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Change is inevitable — but transformation is intentional. In The SHIFT, Justine Birichi explores the dynamics of transition across life, business, and faith. Through real-world stories and global insights, he shares wisdom to embrace change as a catalyst for growth and renewal. Whether you're leading a company, a community, or your own journey of faith, The SHIFT offers timeless principles to help you align vision, courage, and destiny in a rapidly changing world.
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
                Since its foundation, Sons of God has continued to grow from a vision into a global movement. What began with a message of transformation has expanded into conferences, media, education, and literature — all carrying the same heartbeat: to make faith visible in every sphere of life. Through continuous innovation and partnerships, SOG reaches between diverse continents while staying rooted in Kingdom values and divine purpose-driven excellence.
              </p>
            </div>

            <div className="text-left">
              <img 
                src="/assets/media-mentorship.png" 
                alt="Media and Mentorship" 
                className="w-full h-64 object-cover mb-4"
              />
              <h3 className="text-xl font-bold mb-3">Media and Mentorship</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                At the core of SOG lies the power of communication. Through films, podcasts, and leadership sessions, Justine Birichi and his team share stories that inspire transformation. Each program connects hearts to purpose, equipping seekers, entrepreneurs, and creatives to influence their world with wisdom and grace. From local gatherings to digital platforms, SOG's media serves as a tool to catalyze the next generation called to rise.
              </p>
            </div>

            <div className="text-left">
              <img 
                src="/assets/bible-studies.png" 
                alt="Bible Studies" 
                className="w-full h-64 object-cover mb-4"
              />
              <h3 className="text-xl font-bold mb-3">Bible Studies for Everyday Life</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Faith grows when it meets understanding. Through Bible Studies and teaching resources, SOG helps believers explore their knowledge of Scripture and apply truth in practical ways. Designed for both individual and groups, these studies bridge theology and daily living — empowering people to walk in wisdom, strengthen their faith, and live out God's purpose wherever they are. Each session inspires deeper reflection, conversation, and a renewed passion.
              </p>
            </div>
          </div>
        </div>
      </div>

        <div className="md:px-70 mb-16 bg-gray-50 p-5 md:p-8" id="imagefilm-section">
          <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
            <span className="text-lg md:text-xl mb-4 md:mb-0">Experience the Vision <span className="text-gray-500">- The Story Behind Sons of God</span></span>
            <button className="hidden bg-black text-white px-4 py-2 text-sm w-fit md:ml-4">
              Discover More Stories
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="flex-1">
              <img 
                src="/assets/podcast-bible-image.png" 
                alt="Bible and Podcast" 
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">A Glimpse into the Heart of Sons of God</h2>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                In this powerful podcast episode, visionary leader Justine Birichi unfolds the message behind Sons of God — the heartbeat of the Sons of God movement.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4 text-sm md:text-base">
                He shares how creation itself is in expectation to see, to reveal purpose, identity, and divine strength in a world longing for light.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4 text-sm md:text-base">
                Join this inspiring conversation as Justine unpacks the story behind the vision — from faith, wisdom, and culture converge to awaken a movement that carries the sound of Heaven into every sphere of life.
              </p>
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
              <h3 className="text-white mb-4">Story - <span className="text-gray-400">The Journey of Justine Birichi</span></h3>
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
                    <h3 className="text-3xl font-bold mb-6">1998 - 2002</h3>
                    <h4 className="text-2xl mb-6">Beginning on the Field</h4>
                    <p className="text-lg text-gray-300">Justine Birichi's journey began on the football fields of Africa, where his passion for the game shaped his character and revealed his natural leadership abilities. These formative years instilled values of teamwork, perseverance, and relentless pursuit, qualities that would later become the foundation of his ministry.</p>
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
                    <h4 className="text-2xl mb-6">Answering the Altar Boys Initiative</h4>
                    <p className="text-lg text-gray-300">During his teenage years, Justine responded to a calling that would redirect his life's trajectory. Embracing faith as a guiding force, he became actively involved in church activities and youth leadership, developing his skills in communication, discipleship, and spiritual guidance that would define his future calling.</p>
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
                    <p className="text-lg text-gray-300">Justine's path evolved into ministry as he recognized a deeper calling beyond athletic achievement. During this period, he immersed himself in theological study and practical ministry, developing foundational leadership skills and spiritual maturity that would later define his approach to faith-based transformation.</p>
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
                    <p className="text-lg text-gray-300">In these transformative years, Justine discovered how to integrate his passion for sports with his calling to minister. He began organizing sport-based youth programs, using athletics as a platform for character development, leadership training, and spiritual growth among young people in his community.</p>
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
                    <h4 className="text-2xl mb-6">Corporate Consulting & Multicultural Leadership</h4>
                    <p className="text-lg text-gray-300">Justine's leadership expanded into the corporate world, where he became a sought-after consultant and speaker. Working across different cultures and industries, he developed expertise in cross-cultural communication, organizational development, and leadership transformation that would later influence his global ministry approach.</p>
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
                    <h4 className="text-2xl mb-6">Expanding Influence Across Europe</h4>
                    <p className="text-lg text-gray-300">Building on years of experience, Justine expanded his influence throughout Europe. During this period, he established key partnerships, launched international conferences, and began developing the systematic approaches to leadership and spiritual development that would become hallmarks of the Sons of God movement.</p>
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
                    <h4 className="text-2xl mb-6">SOG Visionary Leader at Powerhouse International</h4>
                    <p className="text-lg text-gray-300">Today, Justine serves as the visionary leader of Sons of God and Powerhouse International, a global movement that spans continents and cultures. Through conferences, media, literature, and mentorship, he continues to equip and inspire a generation of leaders to embrace their divine purpose and transform their communities with Kingdom values.</p>
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
                    <h3 className="text-xl font-bold mb-3">1998 - 2002</h3>
                    <h4 className="text-lg mb-3">Beginning on the Field</h4>
                    <p className="text-sm text-gray-300">Justine Birichi's journey began on the football fields of Africa, where his passion for the game shaped his character and revealed his natural leadership abilities. These formative years instilled values of teamwork, perseverance, and relentless pursuit, qualities that would later become the foundation of his ministry.</p>
                  </div>
                </div>

                {/* 2002 */}
                <div className="flex">
                  <div className="w-4 h-4 bg-white rounded-full relative z-10 mt-2 flex-shrink-0" style={{ marginLeft: '-6px', marginRight: '24px' }}></div>
                  <div className="flex-1">
                    <img src="/assets/2002.png" alt="2002" className="w-full h-48 object-cover mb-4 border-4 border-white" />
                    <h3 className="text-xl font-bold mb-3">2002</h3>
                    <h4 className="text-lg mb-3">Answering the Altar Boys Initiative</h4>
                    <p className="text-sm text-gray-300">During his teenage years, Justine responded to a calling that would redirect his life's trajectory. Embracing faith as a guiding force, he became actively involved in church activities and youth leadership, developing his skills in communication, discipleship, and spiritual guidance that would define his future calling.</p>
                  </div>
                </div>

                {/* 2004-2006 */}
                <div className="flex">
                  <div className="w-4 h-4 bg-white rounded-full relative z-10 mt-2 flex-shrink-0" style={{ marginLeft: '-6px', marginRight: '24px' }}></div>
                  <div className="flex-1">
                    <img src="/assets/2004-2006.png" alt="2004-2006" className="w-full h-48 object-cover mb-4 border-4 border-white" />
                    <h3 className="text-xl font-bold mb-3">2004 - 2006</h3>
                    <h4 className="text-lg mb-3">A Calling Beyond Sport</h4>
                    <p className="text-sm text-gray-300">Justine's path evolved into ministry as he recognized a deeper calling beyond athletic achievement. During this period, he immersed himself in theological study and practical ministry, developing foundational leadership skills and spiritual maturity that would later define his approach to faith-based transformation.</p>
                  </div>
                </div>

                {/* 2007-2009 */}
                <div className="flex">
                  <div className="w-4 h-4 bg-white rounded-full relative z-10 mt-2 flex-shrink-0" style={{ marginLeft: '-6px', marginRight: '24px' }}></div>
                  <div className="flex-1">
                    <img src="/assets/2007-2009.png" alt="2007-2009" className="w-full h-48 object-cover mb-4 border-4 border-white" />
                    <h3 className="text-xl font-bold mb-3">2007 - 2009</h3>
                    <h4 className="text-lg mb-3">Leadership Through Sport</h4>
                    <p className="text-sm text-gray-300">In these transformative years, Justine discovered how to integrate his passion for sports with his calling to minister. He began organizing sport-based youth programs, using athletics as a platform for character development, leadership training, and spiritual growth among young people in his community.</p>
                  </div>
                </div>

                {/* 2010-2016 */}
                <div className="flex">
                  <div className="w-4 h-4 bg-white rounded-full relative z-10 mt-2 flex-shrink-0" style={{ marginLeft: '-6px', marginRight: '24px' }}></div>
                  <div className="flex-1">
                    <img src="/assets/2010-2016.png" alt="2010-2016" className="w-full h-48 object-cover mb-4 border-4 border-white" />
                    <h3 className="text-xl font-bold mb-3">2010 - 2016</h3>
                    <h4 className="text-lg mb-3">Corporate Consulting & Multicultural Leadership</h4>
                    <p className="text-sm text-gray-300">Justine's leadership expanded into the corporate world, where he became a sought-after consultant and speaker. Working across different cultures and industries, he developed expertise in cross-cultural communication, organizational development, and leadership transformation that would later influence his global ministry approach.</p>
                  </div>
                </div>

                {/* 2017-2020 */}
                <div className="flex">
                  <div className="w-4 h-4 bg-white rounded-full relative z-10 mt-2 flex-shrink-0" style={{ marginLeft: '-6px', marginRight: '24px' }}></div>
                  <div className="flex-1">
                    <img src="/assets/2017-2020.png" alt="2017-2020" className="w-full h-48 object-cover mb-4 border-4 border-white" />
                    <h3 className="text-xl font-bold mb-3">2017 - 2020</h3>
                    <h4 className="text-lg mb-3">Expanding Influence Across Europe</h4>
                    <p className="text-sm text-gray-300">Building on years of experience, Justine expanded his influence throughout Europe. During this period, he established key partnerships, launched international conferences, and began developing the systematic approaches to leadership and spiritual development that would become hallmarks of the Sons of God movement.</p>
                  </div>
                </div>

                {/* 2020-Present */}
                <div className="flex">
                  <div className="w-4 h-4 bg-white rounded-full relative z-10 mt-2 flex-shrink-0" style={{ marginLeft: '-6px', marginRight: '24px' }}></div>
                  <div className="flex-1">
                    <img src="/assets/2020-present.png" alt="2020-Present" className="w-full h-48 object-cover mb-4 border-4 border-white" />
                    <h3 className="text-xl font-bold mb-3">2020 - Present</h3>
                    <h4 className="text-lg mb-3">SOG Visionary Leader at Powerhouse International</h4>
                    <p className="text-sm text-gray-300">Today, Justine serves as the visionary leader of Sons of God and Powerhouse International, a global movement that spans continents and cultures. Through conferences, media, literature, and mentorship, he continues to equip and inspire a generation of leaders to embrace their divine purpose and transform their communities with Kingdom values.</p>
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
                  <h3 className="text-xl font-bold mb-3">Events & Conferences</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Every conference, summit, and gathering brings one goal — to awaken purpose and ignite transformation. From leadership summits to worship nights, our events unite believers across cultures and generations. Experience powerful moments that strengthen faith and shape the future.
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
                  From the football fields of Africa to the boardrooms of Europe — Justine Birichi's story is one of faith, leadership, and transformation. 
                  As the visionary behind Sons of God and CEO of Portmetals International GmbH, he continues to bridge business, culture, and purpose to 
                  inspire leaders worldwide.
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
                    <h3 className="text-xl font-bold mb-4">Portmetals International GmbH</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-1">
                      As CEO and Managing Director, Justine spearheads a platform that unites global trade, leadership, innovation, and media ventures. His work in business and ministry integrates Kingdom values into the marketplace — creating lasting transformation in business and society.
                    </p>
                    <button className="text-black underline font-medium">
                      Discover PM International
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

              {/* Join the Journey Button */}
              <div className="text-center">
                <button className="bg-white text-black border border-gray-300 px-8 py-3 font-medium hover:bg-gray-50 transition-colors cursor-pointer">
                  Join the Journey
                </button>
              </div>
            </div>
          </div>

        {/* From Fantasy to Faith Section */}
        <div className="bg-gray-50 py-16 px-8">
          <div className="max-w-6xl mx-auto">
            <p className="text-gray-500 text-md mb-8">From Fantasy to Faith - Live Experience</p>
            
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
                <h2 className="text-3xl font-bold mb-6">Could Your Church or Ministry Be a Fit for Sons of God?</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Or reach out directly to <span className="font-bold cursor-pointer">marketing@the-sog-shop.com</span> — we'd love to hear how 
                  your church, ministry, or event could align with the Sons of God movement.
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
                <h2 className="text-xl font-bold mb-4">Could Your Church or Ministry Be a Fit for Sons of God?</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                  Or reach out directly to <span className="font-bold cursor-pointer">marketing@the-sog-shop.com</span> — we'd love to hear how 
                  your church, ministry, or event could align with the Sons of God movement.
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
};

export default About;
