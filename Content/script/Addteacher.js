$(document).ready(function() {
  // 监听保存按钮的点击事件
  $('#saveStudentBtn').on("click", function() {
    // 获取表单数据
    var job_number = $('input[name=job_number]').val();
    var name = $('input[name=name]').val();
    var gender = $('input[name=gender]').val();
    var birthdate = $('input[name=birthdate]').val();
    var major = $('input[name=major]').val();
    var position = $('input[name=position]').val();
    var avatarUrl = $('input[name=avatarUrl]').val();

    console.log(job_number,name,gender,birthdate,major,position,avatarUrl);
    // 发送 AJAX 请求
    $.ajax({
      type: 'POST',
      url: url.teacherAdmin.add, // 替换为实际的 PHP 文件路径
      data: {
        job_number: job_number,
        name: name,
        gender: gender,
        birthdate: birthdate,
        major: major,
        position: position,
        avatarUrl: avatarUrl,
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

