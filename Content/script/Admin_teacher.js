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

function fetchStudentList(searchQuery, recordsPerPage, currentPage) {
    $.ajax({
        url: url.teacherAdmin.fetch,
        type: "GET",
        data: {
            search_query: searchQuery,
            records_per_page: recordsPerPage,
            page: currentPage,
        },
        dataType: "json",
        success: function (response) {
            populateStudentList(response.students);
            populatePaginationLinks(response.total_pages, currentPage);
        console.log(response);
        },
        error: function (err) {
            console.log(err);
        },
    });
}

function populateStudentList(students) {
    const $studentList = $("#student-list");
    $studentList.empty();
    if (students.length === 0) {
        $studentList.append("<tr><td colspan='6'>No results found.</td></tr>");
    } else {
        students.forEach((student) => {
            console.log(students)
            const studentRow = `
                <tr>
                    <td>${student.job_number}</td>
                    <td>${student.name}</td>
                    <td>${student.gender}</td>
                    <td>${student.birthdate}</td>
                    <td>${student.major}</td>
                    <td>${student.position}</td>
                    <td>${student.tch_pwd}</td>
                    <td><img src="http://localhost:3000/image?imageUrl=${student.avatarUrl}" alt="Avatar"></td>
                    <td>
                    <button type="button" name="edit_student" data-student-id="${student.job_number}" class="btn btn-success btn-sm editStudentBtn">编辑</button>
                    <button type="submit" name="delete_student" value="<?=$student['id'];?>" class="btn btn-danger btn-sm">Delete</button>
                    <button type="button" name="reset_password" data-student-id="${student.job_number}" class="btn btn-secondary btn-sm resetStudentBtn">重置密码</button>
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

