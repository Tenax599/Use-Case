<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

session_start();

$user_id = $_SESSION['user_id'];
$user_role = $_SESSION['user_role'];

// Your database connection code
$con = mysqli_connect("localhost", "root", "", "blog");

$records_per_page = isset($_GET['records_per_page']) ? (int)$_GET['records_per_page'] : 20;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;

$search_query = isset($_GET['search_query']) ? mysqli_real_escape_string($con, $_GET['search_query']) : '';

$query = "SELECT
            course.course_number AS course_number,
            course.name AS course_name,
            course_score.course_number AS score_course_number,
            course_score.exam_name,
            course_score.student_number,
            course_score.teacher_number,
            course_score.score,
            teacher.job_number,
            teacher.name AS teacher_name,
            teacher.major,
            student.name AS student_name,
            student.student_id
        FROM
            course
            INNER JOIN course_score ON course.course_number = course_score.course_number
            INNER JOIN teacher ON course_score.teacher_number = teacher.job_number
            INNER JOIN student ON course_score.student_number = student.student_id
        WHERE
            course_score.teacher_number = '$user_id' AND teacher.isDelete = 0";

if (!empty($search_query)) {
    $query .= " AND (
                student.name LIKE '%$search_query%'
                OR student.student_id LIKE '%$search_query%'
                OR teacher.job_number LIKE '%$search_query%'
                OR teacher.name LIKE '%$search_query%'
                OR course_score.course_number LIKE '%$search_query%'
                OR teacher.major LIKE '%$search_query%'
                OR course.name LIKE '%$search_query%'
                OR course_score.score LIKE '%$search_query%'
            )";
}

$query_count = "SELECT COUNT(*) as total FROM ($query) as t";

$query_count_result = mysqli_query($con, $query_count);
if ($query_count_result) {
    $total_records = mysqli_fetch_array($query_count_result)['total'];
    $total_pages = ceil($total_records / $records_per_page);
} else {
    // 查询执行失败，输出错误信息
    $error_message = mysqli_error($con);
    $response = array(
        'error' => 'Query execution failed.',
        'error_message' => $error_message,
    );
    echo json_encode($response);
    exit();
}

$offset = ($page - 1) * $records_per_page;
$query .= " LIMIT $offset, $records_per_page";

$query_run = mysqli_query($con, $query);

$students = array();
while ($row = mysqli_fetch_assoc($query_run)) {
    $students[] = $row;
}

$response = array(
    'students' => $students,
    'total_pages' => $total_pages,
);

echo json_encode($response);
?>
