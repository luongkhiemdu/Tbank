Trong ngữ cảnh Internet Computer với Motoko, khai báo stable thường là stable var trong actor.

Định nghĩa ngắn gọn

stable var là biến được giữ lại dữ liệu qua lần nâng cấp canister.
Sau khi bạn deploy upgrade, dữ liệu trong stable var vẫn còn.
Chỉ các kiểu dữ liệu stable-compatible mới dùng được với stable var.
Cách khai báo và cách dùng

Khai báo trực tiếp trong actor bằng stable var.
Dùng cho dữ liệu trạng thái cần sống lâu: số dư, cấu hình, lịch sử giao dịch, danh sách user.
Nếu cấu trúc runtime không ổn định qua upgrade (ví dụ map/hashmap dạng object), thì lưu bản snapshot ổn định trong stable var và khôi phục lại sau upgrade.
Ví dụ tối giản:
actor {
  stable var balance : Nat = 0;

  public func deposit(x : Nat) : async Nat {
    balance += x;
    balance
  };

  public query func getBalance() : async Nat {
    balance
  };
}
Mẫu phổ biến khi có cấu trúc phức tạp

Runtime: dùng cấu trúc tiện thao tác (map).
Stable: lưu mảng cặp key-value.
preupgrade: convert map -> mảng stable.
postupgrade: convert mảng stable -> map.

Khi nào nên dùng

Dữ liệu bắt buộc không mất sau upgrade.
Metadata nghiệp vụ cần tính liên tục.
Trạng thái mà khôi phục từ nguồn ngoài rất tốn hoặc không khả thi.

Khi nào không nên dùng

Dữ liệu tạm, cache, có thể tính lại.
Dữ liệu rất lớn nhưng bạn không có chiến lược migration rõ ràng.
Lưu trực tiếp kiểu không stable-compatible.
Logic phụ thuộc chặt vào layout cũ mà không có versioning schema.

Thực hành tốt

Luôn có kế hoạch migration theo version dữ liệu.
Giữ schema stable đơn giản, tách phần runtime ra khỏi phần persistence.
Test upgrade trên local trước khi lên production.
Với dữ liệu lớn, tránh một lần chuyển đổi quá nặng trong upgrade.