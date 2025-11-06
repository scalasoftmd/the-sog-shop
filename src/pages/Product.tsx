import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

const apiUrl = import.meta.env.VITE_API_URL;

interface ColorOption {
  value: string;
  image: string;
}

export default function Product() {
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [product, setProduct] = useState<any>(null);
  const [variations, setVariations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [delivery, setDelivery] = useState<string>('');

  useEffect(() => {
    if (!productId) return;
    setLoading(true);

    Promise.all([
      fetch(`${apiUrl}/items/${productId}`).then(res => res.json()),
      fetch(`${apiUrl}/items/${productId}/variations`).then(res => res.json()),
      fetch(`${apiUrl}/attributes`).then(res => res.json())
    ])
      .then(([itemDetails, variationData, attrsData]) => {
        const textInfo = Array.isArray(itemDetails.texts) && itemDetails.texts[0] ? itemDetails.texts[0] : {};
        const name = textInfo.name1 || '';
        const description = textInfo.description || '';
        setDelivery("Delivery within 2-3 working days");

        const variations = Array.isArray(variationData.entries) ? variationData.entries : [];
        setVariations(variations); // Store variations separately

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

        const allVariationAttributeValues: any[] = variations.flatMap((v: any) =>
          Array.isArray(v.variationAttributeValues) ? v.variationAttributeValues : []
        );
        const mainVariation = variations[0] || null;
        setProduct({
          ...(mainVariation || {}),           // Spreads all properties from the first product variation
          name,                               // Product name from item details
          description,                        // Product description from item details  
          price: mainVariation?.variationSalesPrices?.[0]?.price || '',     // Primary price
          oldPrice: mainVariation?.variationSalesPrices?.[1]?.price || '',  // Sale/crossed-out price
          variationAttributeValues: allVariationAttributeValues             // All size/color options
        });

        let sizeArr: string[] = [];
        let colorArr: any[] = [];
        if (Array.isArray(attrsData.entries)) {
          // Check for both regular size and kids size attributes
          const sizeAttr = attrsData.entries.find((a: any) => 
            a.backendName.toLowerCase() === "size" || a.backendName.toLowerCase() === "size (kids)"
          );
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
        setSelectedSize(typeof sizeArr[0] === "string" ? sizeArr[0] : '');
        // Prefer the color from the main variation (if present), otherwise fall back to the first attribute value
        const mainColorFromVariation = mainVariation
          ? (mainVariation.variationAttributeValues || []).find((v: any) => v.attribute?.backendName?.toLowerCase() === 'color')?.attributeValue?.backendName
          : null;
        setSelectedColor(
          typeof mainColorFromVariation === 'string' && mainColorFromVariation.length > 0
            ? mainColorFromVariation
            : (typeof colorArr[0]?.value === "string" ? colorArr[0].value : '')
        );
        setLoading(false);
      })
      .catch(() => {
        setImages([]);
        setSelectedImage('');
        setProduct(null);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <Loader />;
  }

  // 1. First, safeColors extracts color attributes from the product's variation data
  const safeColors =
    product?.variationAttributeValues
      ?.filter((vav: any) => vav.attribute?.backendName?.toLowerCase() === "color")
      .map((vav: any) => ({ value: vav.attributeValue?.backendName, image: "" })) || [];

  // Sort colors in spectrum order: whites → colors → blacks
  const sortedColors = safeColors
    .filter(
      (color: ColorOption, idx: number, arr: ColorOption[]) =>
        arr.findIndex((c: ColorOption) => c.value.toLowerCase() === color.value.toLowerCase()) === idx
    )
    .sort((a: ColorOption, b: ColorOption) => {
      const colorOrder: { [key: string]: number } = {
        "white": 1,
        "white sand": 2,
        "stone washed white": 3,
        "bone": 4,
        "light beige": 5,
        "natural stone": 6,
        "grey melange": 7,
        "heather grey": 8,
        "grey": 9,
        "light asphalt": 10,
        "red": 11,
        "light pink": 12,
        "soft pink": 13,
        "pink": 14,
        "blush pink": 15,
        "yellow": 16,
        "green": 17,
        "blue": 18,
        "navy": 19,
        "purple": 20,
        "brown": 21,
        "black": 22
      };
      
      const aOrder = colorOrder[a.value.toLowerCase()] || 999;
      const bOrder = colorOrder[b.value.toLowerCase()] || 999;
      return aOrder - bOrder;
    });

  // Extract available sizes from the product's variation data
  const safeSizes = 
    product?.variationAttributeValues
      ?.filter((vav: any) => {
        const attrName = vav.attribute?.backendName?.toLowerCase();
        return attrName === "size" || attrName === "size (kids)";
      })
      .map((vav: any) => vav.attributeValue?.backendName)
      .filter((size: string, idx: number, arr: string[]) => 
        arr.findIndex((s: string) => s?.toLowerCase() === size?.toLowerCase()) === idx
      ) || [];

  const handleAddToBag = () => {
    if (!product || !variations.length) return;
    // Find the variation that matches the selected size and color
    const selectedVariation = variations.find((variation: any) => {
      const variationAttributes = variation.variationAttributeValues || [];
      
      const hasSelectedSize = !selectedSize || variationAttributes.some((attr: any) => {
        const attrName = attr.attribute?.backendName?.toLowerCase();
        return (attrName === "size" || attrName === "size (kids)") && 
               attr.attributeValue?.backendName === selectedSize;
      });
      
      const hasSelectedColor = !selectedColor || variationAttributes.some((attr: any) => 
        attr.attribute?.backendName?.toLowerCase() === "color" && 
        attr.attributeValue?.backendName === selectedColor
      );
      
      return hasSelectedSize && hasSelectedColor;
    });

    // Use the found variation or fall back to the main product
    const variationToUse = selectedVariation || product;
    const variationId = variationToUse.id || product.id;
    
    const bagItem = {
      id: variationId,
      variationId: variationId,
      itemId: product.item?.id || product.itemId,
      name: product.name,
      price: variationToUse.variationSalesPrices?.[0]?.price || product.price,
      image: selectedImage,
      size: selectedSize,
      color: selectedColor,
      quantity: 1
    };
    
    const bag = JSON.parse(localStorage.getItem("bag") || "[]");
    bag.push(bagItem);
    localStorage.setItem("bag", JSON.stringify(bag));
    window.dispatchEvent(new CustomEvent("bagUpdated"));
  };

  return (
    <div>
      {/* Hero Banner */}
      <div className="hidden md:block relative w-full h-120 bg-gray-200 overflow-hidden mt-5">
        {/* Background image */}
        <img 
          src="/assets/hero-woman.webp" 
          alt="Woman in black shirt" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Text content overlay */}
        <div className="absolute inset-0 flex items-center justify-center md:justify-start md:pl-80">
          <div className="text-black">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light mb-2">
              Wear what <span className="font-bold">you believe</span>
            </h1>
            <p className="text-xs md:text-sm tracking-[0.3em] text-center md:text-right">ROMANS 8:19</p>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="flex flex-col md:flex-row gap-10 px-5 py-10 max-w-6xl mx-auto">
        {/* Left: Images */}
        <div className="md:w-1/2 flex flex-col items-center">
          <img
            src={selectedImage || "/assets/placeholder.png"}
            alt="Product"
            className="w-full h-[700px] object-cover rounded mb-6"
          />
          {/* Thumbnails in a row */}
          <div className="flex flex-row gap-4 w-full overflow-x-auto pb-2">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumbnail ${i}`}
                className={`w-30 h-50 flex-shrink-0 object-cover rounded cursor-pointer border ${selectedImage === img ? "border-black" : "border-transparent"}`}
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
            <span className="text-4xl font-bold text-black">{product?.price} €</span>
            {product?.oldPrice && (
              <span className="text-lg line-through text-gray-400">€ {product.oldPrice}</span>
            )}
          </div>
          <div className="text-green-600 text-sm mb-2">{delivery}</div>
          {/* Size selector */}
          {safeSizes.length > 0 && (
            <div className="mb-2">
              <label className="font-semibold mr-2">Size:</label>
              <select
                value={selectedSize || safeSizes[0] || ''}
                onChange={e => setSelectedSize(e.target.value)}
                className="border px-2 py-1 rounded cursor-pointer"
              >
                {safeSizes.map((size: string, i: number) => (
                  <option key={i} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* Color selector */}
           {sortedColors.length > 0 && (
            <div className="mb-2">
              <label className="font-semibold mr-2">Color:</label>
              <div className="flex gap-2">
                {sortedColors.map((color: ColorOption) => {
                    const colorName = color.value.toLowerCase();
                    let colorStyle = { backgroundColor: "#ffffff" }; // default white

                    // 3. The switch statement matches the product's color attribute names to CSS color codes
                    switch (colorName) {
                      case "white":
                        colorStyle = { backgroundColor: "#ffffff" };
                        break;
                      case "white sand":
                        colorStyle = { backgroundColor: "#fffbeb" };
                        break;
                      case "stone washed white":
                        colorStyle = { backgroundColor: "#f9fafb" };
                        break;
                      case "bone":
                        colorStyle = { backgroundColor: "#f7f3e9" };
                        break;
                      case "light beige":
                        colorStyle = { backgroundColor: "#f5f5dc" };
                        break;
                      case "natural stone":
                        colorStyle = { backgroundColor: "#f3f4f6" };
                        break;
                      case "grey melange":
                        colorStyle = { backgroundColor: "#e5e7eb" };
                        break;
                      case "heather grey":
                        colorStyle = { backgroundColor: "#d1d5db" };
                        break;
                      case "grey":
                        colorStyle = { backgroundColor: "#9ca3af" };
                        break;
                      case "light asphalt":
                        colorStyle = { backgroundColor: "#c9d6d9" };
                        break;
                      case "black":
                        colorStyle = { backgroundColor: "#000000" };
                        break;
                      case "red":
                        colorStyle = { backgroundColor: "#ef4444" };
                        break;
                      case "light pink":
                        colorStyle = { backgroundColor: "#fce7f3" };
                        break;
                      case "soft pink":
                        colorStyle = { backgroundColor: "#f9a8d4" };
                        break;
                      case "pink":
                        colorStyle = { backgroundColor: "#f472b6" };
                        break;
                      case "blush pink":
                        colorStyle = { backgroundColor: "#f472b6" };
                        break;
                      case "yellow":
                        colorStyle = { backgroundColor: "#facc15" };
                        break;
                      case "green":
                        colorStyle = { backgroundColor: "#22c55e" };
                        break;
                      case "blue":
                        colorStyle = { backgroundColor: "#3b82f6" };
                        break;
                      case "navy":
                        colorStyle = { backgroundColor: "#1e3a8a" };
                        break;
                      case "purple":
                        colorStyle = { backgroundColor: "#8b5cf6" };
                        break;
                      case "brown":
                        colorStyle = { backgroundColor: "#92400e" };
                        break;
                      default:
                        colorStyle = { backgroundColor: "#ffffff" };
                    }

                    // 4. The color button is rendered with the matched background style
                    return (
                      <button
                        key={color.value}
                        className={`w-10 h-10 cursor-pointer rounded border ${
                          selectedColor === color.value ? "border-black" : "border-gray-200"
                        } flex items-center justify-center`}
                        style={colorStyle}
                        onClick={() => setSelectedColor(color.value)}
                      >
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

      {/* Newsletter Section */}
      <div className="bg-gray-100 p-10 md:px-50 text-center">
        <h2 className="text-2xl font-bold mb-4">Newsletter</h2>
        <p className="text-gray-700 text-sm mb-6">
          Enjoy €10 off your next order and benefit from our news and offers.
        </p>
        <div className="flex justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Your email address"
            className="hover:none focus:outline-none bg-white px-4 py-2 w-full max-w-md"
          />
          <button className="min-w-[120px] bg-black text-white px-6 py-2 border-none">Sign Up</button>
        </div>
        <p className="text-gray-500 text-xs mt-4">
          By signing up, you agree that your data will be used for our newsletter distribution. 
          The newsletter can be unsubscribed at any time. Further information and cancellation 
          instructions can be found in our <a href="/privacy-policy" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}