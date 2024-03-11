<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$con = mysqli_connect("localhost","root","","blog");

if (isset($_GET['student_number'])) {
    $student_number = $_GET['student_number'];

    // 创建查询以获取学生信息
    $query = "SELECT * FROM course_score WHERE student_number = ?";

    // 使用预处理语句防止SQL注入
    $stmt = $con->prepare($query);
    $stmt->bind_param("s", $student_number);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // 输出学生信息作为JSON
        $row = $result->fetch_assoc();
        echo json_encode($row);
    } else {
        echo json_encode(['error' => 'No student found with the given ID.']);
    }
    
    // 关闭连接
    $stmt->close();
    $con->close();
} else {
    echo json_encode(['error' => 'No student ID provided.']);
}
?>