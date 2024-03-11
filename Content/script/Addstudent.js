$(document).ready(function() {
  // 监听保存按钮的点击事件
  $('#saveStudentBtn').on("click", function() {
    // 获取表单数据
    var student_id = $('input[name=student_id]').val();
    var class_name = $('input[name=class]').val();
    var name = $('input[name=name]').val();
    var gender = $('input[name=gender]').val();
    var birthdate = $('input[name=birthdate]').val();

    console.log(student_id,class_name,name,gender,birthdate);

    // 发送 AJAX 请求
    $.ajax({
      type: 'POST',
      url: url.studentAdmin.add, // 替换为实际的 PHP 文件路径
      data: {
        student_id: student_id,
        class: class_name,
        name: name,
        gender: gender,
        birthdate: birthdate,
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

