// AddCourse.js  
import React, { useState } from 'react';  
import axios from 'axios';  
import { storage } from '../lib/firebase';  // Import storage from the firebase module  
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';  

function AddCourse() {  
  const [courseData, setCourseData] = useState({  
    title: '',  
    description: '',  
    price: '',  
    duration: '',  
    image: '',  
  });  

  const [error, setError] = useState('');  
  const [success, setSuccess] = useState('');   

  const handleInputChange = (e) => {  
    const { name, value } = e.target;  
    setCourseData({ ...courseData, [name]: value });  
  };  

  const handleImageUpload = async (e) => {  
    const file = e.target.files[0];  
    if (file) {  
      const storageRef = ref(storage, `images/${file.name}`);  // Use ref() with the correct storage object  
      try {  
        await uploadBytes(storageRef, file);  // Upload the file  
        const url = await getDownloadURL(storageRef);  // Get the download URL  
        setCourseData({ ...courseData, image: url });  
      } catch (error) {  
        setError('Error uploading image');  
        console.error('Error uploading image:', error);  
      }  
    }  
  };  

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    try {  
      const response = await axios.post('/api/add-course', courseData, {  
        headers: {  
          Authorization: `Bearer YOUR_JWT_TOKEN`, // Ensure to safely handle your JWT token  
        },  
      });  
      setSuccess("Course added successfully!");  
      setError('');  // Clear previous errors when successful  
      // Handle logic after successful submission here (e.g., reset the form)  
      setCourseData({ title: '', description: '', price: '', duration: '', image: '' }); // Reset form fields  
    } catch (error) {  
      setError("Error adding course. Please try again.");  
      console.error("Error adding course:", error);  
    }  
  };  

  return (  
    <div className="container mx-auto px-4 py-8">  
      <h1 className="text-3xl font-bold mb-6">Add New Course</h1>  
      <form className="max-w-2xl" onSubmit={handleSubmit}>  
        {error && <div className="mb-4 text-red-600">{error}</div>}  
        {success && <div className="mb-4 text-green-600">{success}</div>}  
        
        <div className="mb-4">  
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">  
            Course Title  
          </label>  
          <input  
            type="text"  
            id="title"  
            name="title"  
            value={courseData.title}  
            onChange={handleInputChange}  
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
            placeholder="Enter course title"  
            required  
          />  
        </div>  

        <div className="mb-4">  
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">  
            Description  
          </label>  
          <textarea  
            id="description"  
            name="description"  
            rows={4}  
            value={courseData.description}  
            onChange={handleInputChange}  
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
            placeholder="Enter course description"  
            required  
          />  
        </div>  

        <div className="mb-4">  
          <label htmlFor="price" className="block text-gray-700 font-medium mb-2">  
            Price  
          </label>  
          <input  
            type="number"  
            id="price"  
            name="price"  
            min="0"  
            step="0.01"  
            value={courseData.price}  
            onChange={handleInputChange}  
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
            placeholder="Enter course price"  
            required  
          />  
        </div>  

        <div className="mb-4">  
          <label htmlFor="duration" className="block text-gray-700 font-medium mb-2">  
            Duration (hours)  
          </label>  
          <input  
            type="number"  
            id="duration"  
            name="duration"  
            min="1"  
            value={courseData.duration}  
            onChange={handleInputChange}  
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
            placeholder="Enter course duration"  
            required  
          />  
        </div>  

        <div className="mb-4">  
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">  
            Course Image  
          </label>  
          <input  
            type="file"  
            id="image"  
            accept="image/*"  
            onChange={handleImageUpload}  
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
            required  
          />  
        </div>  

        <button  
          type="submit"  
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"  
        >  
          Add Course  
        </button>  
      </form>  
    </div>  
  );  
}  

export default AddCourse;  