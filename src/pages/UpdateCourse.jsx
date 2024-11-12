import React, { useState, useEffect } from 'react';
import '../updatecourse.css';

const UpdateCourse = () => {
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState({
    MaHP: '',
    tenHP: '',
    tinchi: '',
    giangvien: '',
    phonghoc: '',
    tinhtrang: '',
    siso: '',
    sisohientai: '',
    lichhoc: '',
    giobatdaubuoihoc: '',
    gioketthucbuoihoc: '',
    ngaybatdauhocphan: '',
    ngayketthuphan: '',
    hocky: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/courses');
            const data = await response.json();
            console.log('Fetched courses:', data); // Kiểm tra dữ liệu
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    fetchCourses();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) ? date.toLocaleDateString('vi-VN') : 'Invalid Date';
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!courseDetails.MaHP) {
      newErrors.MaHP = 'Mã học phần không được để trống';
    }

    if (!courseDetails.tenHP) {
      newErrors.tenHP = 'Tên học phần không được để trống';
    }

    if (!courseDetails.tinchi || isNaN(courseDetails.tinchi)) {
      newErrors.tinchi = 'Số tín chỉ phải là một số';
    }

    if (!courseDetails.siso || isNaN(courseDetails.siso)) {
      newErrors.siso = 'Sĩ số phải là một số';
    }

    if (!courseDetails.sisohientai || isNaN(courseDetails.sisohientai)) {
      newErrors.sisohientai = 'Sĩ số hiện tại phải là một số';
    }

    if (!courseDetails.ngaybatdauhocphan) {
      newErrors.ngaybatdauhocphan = 'Ngày bắt đầu không được để trống';
    }

    if (!courseDetails.ngayketthuphan) {
      newErrors.ngayketthuphan = 'Ngày kết thúc không được để trống';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addCourse = async () => {
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/courses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(courseDetails),
        });
        
        if (response.ok) {
          const newCourse = await response.json();
          setCourses([...courses, newCourse]);
          alert('Thêm học phần thành công');
          setShowForm(false);
        } else {
          alert('Thêm học phần thất bại');
        }
      } catch (error) {
        console.error('Lỗi khi thêm học phần:', error);
      }
    }
  };

  const deleteCourse = async (MaHP) => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${MaHP}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCourses(courses.filter(course => course.MaHP !== MaHP));
        alert('Xóa học phần thành công');
      } else {
        alert('Xóa học phần thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi xóa học phần:', error);
    }
  };

  const updateCourse = (MaHP) => {
    const course = courses.find(c => c.MaHP === MaHP);
    if (course) {
      setCourseDetails(course);
      setIsUpdating(true);
      setShowForm(true);
    }
  };

  const saveUpdatedCourse = async () => {
    if (validateForm()) {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${courseDetails.MaHP}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(courseDetails),
        });

        if (response.ok) {
          const updatedCourse = await response.json();
          setCourses(courses.map(course => (course.MaHP === updatedCourse.MaHP ? updatedCourse : course)));
          alert('Cập nhật học phần thành công');
          setShowForm(false);
          setIsUpdating(false);
        } else {
          alert('Cập nhật học phần thất bại');
        }
      } catch (error) {
        console.error('Lỗi khi cập nhật học phần:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="mt-8 flex justify-center">
          <button onClick={() => { setShowForm(!showForm); setIsUpdating(false); }} className="bg-white text-button p-2 border border-gray-300 rounded-full">
            {isUpdating ? 'SỬA HỌC PHẦN' : 'THÊM HỌC PHẦN'}
          </button>
        </div>

        {showForm && (
          <div className="mt-4">
            <form>
              <input type="text" name="MaHP" value={courseDetails.MaHP} onChange={handleChange} placeholder="Mã học phần" disabled={isUpdating}/>
              {errors.MaHP && <span className="error">{errors.MaHP}</span>}

              <input type="text" name="tenHP" value={courseDetails.tenHP} onChange={handleChange} placeholder="Tên học phần"/>
              {errors.tenHP && <span className="error">{errors.tenHP}</span>}

              <input type="number" name="tinchi" value={courseDetails.tinchi} onChange={handleChange} placeholder="Tín chỉ"/>
              {errors.tinchi && <span className="error">{errors.tinchi}</span>}

              <input type="text" name="giangvien" value={courseDetails.giangvien} onChange={handleChange} placeholder="Giảng viên"/>
              {errors.giangvien && <span className="error">{errors.giangvien}</span>}

              <input type="text" name="phonghoc" value={courseDetails.phonghoc} onChange={handleChange} placeholder="Phòng"/>
              {errors.phonghoc && <span className="error">{errors.phonghoc}</span>}

              <input type="text" name="tinhtrang" value={courseDetails.tinhtrang} onChange={handleChange} placeholder="Trạng thái"/>
              {errors.tinhtrang && <span className="error">{errors.tinhtrang}</span>}
             
              <input type="text" name="lichhoc" value={courseDetails.lichhoc} onChange={handleChange} placeholder="Ngày học"/>
              {errors.lichhoc && <span className="error">{errors.lichhoc}</span>}

              <input type="time" name="giobatdaubuoihoc" value={courseDetails.giobatdaubuoihoc} onChange={handleChange} placeholder="Giờ học"/>
              {errors.giobatdaubuoihoc && <span className="error">{errors.giobatdaubuoihoc}</span>}

              <input type="time" name="gioketthucbuoihoc" value={courseDetails.gioketthucbuoihoc} onChange={handleChange} placeholder="Giờ về"/>
              {errors.gioketthucbuoihoc && <span className="error">{errors.gioketthucbuoihoc}</span>}

              <input type="number" name="siso" value={courseDetails.siso} onChange={handleChange} placeholder="Sĩ số"/>
              {errors.siso && <span className="error">{errors.siso}</span>}

              <input type="number" name="sisohientai" value={courseDetails.sisohientai} onChange={handleChange} placeholder="Sĩ số hiện tại"/>
              {errors.sisohientai && <span className="error">{errors.sisohientai}</span>}

              <input type="date" name="ngaybatdauhocphan" value={courseDetails.ngaybatdauhocphan} onChange={handleChange}/>
              {errors.ngaybatdauhocphan && <span className="error">{errors.ngaybatdauhocphan}</span>}

              <input type="date" name="ngayketthuphan" value={courseDetails.ngayketthuphan} onChange={handleChange}/>
              {errors.ngayketthuphan && <span className="error">{errors.ngayketthuphan}</span>}

              <input type="text" name="hocky" value={courseDetails.hocky} onChange={handleChange} placeholder="Học Kỳ"/>
              {errors.hocky && <span className="error">{errors.hocky}</span>}

              <button type="button" onClick={isUpdating ? saveUpdatedCourse : addCourse} className="bg-white text-button p-2 border border-gray-300 rounded mb-2">
                {isUpdating ? 'CẬP NHẬT' : 'LƯU'}
              </button>
            </form>
          </div>
        )}

        <div className="course-list-wrapper">
          <h2 className="text-xl text-center text-button mb-4">DANH SÁCH HỌC PHẦN</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {courses.map(course => (
              <div key={course.MaHP} className="border border-gray-300 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">{course.MaHP}: {course.tenHP}</h3>
                <div className="space-y-2">
                  <p>Giảng viên: {course.giangvien}</p>
                  <p>Phòng: {course.phonghoc}</p>
                  <p>Trạng thái: {course.tinhtrang}</p>
                  <p>Số tín chỉ: {course.tinchi}</p>
                  <p>Sĩ số: {course.sisohientai}/{course.siso}</p>
                  <p>Ngày học: {course.lichhoc}</p>
                  <p>Thời gian học: {course.giobatdaubuoihoc} - {course.gioketthucbuoihoc}</p>
                  <p>Ngày bắt đầu: {formatDate(course.ngaybatdauhocphan)}</p>
                  <p>Ngày kết thúc: {formatDate(course.ngayketthuphan)}</p>
                  <p>Học Kỳ: {course.hocky}</p>
                </div>
                <div className="flex justify-center items-end mt-4 space-x-2">
                  <button onClick={() => updateCourse(course.MaHP)} className="bg-white text-button p-2 border border-gray-300 rounded">Sửa</button>
                  <button onClick={() => deleteCourse(course.MaHP)} className="bg-red-500 text-white p-2 border border-red-600 rounded">Xóa</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;