document.addEventListener("DOMContentLoaded", function() {
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
