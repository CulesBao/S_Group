Chương Backend:
Buổi 1:
  Link Notion Nhân soạn: https://coal-result-753.notion.site/Sgroup-BE-31bdc47b4cde43c8a365b8f4da89367f
  Link câu hỏi: https://www.notion.so/Sgroup-BE-3-5-eea550dadab44e15a1b5807692177ba9?pvs=4
  2.   Client - Server: Giống như Front-end và Back-end. Client gửi request đến server, sau đó server xử lí (có thể thông qua database) rồi respone lại cho Client.
       Client Server Architecture: Một Server có thể phục vụ nhiều Client một lúc
           Định nghĩa: Client Server Architecture là một mạng nơi mà Client yêu cầu nguồn tài nguyên gì đó và Server cung cấp
           Vai trò của Client: Thiết bị hoặc phần mền gửi yêu cầu dữ liệu
           Vài trò của Server: Hệ thống hoặc phần mền cung cấp tài nguyên tới Client
           Phương thức giao tiếp: Sử dụng phương thức HTTP/HTTPS
  3.   API. Web API. Sự khác biệt:
            API: Dùng để giao tiếp (FE và BE gọi nhau qua API)
            Web API: Như là API, được sử dụng trên môi trường mạng. Giúp mã hóa data gửi đi và trả về
  4.   HTTP/HTTPS: Notion
        HTTP: Request URL, Request Code, Status
        Khái niệm: PORT giống như là cửa nhà. Có 2^32 PORT. CRUD là Create, Read, Update, Delete: 4 tác vụ cơ bản nhất của 1 đối tượng
        Trong CRUD:
            POST: Gửi những dữ liệu đòi hỏi bảo mật. Khối lượng dữ liệu gửi đi lớn
            GET: Đưa lên/Lấy về data không đòi hỏi bảo mật. Khối lượng dữ liệu gửi đi nhỏ
            PUT: Cập nhật. Thường sử dụng PUT hơn PATCH
            PATCH: Cập nhật
        HTTP: Chạy PORT :80
        HTTPS: Chạy PORT :443
  ? Khi nào thì HTTPS mã hóa mật khẩu, khi nào thì không
  ? Tìm hiểu về PORT, IP
  ? Câu 3
  ? Phân biệt Web Server và Server Backend.
  ?Apache, Tomcat
  6. Restful API
      Là quy chuẩn dể tuân theo, là một quy tắc được nhiều người dùng
  7. Server side rendering và Client side rendering
      SSR:  Thích hợp với search egine vì nhanh
      CSR:  Lấy server về để xử lí => Chậm hơn
      Chuộng Client Side hơn vì: Máy khách ngày càng khỏe hơn. Xử lí được nhiều tác vụ nặng
      
