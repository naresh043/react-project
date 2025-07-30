import React, { useState } from "react";
import styles from "../Styles/accountSettings/AccountSettings.module.css";
import axiosInstance from "../config/axiosConfig";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AccountSettings = () => {
  const [newPassword, setNewPassword] = useState("");
  const [emailConfirm, setEmailConfirm] = useState(""); // New state
  const userData = useSelector((store) => store.user);


  const navigate=useNavigate()

  const handlePasswordChange = async () => {
    if (!newPassword.trim()) {
      toast.error("Please enter a new password.");
      return;
    }

    try {
      await axiosInstance.put("/api/users/forgot-password", {
        password: newPassword,
      });
      toast.success("Password updated successfully.");
      setNewPassword("");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update password."
      );
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) {
      return;
    }

    try {
      await axiosInstance.delete("/api/users/me");
      toast.success("Account deleted successfully.");
      navigate("/signup")
      // Optional: Logout or redirect
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to delete account."
      );
    }
  };

  const isEmailMatch = emailConfirm.trim() === userData?.email;

  return (
    <div className={styles.container}>
      <h2>Account Settings</h2>

      <div className={styles.section}>
        <h3>Change Password</h3>
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handlePasswordChange}>Change Password</button>
      </div>

      <div className={styles.section}>
        <h3>Danger Zone</h3>
        <input
          type="email"
          placeholder="Confirm your email to delete"
          value={emailConfirm}
          onChange={(e) => setEmailConfirm(e.target.value)}
        />
        <button
          className={styles.danger}
          onClick={handleDeleteAccount}
          disabled={!isEmailMatch}
          style={{ opacity: isEmailMatch ? 1 : 0.5, cursor: isEmailMatch ? "pointer" : "not-allowed" }}
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
