import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import Header from './components/NavBar'; // Import Header
import PromoBar from './components/PromoBar'; // Import PromoBar
import Footer from './components/Footer';
import Shop from './pages/Shop';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <PromoBar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
