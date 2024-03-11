<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
session_start(); // 开启会话

$con = mysqli_connect("localhost","root","","blog");

if (isset($_POST['job_number'])) { // 检查是否有名为 job_number 的表单域被提交

    // 对表单提交的数据进行转义，防止 SQL 注入攻击
    $job_number = mysqli_real_escape_string($con, $_POST['job_number']);
    $name = mysqli_real_escape_string($con, $_POST['name']);
    $gender = mysqli_real_escape_string($con, $_POST['gender']);
    $birthdate = mysqli_real_escape_string($con, $_POST['birthdate']);
    $major = mysqli_real_escape_string($con, $_POST['major']);
    $position = mysqli_real_escape_string($con, $_POST['position']);
    $avatarUrl = mysqli_real_escape_string($con, $_POST['avatarUrl']);

    // 构建 SQL 插入语句
    $query = "INSERT INTO teacher (job_number, name, gender, birthdate, major, position, avatarUrl)VALUES ('$job_number', '$name', '$gender', '$birthdate', '$major', '$position', '$avatarUrl')";

    $query_run = mysqli_query($con, $query);

    if ($query_run) { // 执行 SQL 插入语句，并判断结果是否成功
        echo json_encode(['success' => '老师添加成功']);
    } else {
        echo json_encode(['error' => '老师添加失败']);
    }
}

?>