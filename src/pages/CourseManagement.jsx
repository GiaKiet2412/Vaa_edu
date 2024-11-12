import React, { useState } from 'react';
import '../App.css';

const CourseManagement = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Hệ Quản Trị Cơ Sở Dữ Liệu', status: 'Đang mở', students: "30/60", time: 'Thứ 2, 9:00-11:00', code: 'DB001', room: 'Phòng 101' },
    { id: 2, name: 'Lập Trình Python', status: 'Đã đóng', students: "25/60", time: 'Thứ 3, 13:00-15:00', code: 'PY002', room: 'Phòng 102' },
    { id: 3, name: 'Phân Tích Thiết Kế Hệ Thống', status: 'Đang mở', students: "60/60", time: 'Thứ 4, 10:00-12:00', code: 'SYS003', room: 'Phòng 103' }
  ]);

  const toggleStatus = (courseId) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId
          ? { ...course, status: course.status === 'Đang mở' ? 'Đã đóng' : 'Đang mở' }
          : course
      )
    );
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-md w-full text-[#4297DE]">
      <h2 className="text-2xl font-bold text-[#4297DE]">Quản lý đăng ký học phần</h2>
      <table className="min-w-full bg-white mt-4 table-auto border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2 px-4">Mã học phần</th>
            <th className="py-2 px-4">Tên học phần</th>
            <th className="py-2 px-4">Thời gian</th>
            <th className="py-2 px-4">Phòng học</th>
            <th className="py-2 px-4">Trạng thái</th>
            <th className="py-2 px-4">Số sinh viên</th>
            <th className="py-2 px-4">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id} className="border-t">
              <td className="py-2 px-4">{course.code}</td>
              <td className="py-2 px-4">{course.name}</td>
              <td className="py-2 px-4">{course.time}</td>
              <td className="py-2 px-4">{course.room}</td>
              <td className="py-2 px-4">{course.status}</td>
              <td className="py-2 px-4">{course.students}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => toggleStatus(course.id)}
                  className={`px-4 py-1 rounded ${
                    course.status === 'Đang mở' ? 'bg-red-500' : 'bg-green-500'
                  } text-white`}
                >
                  {course.status === 'Đang mở' ? 'Đóng' : 'Mở'} đăng ký
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseManagement;
