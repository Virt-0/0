document.addEventListener("DOMContentLoaded", function() {
    // Tạo lớp che
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.style.position = 'fixed'; // Đặt lớp phủ cố định
    loadingOverlay.style.top = '0';
    loadingOverlay.style.left = '0';
    loadingOverlay.style.width = '100%';
    loadingOverlay.style.height = '100%';
    loadingOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Lớp nền mờ
    loadingOverlay.style.zIndex = '1000'; // Đặt lớp phủ trên cùng
    loadingOverlay.style.transition = 'opacity 1s ease'; // Thay đổi thời gian chuyển đổi opacity
    loadingOverlay.style.opacity = '1'; // Đặt độ mờ ban đầu

    // Tạo spinner
    const spinner = document.createElement('div');
    spinner.style.border = '8px solid #f3f3f3';
    spinner.style.borderTop = '8px solid #3498db';
    spinner.style.borderRadius = '50%';
    spinner.style.width = '50px';
    spinner.style.height = '50px';
    spinner.style.animation = 'spin 2s linear infinite';
    spinner.style.margin = 'auto'; // Canh giữa spinner
    spinner.style.position = 'absolute';
    spinner.style.bottom = '3%';
    spinner.style.left = '5%';
    
    loadingOverlay.appendChild(spinner); // Thêm spinner vào lớp phủ

    // Thêm lớp che vào body
    document.body.appendChild(loadingOverlay);

    // CSS animation cho spinner và hiệu ứng fade
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Lớp che có hiệu ứng fade-in */
        #loading-overlay {
            opacity: 1;
            transition: opacity 2s ease;
        }

        #loading-overlay.loaded {
            opacity: 0;
        }
    `;
    document.head.appendChild(styleSheet);

    // Hiển thị lớp che với fade-in khi trang bắt đầu tải
    setTimeout(() => {
        loadingOverlay.classList.add('loaded');
    }, 100);

    // Hàm load nội dung phần tử
    function loadPartial(id, url) {
        loadingOverlay.style.display = 'block'; // Hiển thị lớp phủ ngay khi bắt đầu tải
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                const element = document.getElementById(id);
                if (element) {
                    element.innerHTML = data; // Cập nhật nội dung
                } else {
                    console.error(`Element with id '${id}' not found`);
                }
            })
            .catch(error => {
                console.error(`Error loading ${url}:`, error);
                const element = document.getElementById(id);
                if (element) {
                    element.innerHTML = '<p>Error loading content. Please try again later.</p>';
                }
            })
            .finally(() => {
                loadingOverlay.style.opacity = '0'; // Giảm độ mờ xuống 0 khi hoàn tất
                setTimeout(() => {
                    loadingOverlay.style.display = 'none'; // Ẩn lớp phủ sau khi đã mờ
                }, 1000); // Thời gian chờ để hiệu ứng chuyển đổi hoàn tất
            });
    }

    // Tải tất cả nội dung
    Promise.all([
        loadPartial('header-container', '../partials/header.html'),
        loadPartial('footer-container', '../partials/footer.html')
    ]).then(() => {
        console.log('All partials loaded successfully');
    }).catch(error => {
        console.error('One or more partials failed to load:', error);
    });
});