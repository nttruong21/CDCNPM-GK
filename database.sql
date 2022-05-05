CREATE DATABASE CDCNPM_GK
USE CDCNPM_GK
CREATE TABLE Products
(
	id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	name NVARCHAR(255),
	size int ,
	price bigint ,
	image nvarchar(255) ,
	discount int NULL,
	description NVARCHAR(255),
	information nvarchar(1000),
	slug NVARCHAR(255)
)

CREATE TABLE Bills
(
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	recipientName nvarchar(255),
	recipientAddress nvarchar(255),
	recipientPhone nvarchar(255),
	status int,
	createdAt date,
	note nvarchar(255),
	totalPrice bigint
)

CREATE TABLE BillDetails
(
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	billId int ,
	productId int ,
	quantity int ,
	price bigint ,
)

CREATE TABLE CartDetails
(
	id INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
	productId INT,
	price BIGINT
)

ALTER TABLE BillDetails
ADD FOREIGN KEY (billId) REFERENCES Bills(id)
ON DELETE CASCADE
ON UPDATE CASCADE

ALTER TABLE BillDetails
ADD FOREIGN KEY (productId) REFERENCES Products(id)
ON DELETE CASCADE
ON UPDATE CASCADE

ALTER TABLE CartDetails
ADD FOREIGN KEY (productId) REFERENCES Products(id)
ON DELETE CASCADE
ON UPDATE CASCADE

INSERT INTO Products VALUES
('NIKE PHANTOM GT ACADEMY TF CK8470-400abc', 40, 1550000, 'product-1.png', 10, 
N'Nổi bật với chất liệu da mềm đem lại cảm giác bóng chân thực nhất. Thiết kế thân giày hình lượn sóng hỗ trợ tối đa cho những pha chạm bóng kỹ thuật của bạn', 
N'Dòng sản phẩm dành cho bề mặt sân cỏ nhân tạo (Đế TF);Phân khúc:Academy (Tầm trung);Upper:Da tổng hợp;Đế giày:Được làm từ chất liệu cao su cao cấp;Đinh giày:Các đinh cao su hình chữ nhật, xếp chồng chéo với nhau. Theo đánh giá của nhiều người chơi thì những đinh TF hình chữ nhật lần này giúp đôi giày có thể trụ vững hơn trên sân;Độ ôm chân:Ôm vừa;Thiên hướng:Dứt điểm nhiều, kỹ thuật, khống chế bóng;Bộ sưu tập:Nike Spectrum Pack',
'nike-phantom-gt-academy-tf-ck8470-400'),

('NIKE PHANTOM GT ACADEMY TF CK8470-303', 39, 1550000, 'product-2.png',42, 
N'Nổi bật với chất liệu da mềm đem lại cảm giác bóng chân thực nhất. Thiết kế thân giày hình lượn sóng hỗ trợ tối đa cho những pha chạm bóng kỹ thuật của bạn',
N'Dòng sản phẩm dành cho bề mặt sân cỏ nhân tạo (Đế TF);Phân khúc:Academy (Tầm trung);Upper:Da tổng hợp;Đế giày:Được làm từ chất liệu cao su cao cấp;Đinh giày:Các đinh cao su hình chữ nhật, xếp chồng chéo với nhau. Theo đánh giá của nhiều người chơi thì những đinh TF hình chữ nhật lần này giúp đôi giày có thể trụ vững hơn trên sân;Độ ôm chân:Ôm vừa;Thiên hướng:Dứt điểm nhiều, kỹ thuật, khống chế bóng;Bộ sưu tập:Nike Spectrum Pack',
'nike-phantom-gt-academy-tf-ck8470-303'),

('NIKE REACT TIEMPO LEGEND 9 PRO TF DA1192-075', 40, 2590000, 'product-3.png', 0, 
N'Nổi bật với chất liệu da mềm đem lại cảm giác bóng chân thực nhất. Thiết kế thân giày hình lượn sóng hỗ trợ tối đa cho những pha chạm bóng kỹ thuật của bạn',
N'Dòng sản phẩm dành cho bề mặt sân cỏ nhân tạo (Đế TF);Phân khúc:Academy (Tầm trung);Upper:Da tổng hợp;Đế giày:Được làm từ chất liệu cao su cao cấp;Đinh giày:Các đinh cao su hình chữ nhật, xếp chồng chéo với nhau. Theo đánh giá của nhiều người chơi thì những đinh TF hình chữ nhật lần này giúp đôi giày có thể trụ vững hơn trên sân;Độ ôm chân:Ôm vừa;Thiên hướng:Dứt điểm nhiều, kỹ thuật, khống chế bóng;Bộ sưu tập:Nike Spectrum Pack',
'nike-react-tiempo-legend-9-pro-tf-da1192-075')