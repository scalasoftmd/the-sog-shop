import React from 'react';

const CookiesInfo: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Cookies Information</h1>
      
      <div className="prose prose-lg">
        <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
          <p className="mb-4">
            Cookies are small text files that are stored on your device when you visit our website. 
            They help us provide you with a better browsing experience by remembering your preferences 
            and analyzing how you use our site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Essential Cookies</h3>
            <p className="mb-2">These cookies are necessary for the website to function properly.</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Session management</li>
              <li>Security features</li>
              <li>Shopping cart functionality</li>
              <li>User authentication</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Analytics Cookies</h3>
            <p className="mb-2">These cookies help us understand how visitors interact with our website.</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Google Analytics:</strong> Tracks website usage and performance</li>
              <li>Page views and user journeys</li>
              <li>Device and browser information</li>
              <li>General location data (country/region)</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Functional Cookies</h3>
            <p className="mb-2">These cookies enhance your browsing experience.</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Language preferences</li>
              <li>Currency selection</li>
              <li>Recent searches</li>
              <li>Accessibility settings</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
          <p className="mb-4">We use the following third-party services that may set cookies:</p>
          
          <div className="bg-gray-50 p-4 rounded mb-4">
            <h4 className="font-semibold mb-2">Google Analytics</h4>
            <p className="text-sm mb-2">Provider: Google LLC</p>
            <p className="text-sm mb-2">Purpose: Website analytics and performance tracking</p>
            <p className="text-sm mb-2">Data collected: Usage statistics, page views, user behavior</p>
            <p className="text-sm">
              Privacy Policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Privacy Policy</a>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Managing Your Cookie Preferences</h2>
          <p className="mb-4">You have several options to control cookies:</p>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Browser Settings</h3>
            <p className="mb-2">You can control cookies through your browser settings:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Block all cookies</li>
              <li>Block third-party cookies only</li>
              <li>Delete existing cookies</li>
              <li>Receive notifications when cookies are set</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Our Cookie Banner</h3>
            <p className="mb-4">
              When you first visit our website, you'll see a cookie consent banner. You can:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Accept All Cookies:</strong> Allow all cookies for full functionality</li>
              <li><strong>Reject Non-Essential:</strong> Only essential cookies will be used</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cookie Retention</h2>
          <p className="mb-4">Different cookies have different retention periods:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
            <li><strong>Persistent cookies:</strong> Remain for a specified period (up to 2 years)</li>
            <li><strong>Analytics cookies:</strong> Typically retained for 26 months</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Impact of Disabling Cookies</h2>
          <p className="mb-4">If you disable cookies, some website features may not work properly:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Shopping cart may not function</li>
            <li>Login sessions may not persist</li>
            <li>Preferences may not be saved</li>
            <li>Website analytics will be limited</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
          <p className="mb-4">
            We may update this cookies policy from time to time to reflect changes in our practices 
            or for other operational, legal, or regulatory reasons.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <div className="bg-gray-50 p-4 rounded">
            <p className="mb-2"><strong>PM International GmbH & Co. KG</strong></p>
            <p className="mb-2">Address: Ferdinand-Porsche-Straße 14, 32339 Espelkamp, Germany</p>
            <p className="mb-2">Phone: +49 (0) 5743 21122</p>
            <p className="mb-2">Fax: +49 (0) 5743 211122</p>
            <p className="mb-2">Email: info@pm-int.com</p>
            <p className="mb-2">Website: www.pm-int.com</p>
            <p className="mb-2">Managing Director: Eugen Wiebe</p>
            <p>If you have any questions about our use of cookies, please contact us.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CookiesInfo;
