import '@fortawesome/fontawesome-free/css/all.css';
import HeroSection from '../components/home/HeroSection';
import ProductSections from '../components/home/ProductSections';
import AboutSection from '../components/home/AboutSection';
import StayInTouchSection from '../components/home/SatyInTouchSection';
import ProductSection2 from '../components/home/ProductSection-2';
import BooksProductSections from '../components/home/BooksProductSections';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProductSections />
      <img src="/assets/wear-what-you-believe.png" alt="Wear what you believe" className="w-full mt-30 md:h-auto h-[45vw] object-cover" />
      <AboutSection />
      <div className="hidden md:block">
        <StayInTouchSection />
      </div>
      <ProductSection2 
      title="Essentials"
        subtitle="for everyday"
        showAllHref="/essentials"
        assets={[
          '/assets/steel-cup.jpg',
          '/assets/bag.jpg',
          '/assets/pillow.jpg'
        ]}
        products={[
          {
            image: 'https://picsum.photos/300/400?random=2',
            name: 'Product 1',
            price: '$19.99',
          },
          {
            image: 'https://picsum.photos/300/400?random=3',
            name: 'Product 2',
            price: '$29.99',
          },
          {
            image: 'https://picsum.photos/300/400?random=4',
            name: 'Product 3',
            price: '$39.99',
          },
          {
            image: 'https://picsum.photos/300/400?random=4',
            name: 'Product 3',
            price: '$39.99',
          }
        ]} />
        <BooksProductSections products={[
          {
            image: 'https://picsum.photos/300/400?random=5',
            name: 'Book 1',
            price: '$19.99',
          },
          {
            image: 'https://picsum.photos/300/400?random=6',
            name: 'Book 2',
            price: '$29.99',
          },
          {
            image: 'https://picsum.photos/300/400?random=7',
            name: 'Book 3',
            price: '$39.99',
          },
          {
            image: 'https://picsum.photos/300/400?random=8',
            name: 'Book 4',
            price: '$49.99',
          },
        ]} />
        {/* <EventsProductSection events={[
          {
            image: 'https://picsum.photos/300/400?random=9',
            name: 'Event 1',
            date: '2023-10-10',
          },
          {
            image: 'https://picsum.photos/300/400?random=10',
            name: 'Event 2',
            date: '2023-10-15',
          },
        ]} /> */}
    </div>
  );
}
