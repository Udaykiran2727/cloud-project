import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, ShoppingCart, Book, PlusCircle } from 'lucide-react';
import { logout } from '../store/slices/authSlice';
import { RootState } from '../store/store';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold">Course Platform</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/my-courses" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
              <Book size={20} />
              <span>My Courses</span>
            </Link>
            <Link to="/cart" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
              <ShoppingCart size={20} />
              <span>Cart</span>
            </Link>
            {role === 'admin' && (
              <Link to="/add-course" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                <PlusCircle size={20} />
                <span>Add Course</span>
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;