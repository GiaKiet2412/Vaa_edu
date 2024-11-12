// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CourseManagement from './pages/CourseManagement';
import StudentManagement from './pages/StudentManagement';
import UpdateCourse from './pages/UpdateCourse';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="p-5 w-full">
          <Routes>
            <Route path="/course-management" element={<CourseManagement />} />
            <Route path="/student-management" element={<StudentManagement />} />
            <Route path="/update-course" element={<UpdateCourse />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
