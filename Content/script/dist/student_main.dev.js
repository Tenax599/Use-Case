"use strict";

var userId = sessionStorage.getItem('user_id') || localStorage.getItem('user_id');
var userRole = sessionStorage.getItem('user_role') || localStorage.getItem('user_role');
console.log(userId, userRole);
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
  var response;
  return regeneratorRuntime.async(function fetchStudentList$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(axios.get(url.student.fetch, {
            params: {
              search_query: searchQuery,
              records_per_page: recordsPerPage,
              page: currentPage,
              userId: userId,
              userRole: userRole
            },
            dataType: "json"
          }));

        case 3:
          response = _context.sent;
          populateStudentList(response.data.students);
          populatePaginationLinks(response.data.total_pages, currentPage);
          console.log(response.data);
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function populateStudentList(students) {
  var $studentList = $("#student-list");
  $studentList.empty();

  if (students.length === 0) {
    $studentList.append("<tr><td colspan='6'>No results found.</td></tr>");
  } else {
    students.forEach(function (student) {
      var studentRow = "\n          <tr>\n            <td>".concat(student.student_id, "</td>\n            <td>").concat(student.student_name, "</td>\n            <td>").concat(student.course_name, "</td>\n            <td>").concat(student.score, "</td>\n            <td>").concat(student.exam_name, "</td>\n            <td>").concat(student.term, "</td>\n            <td>").concat(student.credit, "</td>\n          </tr>\n        ");
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