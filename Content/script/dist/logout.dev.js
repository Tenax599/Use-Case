"use strict";

var logoutBtn = document.querySelector('#logout-btn');
logoutBtn.addEventListener('click', function () {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url.logout);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        location.href = 'login.html';
      } else {
        console.error('Logout failed:', xhr.responseText);
      }
    }
  };

  xhr.send();
});