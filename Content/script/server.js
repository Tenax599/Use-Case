const express = require('express');
const app = express();
const request = require('request');

// 添加 CORS 头信息
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// 设置路由处理图片请求
app.get('/image', (req, res) => {
  // 获取图片的URL
  const imageUrl = req.query.imageUrl;

  if (!imageUrl) {
    return res.status(400).send('Missing imageUrl parameter');
  }

  // 对图片 URL 中的查询参数进行编码
  const encodedImageUrl = encodeURI(imageUrl);

  // 发起请求获取图片
  request.get({ url: encodedImageUrl, encoding: null }, (error, response, body) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }

    // 设置正确的 Content-Type 标头
    res.set('Content-Type', response.headers['content-type']);
    // 将请求的图片数据传输给客户端响应
    res.send(body);
  });
});

// 启动服务器
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});