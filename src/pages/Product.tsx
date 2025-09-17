import { useParams } from 'react-router-dom';

export default function Product() {
  const { id } = useParams(); // Get product id from URL
  return (
    <div>
      <h1>Product Details for ID: {id}</h1>
    </div>
  );
}
