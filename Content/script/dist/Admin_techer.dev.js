"use strict";

$(document).ready(function () {
  var recordsPerPage = getParameterByName("records-per-page") || 20;
  var currentPage = getParameterByName("page") || 1;
  var searchQuery = ""; // Fetch student list on page load

  fetchStudentList(searchQuery, recordsPerPage, currentPage); // Search form submit event

  $("#search-form").on("submit", function (e) {
    e.preventDefault();
    searchQuery = $("#search-query").val();
    fetchStudentList(searchQuery, recordsPerPage, 1);
  }); // Fetch students with pagination

  $(document).on("click", ".page-link", function (e) {
    e.preventDefault();
    var page = $(this).data("page");
    fetchStudentList(searchQuery, recordsPerPage, page);
  });
});

function fetchStudentList(searchQuery, recordsPerPage, currentPage) {
  $.ajax({
    url: url.teacherAdmin.fetch,
    type: "GET",
    data: {
      search_query: searchQuery,
      records_per_page: recordsPerPage,
      page: currentPage
    },
    dataType: "json",
    success: function success(response) {
      populateStudentList(response.students);
      populatePaginationLinks(response.total_pages, currentPage);
      console.log(response);
    },
    error: function error(err) {
      console.log(err);
    }
  });
}

function populateStudentList(students) {
  var $studentList = $("#student-list");
  $studentList.empty();

  if (students.length === 0) {
    $studentList.append("<tr><td colspan='6'>No results found.</td></tr>");
  } else {
    students.forEach(function (student) {
      console.log(students);
      var studentRow = "\n                <tr>\n                    <td>".concat(student.student_id, "</td>\n                    <td>").concat(student.name, "</td>\n                    <td>").concat(student.gender, "</td>\n                    <td>").concat(student["class"], "</td>\n                    <td>").concat(student.birthdate, "</td>\n                    <td>").concat(student.stu_pwd, "</td>\n                    <td>").concat(student.avatarUrl, "</td>\n                    <td>\n                    <button type=\"button\" name=\"edit_student\" data-student-id=\"").concat(student.student_id, "\" class=\"btn btn-success btn-sm editStudentBtn\">\u7F16\u8F91</button>\n                    <button type=\"submit\" name=\"delete_student\" value=\"<?=$student['id'];?>\" class=\"btn btn-danger btn-sm\">Delete</button>\n                    <button type=\"button\" name=\"reset_password\" data-student-id=\"").concat(student.student_id, "\" class=\"btn btn-secondary btn-sm resetStudentBtn\">\u91CD\u7F6E\u5BC6\u7801</button>\n                    </td>\n                </tr>\n            ");
      $studentList.append(studentRow);
    });
  }
}

function populatePaginationLinks(totalPages, currentPage) {
  var $paginationLinks = $("#pagination-links");
  $paginationLinks.empty();

  for (var i = 1; i <= totalPages; i++) {
    var active = i == currentPage ? "active" : "";
    var pageLink = "<li class=\"page-item ".concat(active, "\"><a class=\"page-link\" href=\"#\" data-page=\"").concat(i, "\">").concat(i, "</a></li>");
    $paginationLinks.append(pageLink);
  }
}

function getParameterByName(name) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  var results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}