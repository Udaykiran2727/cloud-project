import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Get JWT token from Redux

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token); // Get JWT token from Redux

  useEffect(() => {
    // Fetch the courses the user has enrolled in
    const fetchMyCourses = async () => {
      try {
        const response = await axios.get('YOUR_API_URL/mycourses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data); // Set courses data to state
      } catch (err) {
        setError('Error fetching courses.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, [token]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Courses</h1>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Courses</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>

      {/* Check if the user has no courses */}
      {courses.length === 0 ? (
        <p className="text-gray-600">You have not enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={course.image} // Assuming the API returns an image field
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-4">{course.details}</p>
                <p className="text-gray-800 font-semibold">{course.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCourses;
