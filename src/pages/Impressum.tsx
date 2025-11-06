import React from 'react';
import SEO from '../components/SEO';

const Impressum: React.FC = () => {
  return (
    <>
      <SEO 
        title="Impressum"
        description="Impressum and legal information for The SOG Shop"
        url="https://the-sog.de/impressum"
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Impressum</h1>
        
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4">Customer Service</h2>
          <div className="mb-6">
            <p>How can we help you?</p>
            <p>Send us an e-mail: support@the-sog.com</p>
            <p>Or call us at +49 15170631834</p>
          </div>

          <h2 className="text-xl font-semibold mb-4">Return address:</h2>
          <div className="mb-6">
            <p>The return address and return label are included in your parcel.</p>
            <p>(Please do not send returns to the company address below.)</p>
          </div>

          <h2 className="text-xl font-semibold mb-4">Imprint</h2>
          <div className="mb-6">
            <p><strong>Responsible for the content of this website:</strong></p>
            <p>(Please do not send returns to this address.)</p>
            <br />
            <p><strong>PM International GmbH & Co. KG</strong></p>
            <p>Trading name: SONS OF GOD</p>
            <p>Ferdinand‑Porsche‑Straße 14</p>
            <p>32339 Espelkamp</p>
            <p>Germany</p>
          </div>

          <div className="mb-6">
            <p>Commercial Register: Local Court Bad Oeynhausen</p>
            <p>Registration Number: HRA 7121</p>
            <p>VAT ID No.: DE369546788</p>
            <p>Tax No.: Registered with Finanzamt Lübbecke</p>
          </div>

          <h2 className="text-xl font-semibold mb-4">Legally represented by:</h2>
          <div className="mb-6">
            <p>PM International Verwaltungs GmbH</p>
            <p>Commercial Register: Local Court Bad Oeynhausen</p>
            <p>Registration No.: HRB (to be completed if available)</p>
            <p>Managing Director: Eugen Wiebe</p>
            <p>E‑mail: contact@the-sog.com</p>
            <p>Website: https://the-sog.com</p>
          </div>

          <h2 className="text-xl font-semibold mb-4">Notice according to the Digital Services Act (DSA)</h2>
          <div className="mb-6">
            <p>SONS OF GOD does not operate an online marketplace and does not provide a platform for third parties to publish content.</p>
            <p>Therefore, SONS OF GOD is not subject to the obligations under Article 20 DSA (internal complaint handling system).</p>
            <p>Any concerns or complaints related to our products or legal issues can be addressed at contact@the-sog.com</p>
          </div>

          <h2 className="text-xl font-semibold mb-4">Online Dispute Resolution (OS Platform)</h2>
          <div className="mb-6">
            <p>The European Commission provides a platform for Online Dispute Resolution (OS):</p>
            <p>
              <a href="https://ec.europa.eu/consumers/odr" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p>Our e‑mail address is listed above in the Imprint.</p>
          </div>

          <h2 className="text-xl font-semibold mb-4">Consumer Dispute Resolution</h2>
          <div className="mb-6">
            <p>We are neither obliged nor willing to participate in dispute resolution procedures before consumer arbitration boards.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Impressum;
