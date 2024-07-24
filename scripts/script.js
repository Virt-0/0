document.addEventListener("DOMContentLoaded", function() {
  var menuToggle = document.getElementById("menuToggle");
  var menu = document.getElementById("menu");

  // Bắt sự kiện click vào hình ảnh để hiển thị/ẩn menu
  menuToggle.addEventListener("click", function() {
    menu.classList.toggle("show");
  });

  // Đóng menu khi click ra ngoài
  document.addEventListener("click", function(event) {
    var isClickInside = menu.contains(event.target) || menuToggle.contains(event.target);
    if (!isClickInside) {
      menu.classList.remove("show");
    }
  });
});