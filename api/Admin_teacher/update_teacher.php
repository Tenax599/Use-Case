<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
session_start(); // 启动 session

$con = mysqli_connect("localhost","root","","blog");

//检查POST数据是否存在
if (isset($_POST['studentId'])) {

    $student_id = $_POST['studentId'];
    // 其他表单字段...
    $name = mysqli_real_escape_string($con, $_POST['name']); // 获取通过表单 POST 方法传递过来的学生姓名，并转义特殊字符，防止 SQL 注入攻击

    $gender = mysqli_real_escape_string($con, $_POST['gender']); // 获取通过表单 POST 方法传递过来的学生邮箱，并转义特殊字符，防止 SQL 注入攻击

    $class = mysqli_real_escape_string($con, $_POST['class']); // 获取通过表单 POST 方法传递过来的学生电话，并转义特殊字符，防止 SQL 注入攻击

    $avatar = mysqli_real_escape_string($con, $_POST['avatar']); // 获取通过表单 POST 方法传递过来的学生课程，并转义特殊字符，防止 SQL 注入攻击
    
    $major = mysqli_real_escape_string($con, $_POST['major']);
    
    $position = mysqli_real_escape_string($con, $_POST['position']);
    // 创建更新语句
    $query = "UPDATE teacher SET name=?, gender=?, birthdate=?, avatarUrl=?, major=?, position=? WHERE job_number=$student_id";

    // 使用预处理语句防止SQL注入
    $stmt = $con->prepare($query);
    $stmt->bind_param("ssssss",  $name, $gender, $class, $avatar, $major, $position);
    
    // 执行更新
    $result = $stmt->execute();
    
    if ($result) {
        echo json_encode(['success' => 'Teacher information updated successfully.']);
    } else {
        echo json_encode(['error' => 'Failed to update teacher information.']);
    }
    
    // 关闭连接
    $stmt->close();
    $con->close();
} else {
    echo json_encode(['error' => 'No student ID provided.']);
}
