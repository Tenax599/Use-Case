// 监听表单提交事件
$('#loginForm').on('submit', async function (event) {
    event.preventDefault();

    let username = $('#username').val(),
        password = $('#password').val();

    try {
        const response = await $.post(url.login, { username, password });
        console.log(response)
        const result = response;


        if (result.success) {
            alert('登录成功');
            window.location.href = result.redirectUrl; // 在回调函数中进行跳转
        } else {
            alert('登录失败：' + result.message);
        }
    } catch (error) {
        console.error(error);
        alert('登录失败：服务器错误');
    }
});