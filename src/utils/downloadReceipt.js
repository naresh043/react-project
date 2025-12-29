// utils/downloadReceipt.js
import jsPDF from "jspdf";

export const downloadReceipt = (receipt) => {
  if (!receipt) return;

  const doc = new jsPDF();

  // 🧾 Header
  doc.setFontSize(18);
  doc.text("E-Learning App – Payment Receipt", 20, 20);

  doc.setFontSize(11);
  doc.text("Thank you for your purchase!", 20, 28);

  // Divider
  doc.line(20, 32, 190, 32);

  // 📄 Receipt details
  doc.setFontSize(12);
  doc.text(`Receipt ID: ${receipt.receiptId || "-"}`, 20, 45);
  doc.text(`Course: ${receipt.courseName || "-"}`, 20, 55);
  doc.text(`Amount Paid: ₹${receipt.amount}`, 20, 65);
  doc.text(`Payment ID: ${receipt.paymentId}`, 20, 75);
  doc.text(`Order ID: ${receipt.orderId}`, 20, 85);
  doc.text(
    `Date: ${new Date(receipt.date).toLocaleString("en-IN")}`,
    20,
    95
  );

  // Footer
  doc.setFontSize(10);
  doc.text(
    "This is a system-generated receipt. No signature required.",
    20,
    120
  );

  // 💾 Save
  doc.save(`receipt-${receipt.paymentId}.pdf`);
};
