"use strict";

// 监听表单提交事件
$('#loginForm').on('submit', function _callee(event) {
  var username, password, response, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          event.preventDefault();
          username = $('#username').val(), password = $('#password').val();
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap($.post(url.login, {
            username: username,
            password: password
          }));

        case 5:
          response = _context.sent;
          console.log(response);
          result = response;

          if (result.success) {
            alert('登录成功');
            window.location.href = result.redirectUrl; // 在回调函数中进行跳转
          } else {
            alert('登录失败：' + result.message);
          }

          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](2);
          console.error(_context.t0);
          alert('登录失败：服务器错误');

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 11]]);
});