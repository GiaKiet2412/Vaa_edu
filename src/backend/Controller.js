const express = require('express');
const mysql = require('mysql2/promise'); // Sử dụng mysql2 với Promise
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Cấu hình kết nối MySQL
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vaaedu'
};

app.use(cors());
app.use(express.json());

// Kết nối đến MySQL
const getConnection = async () => {
    return await mysql.createConnection(dbConfig);
};

// Danh sách học phần
app.get('/api/courses', async (req, res) => {
    try {
        const connection = await getConnection();
        const [courses] = await connection.query('SELECT * FROM hocphan');
        const mappedCourses = courses.map(course => ({
            MaHP: course.MaHP,
            tenHP: course.tenHP,
            tinchi: course.tinchi,
            giangvien: course.giangvien,
            phonghoc: course.phonghoc,
            tinhtrang: course.tinhtrang,
            siso: course.siso,
            sisohientai: course.sisohientai,
            lichhoc: course.lichhoc,
            giobatdaubuoihoc: course.giobatdaubuoihoc,
            gioketthucbuoihoc: course.gioketthucbuoihoc,
            ngaybatdauhocphan: course.ngaybatdauhocphan,
            ngayketthuphan: course.ngayketthuphan,
            hocky: course.hocky
        }));
        res.json(mappedCourses);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving courses');
    }
});

// Thêm học phần
app.post('/api/courses', async (req, res) => {
    try {
        const connection = await getConnection();
        const newCourse = req.body;

        // Cấu trúc lại dữ liệu để phù hợp với MySQL
        const result = await connection.query('INSERT INTO HocPhan SET ?', newCourse);
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding course');
    }
});

// Sửa học phần
app.put('/api/courses/:mahp', async (req, res) => {
    try {
        const connection = await getConnection();
        const { mahp } = req.params;
        const updatedCourse = req.body;

        const [result] = await connection.query('UPDATE HocPhan SET ? WHERE MaHP = ?', [updatedCourse, mahp]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Course not found');
        }

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating course');
    }
});

// DELETE - Xóa học phần theo MaHP
app.delete('/api/courses/:mahp', async (req, res) => {
    try {
        const connection = await getConnection();
        const { mahp } = req.params;
        const [result] = await connection.query('DELETE FROM HocPhan WHERE MaHP = ?', [mahp]);
        
        if (result.affectedRows === 0) {
            return res.status(404).send('Course not found');
        }

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting course');
    }
});

// GET - Lấy danh sách sinh viên
app.get('/api/students', async (req, res) => {
    try {
        const connection = await getConnection();
        const [students] = await connection.query('SELECT * FROM SinhVien');
        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving students');
    }
});

// PUT - Cập nhật trạng thái tài khoản sinh viên
app.put('/api/students/:id/update-status', async (req, res) => {
    try {
        const connection = await getConnection();
        const { id } = req.params;
        const { status } = req.body;

        // Kiểm tra trạng thái
        const validStatuses = ['đang học', 'bảo lưu', 'thôi học', 'đã ra trường'];
        if (!validStatuses.includes(status)) {
            return res.status(400).send('Trạng thái không hợp lệ');
        }

        // Cập nhật trạng thái sinh viên
        const [result] = await connection.query('UPDATE sinhvien SET TrangThai = ? WHERE MaSV = ?', [status, id]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Không tìm thấy sinh viên');
        }

        res.json({ MaSV: id, TrangThai: status });
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi cập nhật trạng thái sinh viên');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
