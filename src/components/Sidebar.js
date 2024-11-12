// Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import file CSS đã được tách

const Sidebar = ({ adminName = "Admin" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    const tableContainer = document.querySelector('.table-container');
    if (tableContainer) {
      tableContainer.style.paddingLeft = isOpen ? '260px' : '20px';
    }
  };

  return (
    <>
      {/* Nút ba gạch mở sidebar */}
      <div className="bg-gradient-to-b from-[#4297DE] to-[#88D5F4] p-2 text-white fixed top-0 left-0 z-50 w-full flex items-center">
        <button onClick={toggleSidebar} className="hamburger">
          &#9776;
        </button>
        <nav className="justify-start space-x-10 ml-4">
          <Link className="text-white ml-4" to="/">TRANG CHỦ</Link>
          <Link className="text-white" to="/student-management">QUẢN LÝ TÀI KHOẢN SINH VIÊN</Link>
          <Link className="text-white" to="/course-management">QUẢN LÝ ĐĂNG KÝ HỌC PHẦN</Link>
          <Link className="text-white" to="/update-course">DANH SÁCH HỌC PHẦN</Link>
        </nav>
        <span className="welcome-message">XIN CHÀO, {adminName}!</span>
      </div>

      {/* Sidebar */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-64 bg-gradient-to-b from-[#4297DE] to-[#88D5F4] h-screen p-5 z-50 text-white">
          <button onClick={toggleSidebar} className="text-white text-2xl float-right">
            &times;
          </button>
          <h1 className="text-2xl font-bold mb-5">QUẢN TRỊ</h1>
          <p className="text-lg mb-5">XIN CHÀO {adminName}!</p>
          <ul>
            <li className="mb-4"><Link to="/" className="text-white">TRANG CHỦ</Link></li>
            <li className="mb-4"><Link to="/student-management" className="text-white">QUẢN LÝ TÀI KHOẢN SINH VIÊN</Link></li>
            <li className="mb-4"><Link to="/course-management" className="text-white">QUẢN LÝ ĐĂNG KÝ HỌC PHẦN</Link></li>
            <li className="mb-4"><Link to="/update-course" className="text-white">DANH SÁCH HỌC PHẦN</Link></li>
          </ul>
          <Link to="/logout" className="text-white text-lg">ĐĂNG XUẤT</Link>
        </div>
      )}
    </>
  );
};

export default Sidebar;
