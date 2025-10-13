import React from 'react';

const Newsletter: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [isSubscribing, setIsSubscribing] = React.useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = React.useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setIsSubscribing(true);
    setSubscriptionMessage('');

    try {
      const response = await fetch(`${apiUrl}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newsletterEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscriptionMessage('Thank you for subscribing!');
        setNewsletterEmail('');
      } else {
        setSubscriptionMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubscriptionMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="bg-gray-100 p-10 md:px-50 text-center">
      <h2 className="text-2xl font-bold mb-4">Newsletter</h2>
      <p className="text-gray-700 text-sm mb-6">
        Enjoy €10 off your next order and benefit from our news and offers.
      </p>
      <form onSubmit={handleNewsletterSubmit} className="flex justify-center items-center gap-4">
        <input
          type="email"
          placeholder="Your email address"
          value={newsletterEmail}
          onChange={(e) => setNewsletterEmail(e.target.value)}
          className="hover:none focus:outline-none bg-white px-4 py-2 w-full max-w-md"
          required
          disabled={isSubscribing}
        />
        <button 
          type="submit"
          className="min-w-[120px] cursor-pointer bg-black text-white px-6 py-2 border-none disabled:bg-gray-400"
          disabled={isSubscribing}
        >
          {isSubscribing ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      {subscriptionMessage && (
        <p className={`text-sm mt-4 ${subscriptionMessage.includes('Thank you') ? 'text-green-600' : 'text-red-600'}`}>
          {subscriptionMessage}
        </p>
      )}
      <p className="text-gray-500 text-xs mt-4">
        By signing up, you agree that your data will be used for our newsletter distribution. 
        The newsletter can be unsubscribed at any time. Further information and cancellation 
        instructions can be found in our <a href="/privacy-policy" className="underline">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default Newsletter;
