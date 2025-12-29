// components/PaymentSuccessModal.jsx
import Lottie from "lottie-react";
import successAnim from "../../assets/lottie/payment-success.json";
import "../../Styles/Common-css/paymentSuccess.css";

const PaymentSuccessModal = ({ open, onClose, onGoToCourse }) => {
  if (!open) return null;

  return (
    <div className="payment-overlay">
      <div className="payment-modal">
        <Lottie
          animationData={successAnim}
          loop={false}
          className="success-lottie"
        />

        <h2>Payment Successful 🎉</h2>
        <p>You are successfully enrolled in this course.</p>

        <div className="modal-actions">
          <button onClick={onGoToCourse} className="primary-btn">
            Go to Course
          </button>
          <button onClick={onClose} className="secondary-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
