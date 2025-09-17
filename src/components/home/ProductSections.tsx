import ProductSection from "./ProductSection";

export default function ProductSections() {
  return (
    <div>
      <ProductSection
        title="New Arrivals"
        subtitle="elevate your style"
        showAllHref="/new-arrivals"
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
          },
        ]}
      />

      <ProductSection
        title="Collections"
        subtitle="Faith is wearable"
        showAllHref="/collections"
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
          },
        ]}
      />

      <ProductSection
        title="Kids"
        subtitle="the next Generation"
        showAllHref="/next-generation"
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
          },
        ]}
      />
    </div>
  );
}