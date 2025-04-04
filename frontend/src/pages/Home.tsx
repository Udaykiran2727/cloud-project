import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Navbar from '../components/Navbar';

interface Course {
  id: string;
  title: string;
  details: string;
  category: string;
  available: boolean;
  image: string;
  price: number;
}

const Home = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('your-api-endpoint/courses', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, [token]);

  const handleAddToCart = async (courseId: string) => {
    try {
      await fetch('your-api-endpoint/cart/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courseId })
      });
      // You might want to show a success message or update the UI
    } catch (error) {
      console.error('Failed to add course to cart:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-4">{course.details}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">${course.price}</span>
                  <button
                    onClick={() => handleAddToCart(course.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="mt-4">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    {course.category}
                  </span>
                  {course.available ? (
                    <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 ml-2">
                      Available
                    </span>
                  ) : (
                    <span className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-red-700 ml-2">
                      Not Available
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;