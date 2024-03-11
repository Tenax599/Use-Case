"use strict";

$(document).ready(function () {
  // 监听编辑按钮点击事件
  $("#student-list").on("click", ".editStudentBtn", function () {
    // console.log('aaaaaaaa')
    // return
    var studentId = $(this).data('student-id'); // console.log(studentId);
    // 发送AJAX请求以获取学生信息

    $.ajax({
      type: "GET",
      url: url.Admin.edit,
      // 用于获取学生信息的PHP文件
      data: {
        student_id: studentId
      },
      dataType: "json",
      success: function success(response) {
        console.log(response); // 填充模态框表单

        $("#studentId").val(response.student_id);
        $("#Student_name").val(response.name);
        $("#Student_gender").val(response.gender);
        $("#Student_class").val(response["class"]);
        $("#Student_avatar").val(response.avatarUrl); // 其他表单字段填充...
        // 显示模态框

        var editStudentModal = new bootstrap.Modal('#editStudentModal', {
          keyboard: false
        });
        editStudentModal.show();
      },
      error: function error(err) {
        console.log(err);
      }
    });
  }); // 监听更新按钮点击事件

  $("#updateStudentBtn").on("click", function () {
    // console.log($("#editStudentForm").serialize())
    // return
    // 发送AJAX请求以更新学生信息
    $.ajax({
      type: "POST",
      url: url.Admin.update,
      // 用于更新学生信息的PHP文件
      data: {
        studentId: $("#studentId").val(),
        name: $("#Student_name").val(),
        gender: $("#Student_gender").val(),
        "class": $("#Student_class").val(),
        avatar: $("#Student_avatar").val()
      },
      success: function success(response) {
        // console.log(response)
        // return
        // 关闭模态框
        $("#editStudentModal").modal("hide"); // 刷新页面，显示更新后的信息

        location.reload();
      },
      error: function error(jqXHR, textStatus, errorThrown) {
        alert("Error: " + textStatus + " " + errorThrown);
      }
    });
  });
});