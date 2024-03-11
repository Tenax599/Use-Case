"use strict";

var http = require('http');

var app = require('./app'); // 创建 HTTP 服务器并将 Express 应用程序作为请求处理程序


var server = http.createServer(app); // 启动服务器

server.listen(3001, function () {
  console.log('Server is running on port 3000');
});