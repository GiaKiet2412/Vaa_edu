import React, { useState, useEffect } from 'react';
import '../App.css';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);

  // Hàm lấy danh sách sinh viên từ API
  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students');
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        alert('Có lỗi xảy ra khi lấy danh sách sinh viên.');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Gọi hàm fetchStudents khi component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const toggleStatus = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/students/${studentId}/toggle-status`, {
        method: 'PUT',
      });

      if (response.ok) {
        const updatedStudent = await response.json();
        setStudents(prevStudents =>
          prevStudents.map(student =>
            student._id === updatedStudent.id
              ? { ...student, TrangThai: updatedStudent.status }
              : student
          )
        );
      } else {
        alert('Có lỗi xảy ra khi cập nhật trạng thái tài khoản.');
      }
    } catch (error) {
      console.error('Error updating student status:', error);
    }
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-md w-full text-[#4297DE]">
      <h2 className="text-2xl font-bold text-[#4297DE]">Quản lý tài khoản sinh viên</h2>
      <table className="min-w-full bg-white mt-4 table-auto border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2 px-4">Mã sinh viên</th>
            <th className="py-2 px-4">Tên sinh viên</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Địa chỉ</th>
            <th className="py-2 px-4">Trạng thái</th>
            <th className="py-2 px-4">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id} className="border-t">
              <td className="py-2 px-4">{student.MaSV}</td>
              <td className="py-2 px-4">{student.HoTen}</td>
              <td className="py-2 px-4">{student.Email}</td>
              <td className="py-2 px-4">{student.DiaChi}</td>
              <td className="py-2 px-4">{student.TrangThai}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => toggleStatus(student._id)}
                  className={`px-4 py-1 rounded ${
                    student.TrangThai === 'Hoạt động' ? 'bg-red-500' : 'bg-green-500'
                  } text-white`}
                >
                  {student.TrangThai === 'Hoạt động' ? 'Khóa' : 'Mở'} tài khoản
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentManagement;