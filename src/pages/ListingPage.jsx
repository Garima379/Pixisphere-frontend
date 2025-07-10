import { useEffect, useState } from 'react';
import PhotographerCard from '../components/PhotographerCard';

function ListingPage() {
  const [photographers, setPhotographers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Filters
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [selectedStyle, setSelectedStyle] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/photographers')
      .then((res) => res.json())
      .then((data) => {
        setPhotographers(data);
        setFiltered(data);
      });
  }, []);

  // Get all unique cities and styles
  const allCities = [...new Set(photographers.map((p) => p.location))];
  const allStyles = [...new Set(photographers.flatMap((p) => p.styles))];

  // Handle checkbox toggle
  const toggleStyle = (style) => {
    if (selectedStyle.includes(style)) {
      setSelectedStyle(selectedStyle.filter((s) => s !== style));
    } else {
      setSelectedStyle([...selectedStyle, style]);
    }
  };

  useEffect(() => {
    let result = [...photographers];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Price range
    if (minPrice) result = result.filter((p) => p.price >= parseInt(minPrice));
    if (maxPrice) result = result.filter((p) => p.price <= parseInt(maxPrice));

    // Rating
    if (minRating) result = result.filter((p) => p.rating >= parseFloat(minRating));

    // City
    if (selectedCity) result = result.filter((p) => p.location === selectedCity);

    // Style checkboxes
    if (selectedStyle.length > 0) {
      result = result.filter((p) =>
        selectedStyle.every((s) => p.styles.includes(s))
      );
    }

    // Sorting
    if (sortOption === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'rating-high') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'recent') {
      result.sort((a, b) => b.id - a.id);
    }

    setFiltered(result);
  }, [
    search,
    minPrice,
    maxPrice,
    minRating,
    selectedStyle,
    selectedCity,
    sortOption,
    photographers,
  ]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📸 Photographer Listing</h1>

      {/* 🔍 Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
        <input
          type="text"
          placeholder="Search name, location or tag"
          className="border p-2 h-9 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Price"
          className="border p-2 rounded"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="border p-2 rounded"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
        >
          <option value="">Min Rating</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="4.5">4.5+</option>
        </select>

        {/* City dropdown */}
        <select
          className="border p-2 rounded"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">All Cities</option>
          {allCities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>

        {/* Sorting dropdown */}
        <select
          className="border p-2 rounded"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="rating-high">Rating: High to Low</option>
          <option value="recent">Recently Added</option>
        </select>
      </div>

      {/* ✅ Styles checkbox filters */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Filter by Style:</h3>
        <div className="flex flex-wrap gap-3">
          {allStyles.map((style, index) => (
            <label key={index} className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={selectedStyle.includes(style)}
                onChange={() => toggleStyle(style)}
              />
              {style}
            </label>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map((photographer) => (
            <PhotographerCard key={photographer.id} photographer={photographer} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
}

export default ListingPage;
