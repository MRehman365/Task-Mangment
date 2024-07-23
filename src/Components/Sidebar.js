import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineProject, AiOutlineSetting } from 'react-icons/ai';
import { GoHome } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { BsListCheck } from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { FiMoon, FiMenu } from 'react-icons/fi';

const Sidebar = ({ isOpen, onToggleSidebar }) => {
  return (
    <>
      <div className={`fixed inset-0 z-40 lg:hidden ${isOpen ? 'block' : 'hidden'}`} onClick={onToggleSidebar}></div>
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform lg:relative lg:translate-x-0 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex justify-between items-center lg:justify-center">
          <h1 className="text-2xl font-bold">MAXIFY</h1>
          <button className="lg:hidden text-2xl" onClick={onToggleSidebar}>
            <RxCross2 />
          </button>
        </div>
        <div className="mt-8">
          <ul>
            <li className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
              <GoHome className="mr-3" />
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
              <BsListCheck className="mr-3" />
              <Link to="/task-list">My Tasks</Link>
            </li>
            <li className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
              <IoIosNotificationsOutline className="mr-3" />
              <Link to="/notifications">Notifications</Link>
            </li>
            <li className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
              <AiOutlineSetting className="mr-3" />
              <Link to="/goals">Goals</Link>
            </li>
          </ul>
          <div className="mt-8">
            <h2 className="px-4 text-gray-500 uppercase">Projects</h2>
            <ul>
              <li className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
                <AiOutlineProject className="mr-3" />
                <Link to="/projects/app-design">App Design</Link>
              </li>
              <li className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
                <AiOutlineProject className="mr-3" />
                <Link to="/projects/convo-design">Convo Design</Link>
              </li>
              <li className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
                <AiOutlineProject className="mr-3" />
                <Link to="/projects/dribble-shots">Dribble Shots</Link>
              </li>
              <li className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
                <AiOutlineProject className="mr-3" />
                <Link to="/projects/new-client">New Client</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-auto p-4 flex justify-between items-center">
          <FiMoon className="mr-3" />
          <span>Turn light off</span>
        </div>
        <ul>
          <li className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
      <button className="fixed top-4 right-4 lg:hidden text-3xl z-50" onClick={onToggleSidebar}>
        <FiMenu />
      </button>
    </>
  );
};

export default Sidebar;
