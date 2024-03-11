$(document).ready(function() {
  // 监听保存按钮的点击事件
  $('#saveStudentBtn').on("click", function() {
    // 获取表单数据
    var course_number = $('input[name=course_number]').val();
    var exam_name = $('input[name=exam_name]').val();
    var student_number = $('input[name=student_number]').val();
    var teacher_number = $('input[name=teacher_number]').val();
    var score = $('input[name=score]').val();

    console.log(course_number,exam_name,student_number,teacher_number,score);

    // 发送 AJAX 请求
    $.ajax({
      type: 'POST',
      url: url.teacher.add, // 替换为实际的 PHP 文件路径
      data: {
        course_number: course_number,
        exam_name: exam_name,
        student_number: student_number,
        teacher_number: teacher_number,
        score: score,
      },
      success: function(response) {
          location.reload(); // 刷新页面
      },
      error: function(jqXHR, status, error) {
        console.error(status + ': ' + error);
      }
    });
  });
});

