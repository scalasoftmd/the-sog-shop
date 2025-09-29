import React, { useState, useEffect, useRef } from "react";

interface AttributeValue {
  id: number;
  attributeId: number;
  backendName: string;
  valueNames: { lang: string; valueId: string; name: string }[];
}

interface AttributeEntry {
  id: number;
  backendName: string;
  values: AttributeValue[];
}

interface ApiResponse {
  entries: AttributeEntry[];
}

interface DynamicFashionFilterProps {
  apiUrl: string;
  onFilterChange: (selected: Record<number, number[]>) => void;
}

const Section: React.FC<{
  title: string;
  options: { id: number; name: string }[];
  selected: number[];
  onChange: (ids: number[]) => void;
}> = ({ title, options, selected, onChange }) => {
  const [open, setOpen] = useState(true);

  const handleToggle = () => setOpen((v) => !v);

  const handleCheck = (id: number) => {
    if (selected.includes(id)) {
      onChange(selected.filter((sid) => sid !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="mb-6">
      <div
        className="flex items-center justify-between cursor-pointer font-bold text-lg"
        onClick={handleToggle}
      >
        <span>{title}</span>
        <span>{open ? "▾" : "▸"}</span>
      </div>
      {open && (
        <div className="max-h-64 overflow-y-auto mt-2">
          {options.map((opt) => (
            <label key={opt.id} className="flex items-center mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(opt.id)}
                onChange={() => handleCheck(opt.id)}
                className="mr-2"
              />
              <span>{opt.name}</span>
            </label>
          ))}
        </div>
      )}
      <hr className="mt-3" />
    </div>
  );
};

const FashionFilter: React.FC<DynamicFashionFilterProps> = ({
  apiUrl,
  onFilterChange,
}) => {
  const [attributes, setAttributes] = useState<AttributeEntry[]>([]);
  const [selectedValues, setSelectedValues] = useState<Record<number, number[]>>({});
  const fetchedOnce = useRef(false);

  useEffect(() => {
    if (!fetchedOnce.current) {
      fetch(`${apiUrl}/attributes`)
        .then((res) => res.json())
        .then((data: ApiResponse) => {
          setAttributes(data.entries);
          fetchedOnce.current = true;
        });
    }
  }, [apiUrl]);

  useEffect(() => {
    onFilterChange(selectedValues);
  }, [selectedValues, onFilterChange]);

  const handleSectionChange = (attributeId: number, ids: number[]) => {
    setSelectedValues((prev) => ({
      ...prev,
      [attributeId]: ids,
    }));
  };

  return (
    <aside className="w-full md:w-4/4 bg-white p-5">
      {[...attributes]
        .sort((a, b) => {
          if (a.backendName.toLowerCase() === "gender") return -1;
          if (b.backendName.toLowerCase() === "gender") return 1;
          return 0;
        })
        .map((attr) => (
          <Section
            key={attr.id}
            title={attr.backendName}
            options={attr.values.map((v) => ({
              id: v.id,
              name: v.backendName,
            }))}
            selected={selectedValues[attr.id] || []}
            onChange={(ids) => handleSectionChange(attr.id, ids)}
          />
        ))}
    </aside>
  );
};

export default FashionFilter;
