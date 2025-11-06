import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Newsletter from '../components/Newsletter';

const Contact: React.FC = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Contact Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We'd love to hear from you. Whether you have questions about our products, 
              need support, or want to partner with us, our team is here to help.
            </p>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <MapPin className="text-gray-400 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">
                    PM International GmbH & Co. KG<br />
                    Ferdinand-Porsche-Straße 14<br />
                    32339 Espelkamp, Germany
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <Phone className="text-gray-400 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">
                    Tel: +49 (0) 151 70631834
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <Mail className="text-gray-400 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">contact@the-sog.com</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start space-x-4">
                <Clock className="text-gray-400 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-900">Business Hours</h3>
                  <div className="text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Management */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Management</h3>
              <p className="text-gray-600">Managing Director: Eugen Wiebe</p>
            </div>
          </div>

          {/* Map */}
          <div>
            {/* SOG Logo */}
            <div className="flex justify-center mb-6">
              <img 
                src="/assets/logo-black.png" 
                alt="Sons of God Logo" 
                className="h-10 object-contain"
              />
            </div>
            {/* Heart Church Image */}
            <img 
              src="/assets/heart-church.png" 
              alt="Church Ministry Collage" 
              className="w-full h-120 object-contain"
            />
          </div>
        </div>
      </div>

      <Newsletter />
    </div>
  );
};

export default Contact;
