var userId = sessionStorage.getItem('user_id') || localStorage.getItem('user_id');
var userRole = sessionStorage.getItem('user_role') || localStorage.getItem('user_role');

console.log(userId, userRole)

$(document).ready(function () {
    const recordsPerPage = getParameterByName("records-per-page") || 20;
    const currentPage = getParameterByName("page") || 1;
    let searchQuery = "";

    // Fetch student list on page load
    fetchStudentList(searchQuery, recordsPerPage, currentPage);

    // Search form submit event
    $("#search-form").on("submit", function (e) {
      e.preventDefault();
      searchQuery = $("#search-query").val();
      fetchStudentList(searchQuery, recordsPerPage, 1);
    });

    // Fetch students with pagination
    $(document).on("click", ".page-link", function (e) {
      e.preventDefault();
      const page = $(this).data("page");
      fetchStudentList(searchQuery, recordsPerPage, page);
    });
  });
  
  async function fetchStudentList(searchQuery, recordsPerPage, currentPage) {
    try {
      const response = await axios.get(url.teacher.fetch, {
        params: {
          search_query: searchQuery,
          records_per_page: recordsPerPage,
          page: currentPage,
          userId: userId,
          userRole: userRole
        },
        dataType: "json",
      });
  
      populateStudentList(response.data.students);
      populatePaginationLinks(response.data.total_pages, currentPage);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  function populateStudentList(students) {
    const $studentList = $("#student-list");
    $studentList.empty();
    if (students.length === 0) {
      $studentList.append("<tr><td colspan='6'>No results found.</td></tr>");
    } else {
      students.forEach((student) => {
        const studentRow = `
          <tr>
            <td>${student.job_number}</td>
            <td>${student.teacher_name}</td>
            <td>${student.student_id}</td>
            <td>${student.student_name}</td>
            <td>${student.major}</td>
            <td>${student.course_number}</td>
            <td>${student.course_name}</td>
            <td>${student.score}</td>
            <td>
              <button type="button" name="edit_student" data-student-id="${student.student_number}" class="btn btn-success btn-sm editStudentBtn">编辑</button>
            </td>
          </tr>
        `;
        $studentList.append(studentRow);
      });
    }
  }
  
  function populatePaginationLinks(totalPages, currentPage) {
    const $paginationLinks = $("#pagination-links");
    $paginationLinks.empty();
    for (let i = 1; i <= totalPages; i++) {
      const active = i == currentPage ? "active" : "";
      const pageLink = `<li class="page-item ${active}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
      $paginationLinks.append(pageLink);
    }
  }
  
  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  