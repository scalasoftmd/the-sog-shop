import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useAnalytics } from './hooks/useAnalytics';
import { useCookieConsent } from './hooks/useCookieConsent';
import CookieConsent from './components/CookieConsent';
import { initConsent } from './utils/gtag';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Footer from './components/Footer';
import Bag from './pages/Bag';
import OrderSuccess from './pages/OrderSucces';
import Account from './pages/Account';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ComingSoon from './components/ComingSoon';
import CategoryGrid from './components/CategoryGrid';
import Breadcrumb from './components/Breadcrumb';
import Men from './pages/Fashion/Men';
import Women from './pages/Fashion/Women';
import Kids from './pages/Fashion/Kids';
import NavBar from './components/NavBar';
import Product from './pages/Product';
import About from './pages/About';
import MeetVisionary from './pages/MeetVisionary';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiesInfo from './pages/CookiesInfo';
import Contact from './pages/Contact';
import Impressum from './pages/Impressum';

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <NavBar />} {/* Hide NavBar on the home page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="*"
          element={
            <>
              <Breadcrumb />
              <Routes>
                <Route path="/fashion" element={<CategoryGrid />} />
                <Route path="/fashion/men" element={<Men />} />
                <Route path="/fashion/women" element={<Women />} />
                <Route path="/fashion/kids" element={<Kids />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about" element={<About />} />
                <Route path="/visionary" element={<MeetVisionary />} />
                <Route path="/contacts" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cookies-info" element={<CookiesInfo />} />
                <Route path="/impressum" element={<Impressum />} />
                <Route path="/bag" element={<Bag />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/account" element={<Account />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/fashion/:gender/:productId" element={<Product />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="*" element={<ComingSoon />} />
              </Routes>
            </>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  useAnalytics();
  return <>{children}</>;
}

function App() {
  const { giveConsent, revokeConsent } = useCookieConsent();

  useEffect(() => {
    // Initialize consent mode on app load
    initConsent();
  }, []);

  return (
    <Router>
      <AnalyticsWrapper>
        <div className="App">
          <AppContent />
          <CookieConsent
            onAccept={giveConsent}
            onReject={revokeConsent}
          />
        </div>
      </AnalyticsWrapper>
    </Router>
  );
}

export default App;
