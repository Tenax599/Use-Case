<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
session_start(); // 开启会话

$con = mysqli_connect("localhost","root","","blog");

if (isset($_POST['student_id'])) { // 检查是否有名为 student_id 的表单域被提交

    // 对表单提交的数据进行转义，防止 SQL 注入攻击
    $student_id = mysqli_real_escape_string($con, $_POST['student_id']);
    $class = mysqli_real_escape_string($con, $_POST['class']);
    $name = mysqli_real_escape_string($con, $_POST['name']);
    $gender = mysqli_real_escape_string($con, $_POST['gender']);
    $birthdate = mysqli_real_escape_string($con, $_POST['birthdate']);

    // 构建 SQL 插入语句
    $query = "INSERT INTO student (student_id, class, name, gender, birthdate)VALUES ('$student_id', '$class', '$name', '$gender', '$birthdate')";

    $query_run = mysqli_query($con, $query);

    if ($query_run) { // 执行 SQL 插入语句，并判断结果是否成功
        echo json_encode(['success' => '学生添加成功']);
    } else {
        echo json_encode(['error' => '学生添加失败']);
    }
}

?>