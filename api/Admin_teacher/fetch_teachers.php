<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Your database connection code
$con = mysqli_connect("localhost", "root", "", "blog");

$records_per_page = isset($_GET['records_per_page']) ? (int)$_GET['records_per_page'] : 20;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;

$search_query = isset($_GET['search_query']) ? mysqli_real_escape_string($con, $_GET['search_query']) : '';

$query = "SELECT * FROM teacher";

if (!empty($search_query)) {
    $query .= " WHERE name LIKE '%$search_query%'
                OR job_number LIKE '%$search_query%'
                OR major LIKE '%$search_query%'
                OR gender LIKE '%$search_query%'
                OR position LIKE '%$search_query%'
                OR birthdate LIKE '%$search_query%'";
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
