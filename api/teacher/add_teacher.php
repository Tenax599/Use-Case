<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
session_start(); // 开启会话

$con = mysqli_connect("localhost","root","","blog");

if (isset($_POST['course_number'])) { // 检查是否有名为 exam_name 的表单域被提交

    // 对表单提交的数据进行转义，防止 SQL 注入攻击
    $course_number = mysqli_real_escape_string($con, $_POST['course_number']);
    $exam_name = mysqli_real_escape_string($con, $_POST['exam_name']);
    $student_number = mysqli_real_escape_string($con, $_POST['student_number']);
    $teacher_number = mysqli_real_escape_string($con, $_POST['teacher_number']);
    $score = mysqli_real_escape_string($con, $_POST['score']);

    // 构建 SQL 插入语句
    $query = "INSERT INTO course_score (course_number, exam
    _name, student_number, teacher_number, score)VALUES ('$course_number', '$exam_name', '$student_number', '$teacher_number', '$score')";

    $query_run = mysqli_query($con, $query);

    if ($query_run) { // 执行 SQL 插入语句，并判断结果是否成功
        echo json_encode(['success' => '成绩添加成功']);
    } else {
        echo json_encode(['error' => '成绩添加失败']);
    }
}

?>