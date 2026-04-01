import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue: Float = 300;
  // currentValue :=300;
  stable var startTime = Time.now();
  // startTime := Time.now();
  Debug.print("Start time: " # debug_show(startTime));
  let id = 1234567890;
   
  // Debug.print(debug_show (currentValue));
public func topUp (amount : Float) {
  currentValue += amount;
  Debug.print(debug_show (currentValue));
};
// topUp();
//cho phép rút tiền
public func withdraw (amount : Float) {
  var tempValue : Float = currentValue - amount;
  if (tempValue >= 0) {
    currentValue -= amount;
    Debug.print(debug_show (currentValue));
  } else {
    Debug.print("Amount too large, CurrentValue less thanh Zero");
  }
};

public query func checkBalance() : async Float {
  return currentValue;
};

//decrease the currentValue by amount
 
public func compound () {
  let curentTime = Time.now();
  let timeElapsedNS = curentTime - startTime;
  let timeElapsedS = timeElapsedNS / 1000000000;
  currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS)) ; //tăng 1% mỗi giây
  startTime := curentTime; // reset start time after compounding
  Debug.print("Current value after compounding: " # debug_show(currentValue));
};

}