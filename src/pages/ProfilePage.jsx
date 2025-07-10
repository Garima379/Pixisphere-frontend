import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InquiryModal from '../components/InquiryModal';

function ProfilePage() {
  const { id } = useParams();
  const [photographer, setPhotographer] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/photographers/${id}`)
      .then((res) => res.json())
      .then((data) => setPhotographer(data))
      .catch((err) => console.error('Error fetching profile:', err));
  }, [id]);

  if (!photographer) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={photographer.profilePic}
        alt={photographer.name}
        className="w-70 h-64 object-cover rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold">{photographer.name}</h1>
      <p className="text-gray-600 italic">{photographer.bio}</p>

      <div className="mt-4">
        <p><strong>Location:</strong> {photographer.location}</p>
        <p><strong>Price:</strong> ₹{photographer.price}</p>
        <p><strong>Rating:</strong> ⭐ {photographer.rating}</p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Styles:</h3>
        <div className="flex flex-wrap gap-2">
          {photographer.styles.map((style, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              {style}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Tags:</h3>
        <div className="flex flex-wrap gap-2">
          {photographer.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Reviews</h3>
        {photographer.reviews?.length ? (
          photographer.reviews.map((review, index) => (
            <div key={index} className="border p-3 mb-2 rounded shadow-sm">
              <p className="font-semibold">
                {review.name} ⭐ {review.rating}
              </p>
              <p className="text-sm text-gray-600">{review.date}</p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >

  {photographer.portfolio?.length > 0 && (
  <div className="mt-8">
    <h3 className="text-xl font-semibold mb-2">Portfolio</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {photographer.portfolio.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Portfolio ${index + 1}`}
          className="w-full h-[200px] object-cover rounded shadow-md hover:scale-105 transition-transform "
        />
      ))}
    </div>
  </div>
)}




        Send Inquiry
      </button>

      <InquiryModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default ProfilePage;

