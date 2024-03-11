<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
session_start(); // 启动 session

$con = mysqli_connect("localhost","root","","blog");

//检查POST数据是否存在
if (isset($_POST['exam'])) {

    $exam_name = $_POST['exam'];
    // 其他表单字段...
    $score = mysqli_real_escape_string($con, $_POST['score']); // 获取通过表单 POST 方法传递过来的学生姓名，并转义特殊字符，防止 SQL 注入攻击

    $student_number = mysqli_real_escape_string($con, $_POST['student_number']);
    // 创建更新语句
    $query = "UPDATE course_score SET score=? WHERE exam_name='$exam_name' AND student_number='$student_number'";

    // 使用预处理语句防止SQL注入
    $stmt = $con->prepare($query);
    $stmt->bind_param("s",  $score);
    
    // 执行更新
    $result = $stmt->execute();
    
    if ($result) {
        echo json_encode(['success' => 'score information updated successfully.']);
    } else {
        echo json_encode(['error' => 'Failed to update score information.']);
    }
    
    // 关闭连接
    $stmt->close();
    $con->close();
} else {
    echo json_encode(['error' => 'No exam name provided.']);
}
