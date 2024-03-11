<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
session_start(); // 启动 session

$con = mysqli_connect("localhost","root","","blog");

// if (isset($_POST['studentId'])) {
    $student_id = $_REQUEST['studentId'];

    // 生成随机密码（8位数字）
    $password = rand(10000000, 99999999);

    // 构造 SQL 更新语句
    $query = "UPDATE teacher SET tch_pwd='$password' WHERE job_number=$student_id";
    // var_dump($query);

    $query_run = mysqli_query($con, $query);

    // 执行更新操作
    if ($query_run) {
        echo json_encode(['success' => 'Password reset successfully. New password is: ' . $password]);
    } else {
        echo json_encode(['error' => 'Password reset failed.']);
    }
// }