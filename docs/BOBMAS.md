Quy tắc BODMAS trong lập trình
BODMAS là quy tắc xác định thứ tự ưu tiên tính toán trong một biểu thức toán học. Trong lập trình, hầu hết các ngôn ngữ (kể cả Motoko) đều tuân theo quy tắc này.

Định nghĩa từng chữ cái:

Chữ	Tiếng Anh	Tiếng Việt
B	Brackets	Ngoặc -- tính trong ngoặc trước tiên
O	Orders	Lũy thừa / Căn bậc -- ví dụ: 2^3 = 8
D	Division	Phép chia
M	Multiplication	Phép nhân
A	Addition	Phép cộng
S	Subtraction	Phép trừ
Thứ tự ưu tiên (từ cao xuống thấp):
Ngoặc ( )
Lũy thừa ^ hoặc **
Nhân * và Chia / -- cùng mức, tính từ trái sang phải
Cộng + và Trừ - -- cùng mức, tính từ trái sang phải
Ví dụ minh họa:
Biểu thức: 3 + 2 * (4 - 1)^2

Thứ tự tính:

Ngoặc trước: (4 - 1) = 3
Lũy thừa: 3^2 = 9
Nhân: 2 * 9 = 18
Cộng: 3 + 18 = 21
Quy tắc này áp dụng trực tiếp trong Motoko cũng như JavaScript, Python, và hầu hết mọi ngôn ngữ lập trình.