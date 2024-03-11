const baseURL = 'http://localhost/learning-php/UseCase/api/';
let url = {
    studentAdmin: {
        add: baseURL + 'Admin_student/add_student.php',
        update: baseURL + 'Admin_student/update_student.php',
        edit: baseURL + 'Admin_student/edit_student.php',
        fetch: baseURL + 'Admin_student/fetch_students.php',
    },
    teacherAdmin: {
        fetch: baseURL + 'Admin_teacher/fetch_teachers.php',
        edit : baseURL + 'Admin_teacher/edit_teacher.php',
        update : baseURL + 'Admin_teacher/update_teacher.php',
        reset : baseURL + 'Admin_teacher/reset_password.php',
        add : baseURL + 'Admin_teacher/add_teacher.php'
    },
    teacher: {
        fetch: baseURL + 'teacher/fetch_teacher.php',
        edit: baseURL + 'teacher/edit_teacher.php',
        update: baseURL + 'teacher/update_teacher.php',
        add: baseURL + 'teacher/add_teacher.php'
    },
    student: {
        fetch: baseURL + 'student/fetch_student.php',
    },
    login: baseURL + 'login.php',
    code: baseURL + 'code.php',
    logout: baseURL + 'logout.php',
    reset: baseURL + 'reset_password.php',
};
