<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
session_start(); // 启动 session

require_once 'dbcon.php'; // 引入数据库连接文件

if(isset($_POST['delete_student'])) // 检查是否有提交名为 delete_student 的表单
{
    $student_id = mysqli_real_escape_string($con, $_POST['delete_student']); // 获取通过表单 POST 方法传递过来的学生 ID，并转义特殊字符，防止 SQL 注入攻击

    $query = "DELETE FROM students WHERE id='$student_id'"; // 构建 SQL 删除语句
    $query_run = mysqli_query($con, $query); // 执行 SQL 删除语句，并将结果保存到变量 $query_run 中

    if($query_run) // 如果 SQL 查询成功执行
    {
        $_SESSION['message'] = "student Deleted Successfully"; // 在 session 中设置一个名为 message 的键值对，表示删除成功的消息
        header("Location: index.php"); // 重定向到主页
        exit(0); // 终止程序执行
    }
    else // 如果 SQL 查询执行失败
    {
        $_SESSION['message'] = "student Not Deleted"; // 在 session 中设置一个名为 message 的键值对，表示删除失败的消息
        header("Location: index.php"); // 重定向到主页
        exit(0); // 终止程序执行
    }
}

if(isset($_POST['reset_password']))
{
    $student_id = mysqli_real_escape_string($con, $_POST['reset_password']);
        // 获取教师 ID
    // $id = $_POST['id'];

    // 生成随机密码（8位数字）
    $password = rand(10000000, 99999999);

    // 对密码进行 MD5 加密
    // $encrypted_password = md5($password);

    // 构造 SQL 更新语句
    $query = "UPDATE students SET phone='$password' WHERE id=$student_id";

    $query_run = mysqli_query($con, $query);

    // 执行更新操作
    if ($query_run)
    {
        $_SESSION['message'] = "Password reset successfully. New password is:" . $password;
        header("Location: index.php");
        exit(0);
        // echo "Password reset successfully. New password is: " . $password;
    } else {
        $_SESSION['message'] = "Password reset failed.";
        header("Location: index.php");
        exit(0);
        // echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

}


if (isset($_POST['update_student'])) // 检查是否有提交名为 update_student 的表单
{
    $student_id = mysqli_real_escape_string($con, $_POST['student_id']); // 获取通过表单 POST 方法传递过来的学生 ID，并转义特殊字符，防止 SQL 注入攻击
    $name = mysqli_real_escape_string($con, $_POST['name']); // 获取通过表单 POST 方法传递过来的学生姓名，并转义特殊字符，防止 SQL 注入攻击
    $email = mysqli_real_escape_string($con, $_POST['email']); // 获取通过表单 POST 方法传递过来的学生邮箱，并转义特殊字符，防止 SQL 注入攻击
    $phone = mysqli_real_escape_string($con, $_POST['phone']); // 获取通过表单 POST 方法传递过来的学生电话，并转义特殊字符，防止 SQL 注入攻击
    $course = mysqli_real_escape_string($con, $_POST['course']); // 获取通过表单 POST 方法传递过来的学生课程，并转义特殊字符，防止 SQL 注入攻击

    $query = "UPDATE students SET name='$name', email='$email', phone='$phone', course='$course' WHERE id='$student_id' "; // 构建 SQL 更新语句
    $query_run = mysqli_query($con, $query); // 执行 SQL 更新语句，并将结果保存到变量 $query_run 中

    if ($query_run) // 如果 SQL 查询成功执行
    {
        $_SESSION['message'] = "Student Updated Successfully"; // 在 session 中设置一个名为 message 的键值对，表示更新成功的消息
        header("Location: index.php"); // 重定向到主页
        exit(0); // 终止程序执行
    } else // 如果 SQL 查询执行失败
    {
        $_SESSION['message'] = "Student Not Updated"; // 在 session 中设置一个名为 message 的键值对，表示更新失败的消息
        header("Location: index.php"); // 重定向到主页
        exit(0); // 终止程序执行
    }
}




if (isset($_POST['save_student'])) // 检查是否有提交名为 save_student 的表单
{
    $name = mysqli_real_escape_string($con, $_POST['name']); // 获取通过表单 POST 方法传递过来的学生姓名，并转义特殊字符，防止 SQL 注入攻击
    $email = mysqli_real_escape_string($con, $_POST['email']); // 获取通过表单 POST 方法传递过来的学生邮箱，并转义特殊字符，防止 SQL 注入攻击
    $phone = mysqli_real_escape_string($con, $_POST['phone']); // 获取通过表单 POST 方法传递过来的学生电话，并转义特殊字符，防止 SQL 注入攻击
    $course = mysqli_real_escape_string($con, $_POST['course']); // 获取通过表单 POST 方法传递过来的学生课程，并转义特殊字符，防止 SQL 注入攻击

    $query = "INSERT INTO students (name,email,phone,course) VALUES ('$name','$email','$phone','$course') "; // 构建 SQL 插入语句
    $query_run = mysqli_query($con, $query); // 执行 SQL 插入语句，并将结果保存到变量 $query_run 中

    if ($query_run) // 如果 SQL 查询成功执行
    {
        $_SESSION['message'] = "Student Created Successfully"; // 在 session 中设置一个名为 message 的键值对，表示插入成功的消息
        header("Location: index.php"); // 重定向到主页
        exit(0); // 终止程序执行
    } else // 如果 SQL 查询执行失败
    {
        $_SESSION['message'] = "Student Not Created"; // 在 session 中设置一个名为 message 的键值对，表示插入失败的消息
        header("Location: index.php"); // 重定向到主页
        exit(0); // 终止程序执行
    }
}

$results = array(); // 初始化 $results 变量

if (isset($_POST['search_student'])) // 检查+是否有提交名为 search_student 的表单
{
    $search_query = mysqli_real_escape_string($con, $_POST['search_query']); // 获取通过表单 POST 方法传递过来的查询关键字，并转义特殊字符，防止 SQL 注入攻击
    $query = "SELECT * FROM students WHERE name LIKE '%$search_query%' OR email LIKE '%$search_query%' OR phone LIKE '%$search_query%' OR course LIKE '%$search_query%' "; // 构建 SQL 查询语句
    $query_run = mysqli_query($con, $query); // 执行 SQL 查询语句，并将结果保存到变量 $query_run 中
    $results = array();
    if (mysqli_num_rows($query_run) > 0) // 如果查询结果不为空
    {

        while ($row = mysqli_fetch_assoc($query_run))

        {
            // print_r($row); // 打印当前行的数据
            $results[] = $row;
            // print_r($row); // 打印当前行的数据
            $_SESSION['message'] = "Matching records found"; // 在 session 中设置一个名为 message 的键值对，表示插入成功的消息
            header("Location: index.php"); // 重定向到主页
            exit(0); // 终止程序执行
        }
    } else // 如果查询结果为空
    {
        $_SESSION['message'] = "No matching records found"; // 在 session 中设置一个名为 message 的键值对，表示插入成功的消息
        header("Location: index.php"); // 重定向到主页
        exit(0); // 终止程序执行
    }
}


// 检查student_id是否存在
if (isset($_GET['student_id'])) {
    $student_id = $_GET['student_id'];

    // 创建查询以获取学生信息
    $query = "SELECT * FROM students WHERE id = ?";

    // 使用预处理语句防止SQL注入
    $stmt = $con->prepare($query);
    $stmt->bind_param("i", $student_id);
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





