// components/PaymentSuccessPopup.jsx
import Lottie from "lottie-react";
import successAnim from "../../assets/lottie/payment-success.json";
import "../../Styles/Common-css/paymentSuccess.css";

const PaymentSuccessPopup = ({
  open,
  receipt,
  onDashboard,
  onDownload,
}) => {
  if (!open) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <Lottie
          animationData={successAnim}
          loop={false}
          className="popup-lottie"
        />

        <h2>Payment Successful 🎉</h2>
        <p>You are successfully enrolled</p>

        {/* 🧾 Receipt Section */}
        <div className="receipt-box">
          <div><span>Course</span><span>{receipt.courseName}</span></div>
          <div><span>Amount</span><span>₹{receipt.amount}</span></div>
          <div><span>Payment ID</span><span>{receipt.paymentId}</span></div>
          <div><span>Order ID</span><span>{receipt.orderId}</span></div>
          <div><span>Date</span><span>{receipt.date}</span></div>
        </div>

        {/* 🎯 Actions */}
        <div className="popup-actions">
          <button onClick={onDashboard} className="primary-btn">
            Go to Dashboard
          </button>

          <button onClick={onDownload} className="secondary-btn">
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPopup;
