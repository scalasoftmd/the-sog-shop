import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import Header from './components/NavBar'; // Import Header
import PromoBar from './components/PromoBar'; // Import PromoBar
import Footer from './components/Footer';
import Fashion from './pages/Fashion';
import Bag from './pages/Bag';
import OrderSuccess from './pages/OrderSucces';
import Account from './pages/Account';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <PromoBar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fashion/:id" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/fashion" element={<Fashion />} />
        <Route path="/bag" element={<Bag />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
