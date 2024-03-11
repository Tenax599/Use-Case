<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

session_start();

$username = $_REQUEST['username'];
$password = $_REQUEST['password'];

// 检查用户名和密码是否匹配管理员账户
if ($username === 'admin' && $password === 'admin') {
    $cookieValue = '1|1'; // 管理员用户的id为1, userRole为admin
    setcookie("login", $cookieValue, time() + (86400 * 5), "/");
    echo json_encode(array("success" => true, 'cookie' => $cookieValue, "redirectUrl" => "/learning-php/UseCase/index.html"));
} else {
    // 连接数据库
    $conn = new mysqli("localhost","root","","blog");
    if ($conn->connect_error) {
        die("连接失败: " . $conn->connect_error);
    }

    // 查询用户
$sql = 'SELECT username, password, user_id, userRole
FROM (
  SELECT stu_number AS username, stu_pwd AS password, student_id AS user_id, userRole
  FROM student
  WHERE stu_number = ? AND stu_pwd = ?
  UNION
  SELECT tch_number AS username, tch_pwd AS password, job_number AS user_id, userRole
  FROM teacher
  WHERE tch_number = ? AND tch_pwd = ?
) AS users';


    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $username, $password, $username, $password);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        // var_dump($row);
        // 验证密码
        if ($row['password'] === $password) {
            // 登录成功，将用户信息保存到 Session 和 Cookie 中
            $user_id = $row['user_id']; // 修改这里，将变量赋值为$user_id
            $_SESSION['user_id'] = $user_id; // 用户ID
            $_SESSION['user_role'] = $row['userRole']; // 用户角色

            // 设置 Cookie
            $cookieValue = $user_id . '|' . $row['userRole'];
            setcookie("login", $cookieValue, time() + (86400 * 5), "/");

            // 根据用户角色跳转到不同的页面
            if ($row['userRole'] == '1') {
                echo json_encode(array("success" => true, "redirectUrl" => "/learning-php/UseCase/index.html"));
            } else if ($row['userRole'] == '2') {
                echo json_encode(array("success" => true, "redirectUrl" => "/learning-php/UseCase/teacher.html"));
            } else if ($row['userRole'] == '3') {
                echo json_encode(array("success" => true, "redirectUrl" => "/learning-php/UseCase/student.html"));
            } else {
                echo json_encode(array("success" => false, "message" => "密码错误"));
            }
        } else {
            echo json_encode(array("success" => false, "message" => "密码错误"));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "用户不存在"));
    }

    $stmt->close();
    $conn->close();
}
?>