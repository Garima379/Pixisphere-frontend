import { Link } from 'react-router-dom';

function PhotographerCard({ photographer }) {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-xl transition">
      <img
        src={photographer.profilePic || 'https://via.placeholder.com/150'}
        alt={photographer.name}
        className="w-80 h-60 object-cover rounded"
      />
      <h2 className="text-xl font-bold mt-2">{photographer.name}</h2>
      <p className="text-sm text-gray-600">{photographer.location}</p>
      <p className="text-sm mt-1">Price: ₹{photographer.price}</p>
      <p className="text-sm">Rating: ⭐ {photographer.rating}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {photographer.tags?.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        to={`/photographer/${photographer.id}`}
        className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        View Profile
      </Link>
    </div>
  );
}

export default PhotographerCard;


