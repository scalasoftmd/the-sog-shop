import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

const apiUrl = import.meta.env.VITE_API_URL;

// Use a plain object instead of enum for erasableSyntaxOnly compatibility
export const AttributeEnum = {
  Color: 1,
  Gender: 4,
  Size: 5,
} as const;

// Example usage:
// AttributeEnum.Color === 1
// AttributeEnum.Size === 5

export default function Product() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sizes, setSizes] = useState<string[]>([]);
  const [delivery, setDelivery] = useState<string>('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    // Fetch item and variations in parallel
    Promise.all([
      fetch(`${apiUrl}/items/${id}`).then(res => res.json()),
      fetch(`${apiUrl}/items/${id}/variations`).then(res => res.json()),
      fetch(`${apiUrl}/attributes`).then(res => res.json())
    ])
      .then(([itemDetails, variationData, attrsData]) => {
        const textInfo = Array.isArray(itemDetails.texts) && itemDetails.texts[0] ? itemDetails.texts[0] : {};
        const name = textInfo.title || '';
        const description = textInfo.description || '';
        setDelivery("Delivery within 2-3 working days");

        const variations = Array.isArray(variationData.entries) ? variationData.entries : [];
        // Collect all unique images from all variations
        const allImages = [
          ...new Set(
            variations.flatMap((v: any) => [
              ...(Array.isArray(v.images) ? v.images.map((img: any) => img.url) : []),
              ...(Array.isArray(v.itemImages) ? v.itemImages.map((img: any) => img.url) : [])
            ])
          )
        ];
        setImages(allImages as string[]);
        setSelectedImage(typeof allImages[0] === "string" ? allImages[0] : '');

        // Merge all variationAttributeValues from all variations
        const allVariationAttributeValues: any[] = variations.flatMap((v: any) =>
          Array.isArray(v.variationAttributeValues) ? v.variationAttributeValues : []
        );
        const mainVariation = variations[0] || null;
        setProduct({
          ...(mainVariation || {}),
          name,
          description,
          price: mainVariation?.variationSalesPrices?.[0]?.price || '',
          oldPrice: mainVariation?.variationSalesPrices?.[1]?.price || '',
          variationAttributeValues: allVariationAttributeValues
        });

        // Build sizes/colors from attribute values, not just selected ones
        let sizeArr: string[] = [];
        let colorArr: any[] = [];
        if (Array.isArray(attrsData.entries)) {
          // Sizes
          const sizeAttr = attrsData.entries.find((a: any) => a.backendName.toLowerCase() === "size");
          if (sizeAttr && Array.isArray(sizeAttr.values)) {
            sizeArr = sizeAttr.values.map((val: any) => {
              let valueName = val.backendName || "";
              if (val.valueNames) {
                const enNameObj = val.valueNames.find((vn: any) => vn.lang === "en");
                if (enNameObj) valueName = enNameObj.name;
              }
              return valueName;
            });
          }
          // Colors
          const colorAttr = attrsData.entries.find((a: any) => a.backendName.toLowerCase() === "color");
          if (colorAttr && Array.isArray(colorAttr.values)) {
            colorArr = colorAttr.values.map((val: any) => {
              let valueName = val.backendName || "";
              if (val.valueNames) {
                const enNameObj = val.valueNames.find((vn: any) => vn.lang === "en");
                if (enNameObj) valueName = enNameObj.name;
              }
              return { value: valueName, image: "" };
            });
          }
        }
        setSizes(Array.isArray(sizeArr) ? sizeArr : []);
        setSelectedSize(typeof sizeArr[0] === "string" ? sizeArr[0] : '');
        setSelectedColor(typeof colorArr[0]?.value === "string" ? colorArr[0].value : '');
        setLoading(false);
      })
      .catch(() => {
        setImages([]);
        setSelectedImage('');
        setProduct(null);
        setSizes([]);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  const safeColors =
    product?.variationAttributeValues
      ?.filter((vav: any) => vav.attribute?.backendName?.toLowerCase() === "color")
      .map((vav: any) => ({ value: vav.attributeValue?.backendName, image: "" })) || [];

  // Add to bag handler
  const handleAddToBag = () => {
    if (!product || !product.variationAttributeValues) return;
    // Find the selected variant by size and color
    const selectedVariant = product.variationAttributeValues.find(
      (vav: any) =>
        (selectedSize ? vav.attribute?.backendName?.toLowerCase() === "size" && vav.attributeValue?.backendName === selectedSize : true) &&
        (selectedColor ? vav.attribute?.backendName?.toLowerCase() === "color" && vav.attributeValue?.backendName === selectedColor : true)
    );
    const bagItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: selectedImage,
      size: selectedSize,
      color: selectedColor,
      variant: selectedVariant,
      quantity: 1
    };
    const bag = JSON.parse(localStorage.getItem("bag") || "[]");
    bag.push(bagItem);
    localStorage.setItem("bag", JSON.stringify(bag));
    window.dispatchEvent(new CustomEvent("bagUpdated"));
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 px-5 py-10 max-w-6xl mx-auto">
      {/* Left: Images */}
      <div className="md:w-1/2 flex flex-col items-center">
        <img
          src={selectedImage}
          alt="Product"
          className="w-full h-[700px] object-cover rounded mb-6"
        />
        {/* Thumbnails in a row */}
        <div className="flex flex-row gap-4 w-full">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Thumbnail ${i}`}
              className={`w-30 h-50 object-cover rounded cursor-pointer border ${selectedImage === img ? "border-black" : "border-transparent"}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>
      {/* Right: Details */}
      <div className="md:w-1/2 flex flex-col gap-4">
        <div className="mb-2">
          <img src="/assets/logo-black.png" alt="Sons Of God Logo" className="h-7" />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl">{product?.name}</span>
        </div>
        <div className="text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: product?.description }} />
        <div className="flex items-center gap-4 mb-2">
          <span className="text-3xl font-bold text-black">€ {product?.price}</span>
          {product?.oldPrice && (
            <span className="text-lg line-through text-gray-400">€ {product.oldPrice}</span>
          )}
        </div>
        <div className="text-green-600 text-sm mb-2">{delivery}</div>
        {/* Size selector */}
        {product?.variationAttributeValues && (
          <div className="mb-2">
            <label className="font-semibold mr-2">Size:</label>
            <select
              value={
                selectedSize ||
                (
                  product.variationAttributeValues.find(
                    (vav: any) => vav.attribute?.backendName?.toLowerCase() === "size"
                  )?.attributeValue?.backendName || ''
                )
              }
              onChange={e => setSelectedSize(e.target.value)}
              className="border px-2 py-1 rounded cursor-pointer"
            >
              {sizes.length > 0
                ? sizes.map((size, i) => (
                    <option key={i} value={size}>
                      {size}
                    </option>
                  ))
                : product.variationAttributeValues
                    .filter((vav: any) => vav.attribute?.backendName?.toLowerCase() === "size")
                    .map((vav: any, i: number) => (
                      <option key={i} value={vav.attributeValue?.backendName}>
                        {vav.attributeValue?.backendName}
                      </option>
                    ))
              }
            </select>
          </div>
        )}
        {/* Color selector */}
        {safeColors.length > 0 && (
          <div className="mb-2">
            <label className="font-semibold mr-2">Color:</label>
            <div className="flex gap-2">
              {safeColors
                .filter((color: { value: string }, idx: number, arr: { value: string }[]) =>
                  arr.findIndex((c: { value: string }) => c.value.toLowerCase() === color.value.toLowerCase()) === idx
                )
                .map((color: { value: string }) => {
                  let bgClass = "bg-white";
                  const colorName = color.value?.toLowerCase();
                  if (colorName === "black") bgClass = "bg-black";
                  else if (colorName === "white") bgClass = "bg-white";
                  else if (colorName === "red") bgClass = "bg-red-500";
                  else if (colorName === "blue") bgClass = "bg-blue-500";
                  else if (colorName === "green") bgClass = "bg-green-500";
                  else if (colorName === "yellow") bgClass = "bg-yellow-400";
                  else if (colorName === "brown") bgClass = "bg-yellow-900";
                  else if (colorName === "pink") bgClass = "bg-pink-400";
                  else if (colorName === "purple") bgClass = "bg-purple-500";
                  else if (colorName === "sand") bgClass = "bg-yellow-200";
                  else if (colorName === "charcoal") bgClass = "bg-gray-700";
                  else if (colorName === "berry red") bgClass = "bg-pink-700";
                  return (
                    <button
                      key={color.value}
                      className={`w-10 h-10 cursor-pointer rounded border ${selectedColor === color.value ? "border-black" : "border-gray-200"} flex items-center justify-center ${bgClass}`}
                      onClick={() => setSelectedColor(color.value)}
                      style={{ padding: 0 }}
                    >
                      {/* No color name inside the box */}
                    </button>
                  );
                })}
            </div>
          </div>
        )}
        {/* Add to cart button */}
        <button
          className="bg-black cursor-pointer text-white py-3 rounded font-bold text-lg mt-2 hover:bg-gray-800 transition uppercase"
          onClick={handleAddToBag}
        >
          ADD TO BAG
        </button>
      </div>
    </div>
  );
}