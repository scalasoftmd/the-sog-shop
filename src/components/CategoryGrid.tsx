import { useNavigate } from 'react-router-dom';

export default function CategoryGrid() {
  const navigate = useNavigate();
  const categories = [
    { name: "Men", image: "/assets/men.jpg", path: "/fashion/men" },
    { name: "Women", image: "/assets/women.jpg", path: "/fashion/women" },
    { name: "Kids", image: "/assets/kids.jpg", path: "/fashion/kids" },
  ];

  return (
    <div className="md:h-[90vh]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10 md:p-30">
            {categories.map((category) => (
                <div
                key={category.name}
                className="relative group h-full overflow-hidden cursor-pointer"
                style={{ borderRadius: "0" }}
                onClick={() => navigate(category.path)}
                >
                <img
                    src={category.image}
                    alt={category.name}
                    className="w-full object-cover group-hover:scale-110 transition-transform duration-300 brightness-40 h-[60vh]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-5xl font-bold uppercase">{category.name}</span>
                </div>
                </div>
            ))}
        </div>
    </div>
  );
}

