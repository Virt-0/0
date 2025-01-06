// Fetch dữ liệu từ file database.json
let appsData = [];

// Tải dữ liệu từ database.json
fetch('../s_database/data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    appsData = data.apps;
    console.log("Data loaded:", appsData);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

// Lấy các phần tử DOM
const searchInput = document.getElementById('searchInput');
const suggestionsContainer = document.getElementById('suggestions');

// Lắng nghe sự kiện nhập vào thanh tìm kiếm
searchInput.addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase();
  suggestionsContainer.innerHTML = ''; // Xóa gợi ý cũ

  // Tìm các ứng dụng phù hợp với query
  if (appsData.length === 0) {
    console.warn("Data not loaded yet");
    return;
  }

  const suggestions = appsData.filter(app => 
    app.name.toLowerCase().includes(query) || 
    app.description.toLowerCase().includes(query)
  );

  // Hiển thị các gợi ý
  suggestions.forEach(app => {
    const suggestionDiv = document.createElement('div');
    suggestionDiv.className = 'suggestion';

    // Thêm hình ảnh và nội dung
    const appImage = document.createElement('img');
    appImage.src = app.image || 'https://via.placeholder.com/50'; // Sử dụng ảnh mặc định nếu không có ảnh
    appImage.alt = app.name;
    appImage.style.width = '50px';
    appImage.style.height = '50px';
    appImage.style.marginRight = '10px';

    const appText = document.createElement('span');
    appText.textContent = `${app.name} - ${app.description.slice(0, 50)}...`;

    suggestionDiv.appendChild(appImage);
    suggestionDiv.appendChild(appText);

    suggestionDiv.addEventListener('click', () => displayAppDetails(app));
    suggestionsContainer.appendChild(suggestionDiv);
  });
});

// Hàm tạo trang chi tiết ứng dụng từ template
function displayAppDetails(app) {
  // Tạo trang HTML từ template
  const newWindow = window.open('', '_blank');
  
  // Lấy nội dung template từ file appTemplate.html
  fetch('../other/appTemplate.html')
    .then(response => response.text())  // Chuyển nội dung thành text
    .then(template => {
      // Thay thế các placeholder trong template bằng dữ liệu thực tế
      const filledTemplate = template
        .replace('{{APP_NAME}}', app.name)
        .replace('{{APP_DESCRIPTION}}', app.description)
        .replace('{{APP_LINK}}', app.link)
        .replace('{{APP_IMAGE}}', app.image || 'https://via.placeholder.com/150'); // Ảnh mặc định nếu không có ảnh

      // Chèn template vào cửa sổ mới
      newWindow.document.write(filledTemplate);
    })
    .catch(error => {
      console.error('Error loading template:', error);
    });
}
