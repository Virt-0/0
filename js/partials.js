document.addEventListener("DOMContentLoaded", function () {
    // Tạo lớp overlay (màn hình đen) và thêm vào body
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)"; // Màu đen với độ mờ
    overlay.style.zIndex = "9999";
    overlay.style.opacity = "1";  // Bắt đầu với độ mờ hoàn toàn
    overlay.style.transition = "opacity 0.5s ease-out";  // Hiệu ứng mờ dần

    document.body.appendChild(overlay);  // Thêm overlay vào body

    // Hiệu ứng làm mờ dần
    setTimeout(function () {
        overlay.style.opacity = "0";  // Làm mờ overlay sau 0.1s
    }, 100); // Bắt đầu sau 100ms khi DOM đã tải xong

    // Sau khi overlay mờ dần, xóa overlay khỏi DOM
    setTimeout(function () {
        overlay.remove();
    }, 500);  // Sau 0.5s (khi hiệu ứng mờ hoàn tất)

    // Hàm chung để tải và chèn nội dung
    function loadPartial(filePath) {
        return fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Không thể tải ${filePath}`);
                }
                return response.text();
            });
    }

    // Lấy đường dẫn hiện tại của trang (với đường dẫn đầy đủ)
    const currentPath = window.location.pathname;

    // Tải và chèn các phần tử vào một phần tử duy nhất (load)
    Promise.all([
        loadPartial('../partials/header.html'),
        loadPartial('../partials/nav.html'),
        loadPartial('../partials/footer.html')
    ])
    .then(([headerData, navData, footerData]) => {
        const loadElement = document.getElementById("load");

        if (loadElement) {
            // Chèn nội dung vào load
            loadElement.innerHTML = headerData + navData + footerData;

            // Cập nhật Tiêu đề Trang vào h1 trong header
            const titleElement = loadElement.querySelector('#header h1');  // Chọn phần tử <h1> trong #header
            const pageTitle = document.title;  // Lấy tiêu đề của trang hiện tại

            // Nếu tìm thấy phần tử <h1>, cập nhật nội dung của nó
            if (titleElement) {
                titleElement.innerText = pageTitle; // Cập nhật nội dung h1 bằng tiêu đề của trang
            }

            // Thêm phần đánh dấu active cho nav
            const navLinks = loadElement.querySelectorAll("#nav a");
            navLinks.forEach((link) => {
                let linkHref = link.getAttribute("href");

                if (linkHref.startsWith("../")) {
                    linkHref = linkHref.replace("../", "/");
                }

                if (linkHref && currentPath.includes(linkHref)) {
                    const img = link.querySelector("img");
                    if (img) {
                        img.classList.add("active");
                    }
                }
            });
        }
    })
    .catch(error => {
        console.error('Có lỗi xảy ra khi tải hoặc chèn nội dung:', error);
    });
});