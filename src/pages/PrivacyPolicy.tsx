import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg">
        <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            Portmetals GmbH ("we," "our," or "us") collects information you provide directly to us, 
            such as when you create an account, make a purchase, subscribe to our newsletter, or contact us.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Personal information (name, email address, phone number)</li>
            <li>Billing and shipping addresses</li>
            <li>Payment information (processed securely through third-party providers)</li>
            <li>Communication preferences</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your account or transactions</li>
            <li>Send you promotional materials (with your consent)</li>
            <li>Improve our products and services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
          <p className="mb-4">
            We do not sell, trade, or otherwise transfer your personal information to third parties 
            without your consent, except as described in this privacy policy or as required by law.
          </p>
          <p className="mb-4">We may share your information with:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Service providers who assist in our operations</li>
            <li>Payment processors for transaction processing</li>
            <li>Shipping companies for order fulfillment</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction. However, no method of 
            transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights (GDPR)</h2>
          <p className="mb-4">If you are a resident of the European Union, you have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access your personal data</li>
            <li>Rectify inaccurate personal data</li>
            <li>Erase your personal data</li>
            <li>Restrict processing of your personal data</li>
            <li>Data portability</li>
            <li>Object to processing</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking</h2>
          <p className="mb-4">
            We use cookies and similar tracking technologies to enhance your browsing experience. 
            For detailed information about our cookie usage, please see our &nbsp;
            <a href="/cookies-info" className="text-blue-600 underline">Cookies Information page</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
          <p className="mb-4">
            We may update this privacy policy from time to time. We will notify you of any changes 
            by posting the new privacy policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <div className="bg-gray-50 p-4 rounded">
            <p className="mb-2"><strong>PM International GmbH & Co. KG</strong></p>
            <p className="mb-2">Address: Ferdinand-Porsche-Straße 14, 32339 Espelkamp, Germany</p>
            <p className="mb-2">Phone: +49 (0) 5743 21122</p>
            <p className="mb-2">Fax: +49 (0) 5743 211122</p>
            <p className="mb-2">Email: info@pm-int.com</p>
            <p className="mb-2">Website: www.pm-int.com</p>
            <p className="mb-2">Managing Director: Eugen Wiebe</p>
            <p>If you have any questions about this privacy policy or our data practices, please contact us.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
