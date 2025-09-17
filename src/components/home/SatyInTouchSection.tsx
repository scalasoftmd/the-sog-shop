import { useState } from 'react';

export default function StayInTouchSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName('');
    setEmail('');
  };

  return (
    <section
      className="relative py-10 md:py-20 bg-black bg-cover bg-center "
      style={{ backgroundImage: "url('/assets/in-touch.JPG')" }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        zIndex: 1
      }} />
      <div className="relative z-10 md:px-50 text-center mx-auto px-4 flex flex-col md:flex-row md:items-center md:gap-20">
        <div className="flex-1 px-20 mb-5 md:mb-0 md:w-[30vw]">
          <h2 className="text-white text-4xl md:text-6xl font-semibold mb-2 text-left">STAY TUNED</h2>
          <p className="text-gray-200 text-left text-sm md:text-base max-w-md">
            Stay connected. Stay inspired. Join the movement and never miss what's next.
          </p>
        </div>
        <div className="flex-[2] w-full">
          {submitted ? (
            <div className="text-green-400 font-semibold text-left">Thank you for subscribing!</div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 w-full items-center md:items-end">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="Full Name*"
                className="bg-transparent focus:bg-transparent border-0 border-b border-white text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 px-1 py-1 flex-1 min-w-[80px]"
              />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Email*"
                className="bg-transparent focus:bg-transparent border-0 border-b border-white text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 px-1 py-1 flex-1 min-w-[80px]"
              />
              <button
                type="submit"
                className="border border-white text-white px-20 py-3 rounded-full hover:bg-white hover:text-black transition-colors font-semibold min-w-[120px] text-base cursor-pointer"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
