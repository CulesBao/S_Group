window.onload = function() {
    var soHienTai = 1; // Biến số hiện tại, bắt đầu từ 1
    var soDuocHienThi = 20; // Số được hiển thị trên màn hình

    // Hàm để hiển thị số mới và thay thế số cũ
    function hienThiSoMoi() {
        // Kiểm tra nếu số hiện tại lớn hơn số được hiển thị thì không làm gì cả
        if (soHienTai <= soDuocHienThi) {
            var soDaHienThi = document.getElementById('so');
            if (soDaHienThi) {
                soDaHienThi.textContent = soHienTai;
            } else {
                // Tạo một phần tử mới là một thẻ <p> để hiển thị số mới
                var phanTuMoi = document.createElement("p");
                phanTuMoi.id = 'so';
                phanTuMoi.classList.add('number');
                // Đặt nội dung của phần tử mới là số hiện tại
                phanTuMoi.textContent = soHienTai;
                // Thêm phần tử mới vào trong thẻ <body> của trang web
                document.body.appendChild(phanTuMoi);
            }
            soHienTai++;
            setTimeout(hienThiSoMoi, 100);
        }
    }
    hienThiSoMoi();
};

