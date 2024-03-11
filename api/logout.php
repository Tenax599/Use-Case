<?php
session_start(); // 首先启动Session

// 删除 Cookie
setcookie("login", "", time() - 3600, "/");
setcookie("PHPSESSID", "", time() - 3600, "/");
session_destroy(); // 销毁Session
var_dump($_SESSION['user_id']);
exit();
?>
