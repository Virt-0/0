document.addEventListener("DOMContentLoaded", function() {
  var hideButton = document.getElementById("hideButton");
  var menu = document.getElementById("menu");
  var hamburger = document.getElementById("hamburger");

  // Ẩn nút cuộn lên khi ở gần đầu trang
  function toggleHideButton() {
    window.scrollY < 100 ? hideButton.classList.add("hidden") : hideButton.classList.remove("hidden");
  }
  window.addEventListener("scroll", toggleHideButton);
  toggleHideButton();
  
  // Hiển thị/ẩn menu khi nhấn vào nút hamburger
  hamburger.addEventListener("click", function() {
    menu.classList.toggle("visible");
  });

  // Tắt menu khi nhấn ra ngoài
  document.addEventListener("click", function(event) {
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
      menu.classList.remove("visible");
    }
  });

  // Danh sách thả xuống
  var dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(function(dropdown) {
    var dropdownContent = dropdown.querySelector(".dropdown-content");
    
    dropdown.addEventListener("click", function(event) {
      dropdownContent.classList.toggle("show");
      event.stopPropagation(); // Ngăn không cho sự kiện click truyền lên các phần tử cha
    });
  });

  // Tắt danh sách thả xuống khi nhấp ra ngoài
  document.addEventListener("click", function(event) {
    dropdowns.forEach(function(dropdown) {
      var dropdownContent = dropdown.querySelector(".dropdown-content");
      if (dropdownContent.classList.contains("show") && !dropdown.contains(event.target)) {
        dropdownContent.classList.remove("show");
      }
    });
  });
});