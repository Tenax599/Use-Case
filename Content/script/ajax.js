function ajax({ url, type, data }) {
	let user = getCurrentUser();
	data.userid = user?.id;
    return new Promise((res, rej) => {
        $.ajax({
            url: url,
            type: type,
            data: data,
            success: function (data) {
                res(data);
            },
            error: function (err) {
                rej(err);
            }
        });
    });
}