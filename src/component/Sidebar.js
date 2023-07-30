import React from 'react';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../features/userSlice';
import { menus } from '../utility/constant';
import useGetUsers from '../hooks/useGetUsers';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { users } = useGetUsers();
  const auth = useSelector((state) => state.user);

  const usersOnline = users.filter((user) => user.online);

  return (
    <aside className="basis-2/12 sidebar">
      <div>
        <div className="p-3 mb-3">
          <h1 className="text-xl font-bold text-center text-blue-700">
            E-Task
          </h1>
        </div>
        {/* Lists Menu */}
        {menus.map((menu, i) => (
          <NavLink end to={menu.to} key={i} className="navlink text-gray-500">
            <span className="mr-4 inline-block ">{menu.icon}</span>
            <h1>{menu.name}</h1>
          </NavLink>
        ))}
        <div
          onClick={async () => {
            const userRef = doc(db, 'users', auth.userId);

            await updateDoc(userRef, {
              online: false,
            });

            dispatch(userLogout());
          }}
          className="navlink text-gray-500"
        >
          <span className="mr-4 inline-block">
            <ArrowLeftOnRectangleIcon width="20" />
          </span>
          <h1>Logout</h1>
        </div>
        <div className="px-6 mt-3 mb-3">
          <h1 className="text-sm font-bold text-gray-500">Users Online</h1>
        </div>
        {usersOnline.map((user) => (
          <div
            key={user.id}
            className="px-6 text-sm py-1 text-gray-500 flex items-center"
          >
            <span className="mr-4 w-2 h-2 bg-green-500 inline-block rounded-full"></span>
            <img
              src={user.photoURL}
              alt="avatar-user"
              className="avatar mr-2"
            />
            <h1>{user.displayName}</h1>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
