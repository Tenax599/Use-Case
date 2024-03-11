// 获取页面中的图像标签
const image = document.getElementById("my_image");

// 定义图片数组和当前显示的图片索引
const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
let currentIndex = 0;

// 定义定时器，每5秒钟切换一张图片
setInterval(() => {
  // 切换到下一张图片
  currentIndex = (currentIndex + 1) % images.length;
  
  // 更新图像标签的src属性以显示新图片
  image.src = images[currentIndex];
}, 5000);