document.addEventListener("DOMContentLoaded", function() {
    // Lấy tất cả phần tử <select> trên trang
    const versionSelects = document.querySelectorAll('.version-select');

    versionSelects.forEach(select => {
        const downloadLink = select.closest('.download-section').querySelector('#download-link'); // Chỉnh sửa từ #downloadlink thành #download-link
        
        // Lấy giá trị data-default từ thẻ <select>
        const defaultVersion = select.getAttribute('data-default');
        const defaultOption = Array.from(select.options).find(option => option.value === defaultVersion);
        
        // Đặt liên kết tải xuống cho phiên bản mặc định
        if (defaultOption) {
            downloadLink.href = defaultOption.getAttribute('data-link');
        }

        // Lắng nghe sự kiện khi người dùng thay đổi phiên bản
        select.addEventListener('change', function() {
            const selectedOption = select.options[select.selectedIndex];
            const selectedLink = selectedOption.getAttribute('data-link');
            
            // Cập nhật liên kết tải xuống
            downloadLink.href = selectedLink;
        });
    });
});