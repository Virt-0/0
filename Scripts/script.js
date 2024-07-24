document.addEventListener("DOMContentLoaded", function() {
  // Phần mã menu
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

  // Phần mã nút ẩn khi cuộn trang
  var button = document.getElementById('hideButton');

  // Hàm kiểm tra vị trí cuộn
  function checkScroll() {
    // Nếu cuộn lên trên cùng (hoặc gần đầu trang)
    if (window.scrollY < 100) {
      button.classList.add('hidden'); // Thêm lớp 'hidden' để ẩn nút
    } else {
      button.classList.remove('hidden'); // Gỡ bỏ lớp 'hidden' để hiện nút
    }
  }

  // Thực thi khi cuộn trang
  window.addEventListener('scroll', checkScroll);

  // Thực thi ngay khi tải trang để xác định trạng thái nút ban đầu
  checkScroll();
});