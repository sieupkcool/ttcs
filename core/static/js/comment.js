$(document).ready(function () {
  $("#post-button").click(function (e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit

    var comment_content = $("#postcmt").val();

    // Gửi yêu cầu AJAX đến server để tạo comment
    $.ajax({
      type: "POST",
      url: window.location.href, // Sử dụng URL hiện tại để gửi yêu cầu
      data: {
        csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
        postcmt: comment_content,
      },
      success: function (response) {
        // Xử lý phản hồi từ server
        if (response.success) {
          // Nếu comment được tạo thành công, bạn có thể thực hiện các hành động cần thiết ở đây, ví dụ như hiển thị thông báo
          // Thêm HTML của comment mới vào trang
          $(".content").append(response.new_comment_html);
          // Xóa nội dung của textarea sau khi đã tạo comment thành công
          $("#postcmt").val("");
          // Sau đó có thể thêm comment mới vào DOM mà không cần tải lại trang
        } else {
          alert("Failed to create comment.");
        }
      },
      error: function (xhr, errmsg, err) {
        // Xử lý lỗi nếu có
        alert("Error: " + errmsg);
      },
    });
  });
});
