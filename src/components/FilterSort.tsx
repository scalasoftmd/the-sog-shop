import React, { useState } from 'react';
import { FaSquare } from 'react-icons/fa'; // Import icons from react-icons
import { XMarkIcon } from '@heroicons/react/24/outline'; // Import XMarkIcon

interface FilterSortProps {
  onFilterChange: (filterType: string, value: string) => void;
  onSortChange: (value: string) => void;
  onViewChange: (viewType: 'grid' | 'list' | '1' | '2' | '3' | '4' | '5') => void;
  currentSort: string;
  currentView: 'grid' | 'list' | '1' | '2' | '3' | '4' | '5';
}

const FilterSort: React.FC<FilterSortProps> = ({
  onFilterChange,
  onSortChange,
  onViewChange,
  currentView,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false); // State for sort menu

  return (
    <div className="bg-gray-100 p-4">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              className="text-sm font-medium px-2 py-1 bg-gray-100"
              onClick={() => setIsSortMenuOpen((prev) => !prev)}
            >
              Sort by <span>{isSortMenuOpen ? '▲' : '▼'}</span>
            </button>
            {isSortMenuOpen && (
              <div
                className="absolute bg-white shadow-md mt-1"
                style={{ borderRadius: '0', border: 'none', width: '200px' }}
              >
                <button
                  className="block px-4 py-2 text-left w-full hover:bg-gray-200"
                  onClick={() => {
                    onSortChange('relevance');
                    setIsSortMenuOpen(false);
                  }}
                >
                  Relevance {/* Reverted */}
                </button>
                <button
                  className="block px-4 py-2 text-left w-full hover:bg-gray-200"
                  onClick={() => {
                    onSortChange('name-asc');
                    setIsSortMenuOpen(false);
                  }}
                >
                  Name, A to Z {/* Reverted */}
                </button>
                <button
                  className="block px-4 py-2 text-left w-full hover:bg-gray-200"
                  onClick={() => {
                    onSortChange('name-desc');
                    setIsSortMenuOpen(false);
                  }}
                >
                  Name, Z to A {/* Reverted */}
                </button>
                <button
                  className="block px-4 py-2 text-left w-full hover:bg-gray-200"
                  onClick={() => {
                    onSortChange('price-asc');
                    setIsSortMenuOpen(false);
                  }}
                >
                  Price, low to high {/* Reverted */}
                </button>
                <button
                  className="block px-4 py-2 text-left w-full hover:bg-gray-200"
                  onClick={() => {
                    onSortChange('price-desc');
                    setIsSortMenuOpen(false);
                  }}
                >
                  Price, high to low {/* Reverted */}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-2 bg-white" // Default to '1' for mobile
            onClick={() => onViewChange(currentView === '1' ? '2' : '1')} // Toggle between '1' and '2'
          >
            {currentView === '1' ? (
              <span className="grid grid-cols-2 gap-1">
                <FaSquare className="w-3 h-3" />
                <FaSquare className="w-3 h-3" />
                <FaSquare className="w-3 h-3" />
                <FaSquare className="w-3 h-3" />
              </span>
            ) : (
              <span className="grid grid-cols-1 gap-1">
                <FaSquare className="w-6 h-6" />
              </span>
            )}
          </button>
          <button
            className="text-sm font-medium text-black ml-1"
            onClick={() => setIsFilterOpen((prev) => !prev)}
          >
            {isFilterOpen ? 'Hide Filters' : 'Show Filters'} {/* Reverted */}
          </button>
        </div>
      </div>

      {/* Filter Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-black shadow-lg z-[1050] transform ${ // Increased zIndex to 1050
          isFilterOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300`}
        style={{ width: '300px' }}
      >
        <div className="p-6 flex items-center justify-between">
          <button
            className="text-white"
            onClick={() => setIsFilterOpen(false)}
          >
            <XMarkIcon className="h-8 w-8" />
          </button>
          <span className="text-white uppercase text-lg font-bold">
            Filters
          </span>
        </div>
        <div className="flex flex-col justify-center h-full px-6 py-4">
          <div className="flex flex-col justify-center h-[calc(100%-56px)] gap-4">
            <select
              className="px-4 py-2 bg-black text-white w-full uppercase hover:text-yellow-400"
              onChange={(e) => onFilterChange('color', e.target.value)}
            >
              <option value="">Color</option> {/* Reverted */}
              <option value="red">Red</option> {/* Reverted */}
              <option value="blue">Blue</option> {/* Reverted */}
              <option value="green">Green</option> {/* Reverted */}
              <option value="black">Black</option> {/* Reverted */}
              <option value="white">White</option> {/* Reverted */}
            </select>
            <select
              className="px-4 py-2 bg-black text-white w-full uppercase hover:text-yellow-400"
              onChange={(e) => onFilterChange('price', e.target.value)}
            >
              <option value="">Price</option> {/* Reverted */}
              <option value="0-50">$0 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-200">$100 - $200</option>
              <option value="200+">$200+</option>
            </select>
            <select
              className="px-4 py-2 bg-black text-white w-full uppercase hover:text-yellow-400"
              onChange={(e) => onFilterChange('size', e.target.value)}
            >
              <option value="">Size</option> {/* Reverted */}
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter and Sort Section */}
      <div
        className={`flex flex-col gap-4 ${
          isFilterOpen ? 'block' : 'hidden'
        } md:flex md:flex-row md:items-center md:justify-between`}
      >
        {/* Filters */}
        <div className="hidden md:flex flex-col md:flex-row md:items-center gap-4">
          <span className="text-sm font-medium">Filter by:</span> {/* Reverted */}
          <select
            className="px-2 py-1 bg-gray-100 w-full md:w-auto"
            onChange={(e) => onFilterChange('color', e.target.value)}
          >
            <option value="">Color</option> {/* Reverted */}
            <option value="red">Red</option> {/* Reverted */}
            <option value="blue">Blue</option> {/* Reverted */}
            <option value="green">Green</option> {/* Reverted */}
            <option value="black">Black</option> {/* Reverted */}
            <option value="white">White</option> {/* Reverted */}
          </select>
          <select
            className="px-2 py-1 bg-gray-100 w-full md:w-auto"
            onChange={(e) => onFilterChange('price', e.target.value)}
          >
            <option value="">Price</option> {/* Reverted */}
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200+">$200+</option>
          </select>
          <select
            className="px-2 py-1 bg-gray-100 w-full md:w-auto"
            onChange={(e) => onFilterChange('size', e.target.value)}
          >
            <option value="">Size</option> {/* Reverted */}
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
          </select>
        </div>

        {/* Sort and View */}
        <div className="hidden md:flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative">
            <button
              className="text-sm font-medium px-4 py-2 bg-gray-100 flex items-center gap-2"
              onClick={() => setIsSortMenuOpen((prev) => !prev)}
              style={{ fontSize: '1rem', border: 'none', width: '200px' }}
            >
              Sort by
              <span>{isSortMenuOpen ? '▲' : '▼'}</span> {/* Reverted */}
            </button>
            {isSortMenuOpen && (
              <div
                className="absolute bg-white shadow-md mt-1"
                style={{ borderRadius: '0', border: 'none', width: '200px' }}
              >
                <button
                  className="block px-4 py-2 text-left w-full hover:bg-gray-200"
                  onClick={() => {
                    onSortChange('relevance');
                    setIsSortMenuOpen(false);
                  }}
                >
                  Relevance {/* Reverted */}
                </button>
                <button
                  className="block px-4 py-2 text-left w-full hover:bg-gray-200"
                  onClick={() => {
                    onSortChange('name-asc');
                    setIsSortMenuOpen(false);
                  }}
                >
                  Name, A to Z {/* Reverted */}
                </button>
                <button
                  className="block px-4 py-2 text-left w-full hover:bg-gray-200"
                  onClick={() => {
                    onSortChange('name-desc');
                    setIsSortMenuOpen(false);
                  }}
                >
                  Name, Z to A {/* Reverted */}
                </button>
                <button
                  className="block px-4 py-2 text-left w-full hover:bg-gray-200"
                  onClick={() => {
                    onSortChange('price-asc');
                    setIsSortMenuOpen(false);
                  }}
                >
                  Price, low to high {/* Reverted */}
                </button>
                <button
                  className="block px-4 py-2 text-left w-full hover:bg-gray-200"
                  onClick={() => {
                    onSortChange('price-desc');
                    setIsSortMenuOpen(false);
                  }}
                >
                  Price, high to low {/* Reverted */}
                </button>
              </div>
            )}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm font-medium">View:</span> {/* Reverted */}
            <button
              className={`p-2 ${currentView === '3' ? 'bg-gray-300' : 'bg-white'} cursor-pointer`}
              onClick={() => onViewChange('3')}
            >
              <span className="grid grid-cols-3 gap-1">
                {Array.from({ length: 9 }).map((_, i) => (
                  <FaSquare key={i} className="w-[9px] h-[9px]" />
                ))}
              </span>
            </button>
            <button
              className={`p-2 ${currentView === '4' ? 'bg-gray-300' : 'bg-white'} cursor-pointer`}
              onClick={() => onViewChange('4')}
            >
              <span className="grid grid-cols-4 gap-1">
                {Array.from({ length: 16 }).map((_, i) => (
                  <FaSquare key={i} className="w-[6px] h-[6px]" />
                ))}
              </span>
            </button>
            <button
              className={`p-2 ${currentView === '5' ? 'bg-gray-300' : 'bg-white'} cursor-pointer`}
              onClick={() => onViewChange('5')}
            >
              <span className="grid grid-cols-5 gap-1">
                {Array.from({ length: 25 }).map((_, i) => (
                  <FaSquare key={i} className="w-[4px] h-[4px]" />
                ))}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSort;