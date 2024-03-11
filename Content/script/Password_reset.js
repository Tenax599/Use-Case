$(document).ready(function () {
$("#student-list").on("click",".resetStudentBtn", function() {
    var studentId = $(this).data('student-id');
    // console.log(studentId);

        $.ajax({
            type: "POST",
            url: url.reset,
            data: {studentId: studentId},
            success: function(response) {
                console.log(response);
                // 刷新页面
                location.reload();
            },
            error: function (err) {
                console.log(err )
              },
        });
    });
});