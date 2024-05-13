-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2024-05-13 15:35:32
-- 服务器版本： 10.4.24-MariaDB
-- PHP 版本： 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `blog`
--

-- --------------------------------------------------------

--
-- 表的结构 `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL COMMENT '用户编号',
  `username` varchar(16) NOT NULL COMMENT '登录名',
  `password` varchar(16) NOT NULL COMMENT '登录密码',
  `truename` varchar(16) NOT NULL COMMENT '真实姓名',
  `super` tinyint(1) NOT NULL COMMENT 'true 表示管理员\r\nfalse 表示普通用户'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `account`
--

INSERT INTO `account` (`id`, `username`, `password`, `truename`, `super`) VALUES
(1, 'admin', '1518318962', '赖晓裕', 1),
(2, 'zhangsan', '000000', '张三', 0),
(3, 'zhaosi', '123456', '赵四', 0);

-- --------------------------------------------------------

--
-- 表的结构 `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL COMMENT '收支编号',
  `aid` int(11) NOT NULL COMMENT '所属用户编号',
  `cid` int(11) NOT NULL COMMENT '所属分类编号',
  `type` int(11) NOT NULL COMMENT '1 表示收入\r\n-1 表示支出',
  `amount` decimal(10,2) NOT NULL COMMENT '金额',
  `postdate` date NOT NULL COMMENT '发生日期',
  `remark` text NOT NULL COMMENT '备注信息'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `booking`
--

INSERT INTO `booking` (`id`, `aid`, `cid`, `type`, `amount`, `postdate`, `remark`) VALUES
(20, 1, 1, 1, '100.00', '2022-12-12', ''),
(21, 1, 2, 1, '50.00', '2022-12-12', ''),
(22, 1, 3, -1, '10.00', '2022-12-12', ''),
(23, 1, 4, -1, '200.00', '2022-12-12', ''),
(24, 1, 5, -1, '160.00', '2022-12-12', ''),
(25, 1, 6, -1, '800.00', '2022-12-12', ''),
(26, 1, 7, 1, '2000.00', '2022-12-12', ''),
(27, 1, 8, 1, '8000.00', '2022-12-12', ''),
(28, 1, 9, 1, '9800.00', '2022-12-12', ''),
(29, 1, 10, 1, '2000.00', '2022-12-12', ''),
(30, 1, 1, -1, '200.00', '2022-12-12', ''),
(31, 1, 2, -1, '100.00', '2022-12-12', ''),
(32, 1, 3, -1, '20.00', '2022-12-12', ''),
(33, 1, 6, -1, '3200.00', '2022-12-12', ''),
(34, 1, 6, -1, '1000.00', '2022-12-12', ''),
(35, 1, 3, -1, '10.00', '2022-12-12', ''),
(36, 1, 3, -1, '10.00', '2022-12-12', ''),
(37, 1, 3, -1, '10.00', '2022-12-12', ''),
(38, 1, 3, -1, '1.00', '2022-12-12', ''),
(39, 1, 7, 1, '1000.00', '2022-12-12', ''),
(40, 1, 1, 1, '100.00', '2022-12-13', ''),
(41, 1, 2, -1, '50.00', '2022-12-13', ''),
(42, 1, 3, -1, '10.00', '2022-12-13', ''),
(43, 1, 6, -1, '150.00', '2022-12-13', ''),
(44, 1, 3, 1, '10.00', '2022-12-13', '');

-- --------------------------------------------------------

--
-- 表的结构 `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL COMMENT '分类编号',
  `title` varchar(16) CHARACTER SET utf8 NOT NULL COMMENT '分类名称'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`id`, `title`) VALUES
(1, '大红包'),
(2, '中红包'),
(3, '小红包'),
(4, '餐饮消费'),
(5, '水电煤'),
(6, '其他支出'),
(7, '其他收入'),
(8, '项目经费'),
(9, '工资'),
(10, '股票收益');

-- --------------------------------------------------------

--
-- 表的结构 `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `course_number` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `term` varchar(50) NOT NULL,
  `credit` float NOT NULL,
  `teacher_number` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `course`
--

