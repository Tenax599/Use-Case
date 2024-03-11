"use strict";

$(document).ready(function () {
  $('#student-form').submit(function (event) {
    event.preventDefault(); // Intercept default form submission behavior

    var form = $(this); // Get the form object

    var formData = form.serialize(); // Gather form data

    $.ajax({
      url: 'save_student.php',
      // PHP file that handles insertion into database
      type: 'POST',
      data: formData,
      success: function success(response) {
        // Handle successful response (e.g. display success message)
        console.log(response);
      },
      error: function error(xhr, status, _error) {
        // Handle error response (e.g. display error message)
        console.log(xhr.responseText);
      }
    });
  });
});