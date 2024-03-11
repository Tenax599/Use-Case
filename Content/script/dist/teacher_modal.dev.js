"use strict";

$(document).ready(function () {
  // 监听编辑按钮点击事件
  $("#student-list").on("click", ".editStudentBtn", function () {
    // console.log('aaaaaaaa')
    // return
    var teacherId = $(this).data('studentId'); // console.log(teacherId);
    // console.log($(this));
    // 发送AJAX请求以获取学生信息

    $.ajax({
      type: "GET",
      url: url.teacher.edit,
      // 用于获取学生信息的PHP文件
      data: {
        student_number: teacherId
      },
      dataType: "json",
      success: function success(response) {
        console.log(response); // 填充模态框表单

        $("#studentScore").val(response.score); // 其他表单字段填充...

        $("#exam_name").val(response.exam_name);
        $("#student_number").val(response.student_number); // 显示模态框

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
      url: url.teacher.update,
      // 用于更新学生信息的PHP文件
      data: {
        exam: $("#exam_name").val(),
        score: $("#studentScore").val(),
        student_number: $("#student_number").val()
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