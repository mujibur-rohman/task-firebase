import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddTask from '../pages/AddTask';
import DetailTask from '../pages/DetailTask';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyTask from '../pages/MyTask';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import Users from '../pages/Users';
import PrivateRoute from './PrivateRoute';
import ProtectedRoute from './ProtectedRoute';

const SetupRouter = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/my-task" element={<MyTask />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/detail/:id" element={<DetailTask />} />
        <Route path="/users" element={<Users />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default SetupRouter;
