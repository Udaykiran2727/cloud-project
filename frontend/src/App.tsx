// src/App.tsx  
import React from 'react';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import { Provider } from 'react-redux';  
import { PersistGate } from 'redux-persist/integration/react';  
import { store, persistor } from './store/store';  
import Login from './pages/Login';  
import Home from './pages/Home';  
import Cart from './pages/Cart';  
import MyCourses from './pages/MyCourses';  
import AddCourse from './pages/AddCourse';  
import PrivateRoute from './components/PrivateRoute';  
import AdminRoute from './components/AdminRoute'; 

function App() {  
  return (  
    <Provider store={store}>  
      <PersistGate loading={null} persistor={persistor}>  
        <Router>  
          <Routes>  
            <Route path="/login" element={<Login />} />  
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />  
            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />  
            <Route path="/my-courses" element={<PrivateRoute><MyCourses /></PrivateRoute>} />  
            <Route path="/add-course" element={<AdminRoute><AddCourse /></AdminRoute>} /> 
          </Routes>  
        </Router>  
      </PersistGate>  
    </Provider>  
  );  
}  

export default App;  