INSERT INTO `course` (`id`, `course_number`, `name`, `term`, `credit`, `teacher_number`) VALUES
(1, 'CS001', '计算机基础', '2022年春季学期', 3, '10001'),
(2, 'MA001', '高等数学', '2022年秋季学期', 4, '10003'),
(3, 'PH001', '大学物理', '2023年春季学期', 5, '10005'),
(4, 'CH001', '化学原理', '2023年秋季学期', 4.5, '10006'),
(5, 'LS001', '微生物学', '2024年春季学期', 3.5, '10012'),
(6, 'GE001', '地理学基础', '2024年秋季学期', 2.5, '10014'),
(7, 'MU001', '音乐鉴赏', '2025年春季学期', 1.5, '10020'),
(8, 'PE001', '健美操', '2025年秋季学期', 2, '10009'),
(9, 'EN001', '英语听说', '2026年春季学期', 3, '10010'),
(10, 'HI001', '世界史', '2026年秋季学期', 2.5, '10017');

-- --------------------------------------------------------

--
-- 表的结构 `course_score`
--

CREATE TABLE `course_score` (
  `id` int(11) NOT NULL,
  `course_number` varchar(50) NOT NULL,
  `exam_name` varchar(50) NOT NULL,
  `student_number` varchar(50) NOT NULL,
  `teacher_number` varchar(50) NOT NULL,
  `score` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `course_score`
--

INSERT INTO `course_score` (`id`, `course_number`, `exam_name`, `student_number`, `teacher_number`, `score`) VALUES
(41, 'CS001', '期末考试', '202200001', '10001', 90),
(42, 'MA001', '小测验', '202200002', '10003', 78),
(43, 'PH001', '期中考试', '202200003', '10005', 92),
(44, 'CH001', '实验报告', '202200004', '10006', 86.5),
(45, 'LS001', '论文评分', '202200005', '10012', 93),
(46, 'GE001', '小测验', '202200006', '10014', 76.5),
(47, 'MU001', '乐理测试', '202200007', '10020', 83.5),
(48, 'PE001', '期末考试', '202200008', '10009', 91),
(49, 'EN001', '听力考试', '202200009', '10010', 87.5),
(50, 'HI001', '期中考试', '202200010', '10017', 79),
(51, 'CS001', '期中考试', '202200011', '10001', 80),
(52, 'MA001', '大作业', '202200012', '10003', 83),
(53, 'PH001', '期末考试', '202200013', '10005', 95),
(54, 'CH001', '实验报告', '202200014', '10006', 88.5),
(55, 'LS001', '论文评分', '202200015', '10012', 96),
(56, 'GE001', '小测验', '202200016', '10014', 81.5),
(57, 'MU001', '乐理测试', '202200017', '10020', 89.5),
(58, 'PE001', '期中考试', '202200018', '10009', 88),
(59, 'EN001', '听力考试', '202200019', '10010', 91.5),
(60, 'HI001', '期末考试', '202200020', '10017', 85),
(61, 'MA001', '期末考试', '202200002', '10003', 89.5),
(62, 'MA001', '期中', '202200002', '10003', 89.5);

-- --------------------------------------------------------

--
-- 表的结构 `student`
--

CREATE TABLE `student` (
  `student_id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `gender` enum('男','女') NOT NULL,
  `birthdate` date NOT NULL,
  `avatarUrl` varchar(1024) DEFAULT NULL,
  `class` varchar(50) NOT NULL,
  `stu_number` varchar(256) NOT NULL,
  `stu_pwd` varchar(512) NOT NULL,
  `userRole` int(11) NOT NULL DEFAULT 0 COMMENT '管理员 - 1 教师 - 2 学生 - 3',
  `isDelete` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否删除'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `student`
--

INSERT INTO `student` (`student_id`, `name`, `gender`, `birthdate`, `avatarUrl`, `class`, `stu_number`, `stu_pwd`, `userRole`, `isDelete`) VALUES
('1', '赖晓裕', '男', '2003-02-01', 'https://w.wallhaven.cc/full/kw/wallhaven-kwzw8q.jpg', '一班', '', '', 0, 0),
('2', '1', '男', '0000-00-00', 'https://images.pexels.com/photos/2174974/pexels-photo-2174974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', '', '', '', 0, 0),
('202200001', '张三', '男', '2003-02-01', 'https://images.pexels.com/photos/2174974/pexels-photo-2174974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', '一班', '201900001', '81704876', 3, 1),
('202200002', '李四', '男', '2003-05-10', 'https://lmg.jj20.com/up/allimg/1115/100R1094020/21100P94020-1-1200.jpg', '二班', '201900002', '654321', 3, 0),
('202200003', '王五', '女', '2003-10-21', 'https://w.wallhaven.cc/full/1p/wallhaven-1pd1o9.jpg', '三班', '201900003', 'password', 3, 0),
('202200004', '赵六', '男', '2002-12-31', 'http://example.com/avatar4.jpg', '四班', '201900004', 'password', 3, 0),
('202200005', '刘七', '女', '2003-06-13', 'http://example.com/avatar5.jpg', '五班', '201900005', 'password', 3, 0),
('202200006', '陈八', '女', '2003-08-20', 'http://example.com/avatar6.jpg', '六班', '201900006', 'password', 3, 0),
('202200007', '张九', '男', '2003-09-15', 'http://example.com/avatar7.jpg', '七班', '201900007', 'password', 3, 0),
('202200008', '李十', '男', '2003-04-05', 'http://example.com/avatar8.jpg', '八班', '201900008', 'password', 3, 0),
('202200009', '王十一', '女', '2003-01-23', 'http://example.com/avatar9.jpg', '九班', '201900009', 'password', 3, 0),
('202200010', '赵十二', '男', '2003-11-11', 'http://example.com/avatar10.jpg', '十班', '201900010', 'password', 3, 0),
('202200011', '刘十三', '女', '2002-07-14', 'http://example.com/avatar11.jpg', '一班', '201900011', 'password', 3, 0),
('202200012', '陈十四', '男', '2003-03-18', 'http://example.com/avatar12.jpg', '二班', '201900012', 'password', 3, 0),
('202200013', '张十五', '女', '2002-11-20', 'http://example.com/avatar13.jpg', '三班', '201900013', 'password', 3, 0),
('202200014', '李十六', '男', '2003-06-27', 'http://example.com/avatar14.jpg', '四班', '201900014', 'password', 3, 0),
('202200015', '王十七', '女', '2002-12-25', 'http://example.com/avatar15.jpg', '五班', '201900015', 'password', 3, 0),
('202200016', '赵十八', '女', '2003-08-30', 'http://example.com/avatar16.jpg', '六班', '201900016', 'password', 3, 0),
('202200017', '刘十九', '男', '2003-05-07', 'http://example.com/avatar17.jpg', '七班', '201900017', 'password', 3, 0),
('202200018', '陈二十', '男', '2002-09-19', 'http://example.com/avatar18.jpg', '八班', '201900018', 'password', 3, 0),
('202200019', '张二十一', '女', '2003-02-14', 'http://example.com/avatar19.jpg', '九班', '201900019', 'password', 3, 0),
('202200020', '李二十二', '男', '2003-07-01', 'http://example.com/avatar20.jpg', '十班', '201900020', 'password', 3, 0),
('202200021', '王二十三', '女', '2003-10-07', 'http://example.com/avatar21.jpg', '一班', '201900021', 'password', 3, 0),
('202200022', '赵二十四', '男', '2003-09-02', 'http://example.com/avatar22.jpg', '二班', '201900022', 'password', 3, 0),
('202200023', '刘二十五', '女', '2003-03-30', 'http://example.com/avatar23.jpg', '三班', '201900023', 'password', 3, 0),
('202200024', '陈二十六', '男', '2002-08-16', 'http://example.com/avatar24.jpg', '四班', '201900024', 'password', 3, 0),
('202200025', '张二十七', '女', '2003-04-19', 'http://example.com/avatar25.jpg', '五班', '201900025', 'password', 3, 0),
('202200026', '李二十八', '男', '2003-11-28', 'http://example.com/avatar26.jpg', '六班', '201900026', 'password', 3, 0),
('202200027', '王二十九', '女', '2002-12-05', 'http://example.com/avatar27.jpg', '七班', '201900027', 'password', 3, 0);

-- --------------------------------------------------------

--
-- 表的结构 `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(191) CHARACTER SET utf8 NOT NULL,
  `email` varchar(191) CHARACTER SET utf8 NOT NULL,
  `phone` varchar(191) CHARACTER SET utf8 NOT NULL,
  `course` varchar(191) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `phone`, `course`) VALUES
(5, 'ABC', '1518318962@qq.com', '70244128', 'NBA'),
(6, 'Satyam', 'Satyam@qq.com', '43180598', 'NBA'),
(8, 'Satyam', 'Satyam@qq.com', '15816359704', 'NBA'),
(9, 'LAIXIAOYU', 'LAIXIAOYU@QQ.COM', '1518318962', 'NBA'),
(10, 'cba', '1518318962@qq.com', '15816359704', 'NBA'),
(13, 'cba', '1518318962@qq.com', '15816359704', 'acv'),
(16, 'React core technology and development in practice - coderwhy', '100025160236327@qq.com', '15816359704', 'acv'),
(18, 'AAA', '1518318962@qq.com', '15816359704', 'acv'),
(19, '赖晓裕', '1518318962@qq.com', '1518318962', 'NBA'),
(21, 'John Smith', 'john.smith@example.com', '123-456-7890', 'Mathematics'),
(22, 'Jane Doe', 'jane.doe@example.com', '555-555-5555', 'Biology'),
(23, 'David Lee', 'david.lee@example.com', '987-654-3210', 'Chemistry'),
(24, 'Samantha Green', 'samantha.green@example.com', '777-777-7777', 'History'),
(25, 'Michael Johnson', 'michael.johnson@example.com', '111-111-1111', 'English'),
(26, 'Emily Brown', 'emily.brown@example.com', '222-222-2222', 'Physics'),
(27, 'William Rodriguez', 'william.rodriguez@example.com', '333-333-3333', 'Computer Science'),
(28, 'Olivia Davis', 'olivia.davis@example.com', '444-444-4444', 'Psychology'),
(29, 'James Wilson', 'james.wilson@example.com', '666-666-6666', 'Sociology'),
(30, 'Ava Martinez', 'ava.martinez@example.com', '888-888-8888', 'Anthropology'),
(31, 'John Doe', 'john.doe@example.com', '1234567890', 'Mathematics'),
(32, 'Jane Smith', 'jane.smith@example.com', '0987654321', 'English'),
(33, 'Bob Johnson', 'bob.johnson@example.com', '5551234567', 'Science'),
(34, 'Alice Brown', 'alice.brown@example.com', '4449876543', 'History'),
(35, 'David Lee', 'david.lee@example.com', '1112223333', 'Art'),
(36, 'Samantha Kim', 'samantha.kim@example.com', '6667778888', 'Music'),
(37, 'Michael Chen', 'michael.chen@example.com', '9990001111', 'Physics'),
(38, 'Emily Miller', 'emily.miller@example.com', '7778889999', 'Chemistry'),
(39, 'Kevin Davis', 'kevin.davis@example.com', '3334445555', 'Biology'),
(40, 'Sophia Wilson', 'sophia.wilson@example.com', '2221110000', 'Geography'),
(41, '赖晓裕', '1518318962', '1518318962', '计算机');

-- --------------------------------------------------------

--
-- 表的结构 `teacher`
--

CREATE TABLE `teacher` (
  `job_number` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `gender` enum('男','女') NOT NULL,
  `birthdate` date NOT NULL,
  `major` varchar(50) NOT NULL,
  `position` varchar(50) NOT NULL,
  `avatarUrl` varchar(1024) DEFAULT NULL,
  `tch_number` varchar(256) NOT NULL,
  `tch_pwd` varchar(512) NOT NULL,
  `userRole` int(11) NOT NULL DEFAULT 0 COMMENT '管理员 - 1 教师 - 2 学生 - 3',
  `isDelete` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否删除'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `teacher`
--

INSERT INTO `teacher` (`job_number`, `name`, `gender`, `birthdate`, `major`, `position`, `avatarUrl`, `tch_number`, `tch_pwd`, `userRole`, `isDelete`) VALUES
('1', '赖晓裕', '男', '2003-02-01', '1', '11', 'https://pica.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b', '', '', 0, 0),
('10001', '王老师', '男', '1980-05-10', '计算机科学', '教授', 'https://w.wallhaven.cc/full/wy/wallhaven-wyppy7.jpg', '001', '10001', 2, 0),
('10002', '张老师', '女', '1975-07-20', '工商管理', '教授', 'http://example.com/avatar2.jpg', '002', '10002', 2, 0),
('10003', '李老师', '男', '1983-11-06', '数学', '助理研究员', 'http://example.com/avatar3.jpg', '003', '10003', 2, 0),
('10004', '赵老师', '女', '1978-09-15', '心理学', '副教授', 'http://example.com/avatar4.jpg', 'teacher_004', '74764893', 2, 0),
('10005', '陈老师', '男', '1981-01-30', '物理学', '教授', 'http://example.com/avatar5.jpg', 'teacher_005', 'password', 2, 0),
('10006', '刘老师', '女', '1979-12-25', '化学', '助理教授', 'http://example.com/avatar6.jpg', 'teacher_006', 'password', 2, 0),
('10007', '张老师', '男', '1982-08-18', '历史学', '讲师', 'http://example.com/avatar7.jpg', 'teacher_007', 'password', 2, 0),
('10008', '王老师', '女', '1976-06-05', '土木工程', '教授', 'http://example.com/avatar8.jpg', 'teacher_008', 'password', 2, 0),
('10009', '李老师', '男', '1980-04-15', '体育教育', '讲师', 'http://example.com/avatar9.jpg', 'teacher_009', 'password', 2, 0),
('10010', '赵老师', '女', '1984-02-03', '英语', '助理研究员', 'http://example.com/avatar10.jpg', 'teacher_010', 'password', 2, 0),
('10011', '陈老师', '男', '1982-12-20', '新闻传播学', '副教授', 'http://example.com/avatar11.jpg', 'teacher_011', 'password', 2, 0),
('10012', '张老师', '女', '1977-10-01', '生物医学工程', '教授', 'http://example.com/avatar12.jpg', 'teacher_012', 'password', 2, 0),
('10013', '李老师', '男', '1985-03-29', '哲学', '助理研究员', 'http://example.com/avatar13.jpg', 'teacher_013', 'password', 2, 0),
('10014', '赵老师', '女', '1979-09-09', '文学', '副教授', 'http://example.com/avatar14.jpg', 'teacher_014', 'password', 2, 0),
('10015', '陈老师', '男', '1981-06-21', '经济学', '讲师', 'http://example.com/avatar15.jpg', 'teacher_015', 'password', 2, 0),
('10016', '刘老师', '女', '1976-12-10', '信息管理', '教授', 'http://example.com/avatar16.jpg', 'teacher_016', 'password', 2, 0),
('10017', '张老师', '男', '1973-11-26', '环境科学与工程', '副教授', 'http://example.com/avatar17.jpg', 'teacher_017', 'password', 2, 0),
('10018', '王老师', '女', '1978-08-15', '计算机应用', '讲师', 'http://example.com/avatar18.jpg', 'teacher_018', 'password', 2, 0),
('10019', '李老师', '男', '1984-02-28', '法学', '助理教授', 'http://example.com/avatar19.jpg', 'teacher_019', 'password', 2, 0),
('10020', '赵老师', '女', '1977-05-22', '艺术学', '教授', 'http://example.com/avatar20.jpg', 'teacher_020', 'password', 2, 0);

--
-- 转储表的索引
--

--
-- 表的索引 `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_number` (`teacher_number`);

--
-- 表的索引 `course_score`
--
ALTER TABLE `course_score`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_number` (`student_number`),
  ADD KEY `teacher_number` (`teacher_number`);

--
-- 表的索引 `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `student_id` (`student_id`);

--
-- 表的索引 `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`job_number`),
  ADD UNIQUE KEY `job_number` (`job_number`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户编号', AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '收支编号', AUTO_INCREMENT=45;

--
-- 使用表AUTO_INCREMENT `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类编号', AUTO_INCREMENT=26;

--
-- 使用表AUTO_INCREMENT `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用表AUTO_INCREMENT `course_score`
--
ALTER TABLE `course_score`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- 使用表AUTO_INCREMENT `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- 限制导出的表
--

--
-- 限制表 `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`teacher_number`) REFERENCES `teacher` (`job_number`);

--
-- 限制表 `course_score`
--
ALTER TABLE `course_score`
  ADD CONSTRAINT `course_score_ibfk_1` FOREIGN KEY (`student_number`) REFERENCES `student` (`student_id`),
  ADD CONSTRAINT `course_score_ibfk_2` FOREIGN KEY (`teacher_number`) REFERENCES `teacher` (`job_number`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
