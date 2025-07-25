import React, { useState, useEffect } from "react";
import "../../Styles/About-css/ProfileComponent.css";
import { useSelector } from "react-redux";
import axiosInstance from "../../config/axiosConfig";
import { format } from "date-fns";

function ProfileComponent() {
  const userData = useSelector((store) => store.user);
  const [isUser, setIsUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (userData) {
      const formattedUser = {
        ...userData,
        dateOfBirth: format(new Date(userData?.dateOfBirth), "yyyy-MM-dd"),
        interests: userData.interests || [],
        socialLinks: userData.socialLinks || {
          linkedin: "",
          github: "",
          twitter: "",
        },
      };

      setIsUser(formattedUser);
      setEditData(formattedUser);
    }
  }, [userData]);

  console.log(editData, "editing data");

  const handleEdit = () => {
    setIsEditing(true);
  };

  // Helper function to clean data before sending to backend
  const cleanDataForSubmission = (data) => {
    const cleanedData = { ...data };
    
    // Remove empty social links to avoid validation errors
    if (cleanedData.socialLinks) {
      Object.keys(cleanedData.socialLinks).forEach(key => {
        if (!cleanedData.socialLinks[key] || cleanedData.socialLinks[key].trim() === '') {
          delete cleanedData.socialLinks[key];
        }
      });
      
      // If no social links remain, remove the entire object
      if (Object.keys(cleanedData.socialLinks).length === 0) {
        delete cleanedData.socialLinks;
      }
    }
    
    // Remove empty photoURL to avoid validation errors
    if (cleanedData.photoURL && cleanedData.photoURL.trim() === '') {
      delete cleanedData.photoURL;
    }
    
    // Filter out empty interests
    if (cleanedData.interests) {
      cleanedData.interests = cleanedData.interests.filter(interest => 
        interest && interest.trim() !== ''
      );
    }
    
    return cleanedData;
  };

  const handleSave = async () => {
    try {
      const cleanedData = cleanDataForSubmission(editData);
      const response = await axiosInstance.patch(
        `/api/users/${userData?.id}`,
        cleanedData
      );
      console.log("Profile updated:", response);
      
      // Update the local state with the response data or cleaned data
      const updatedUser = response.data?.user || cleanedData;
      setIsUser(updatedUser);
      setEditData(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      // You might want to show a user-friendly error message here
    }
  };

  const handleCancel = () => {
    setEditData(isUser);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setEditData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const handleInterestChange = (index, value) => {
    const updatedInterests = [...(editData?.interests || [])];
    updatedInterests[index] = value;
    setEditData((prev) => ({
      ...prev,
      interests: updatedInterests,
    }));
  };

  const addInterest = () => {
    setEditData((prev) => ({
      ...prev,
      interests: [...(prev?.interests || []), ""],
    }));
  };

  const removeInterest = (index) => {
    const updated = (editData.interests || []).filter((_, i) => i !== index);
    setEditData((prev) => ({
      ...prev,
      interests: updated,
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!isUser) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-avatar-section">
            <img
              src={isUser?.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="profile-avatar"
              onError={(e) => {
                e.target.src = "/default-avatar.png";
              }}
            />
            {isEditing && (
              <input
                type="url"
                value={editData?.photoURL || ""}
                onChange={(e) => handleInputChange("photoURL", e.target.value)}
                placeholder="Profile Image URL"
                className="photo-url-input"
              />
            )}
          </div>

          <div className="profile-basic-info">
            {isEditing ? (
              <input
                type="text"
                value={editData?.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="edit-input name-input"
                placeholder="Your Name"
              />
            ) : (
              <h1 className="profile-name">{isUser?.name}</h1>
            )}

            <div className="profile-email">
              <i className="fas fa-envelope"></i>
              {isEditing ? (
                <input
                  type="email"
                  value={editData?.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="edit-input header-edit-input"
                  placeholder="your.email@example.com"
                />
              ) : (
                <span>{isUser?.email}</span>
              )}
            </div>

            <div className="profile-profession">
              <i className="fas fa-briefcase"></i>
              {isEditing ? (
                <input
                  type="text"
                  value={editData?.profession || ""}
                  onChange={(e) =>
                    handleInputChange("profession", e.target.value)
                  }
                  className="edit-input header-edit-input"
                  placeholder="Your Profession"
                />
              ) : (
                <span>{isUser?.profession}</span>
              )}
            </div>
          </div>

          <div className="profile-actions">
            {isEditing ? (
              <div className="edit-buttons">
                <button onClick={handleSave} className="save-btn">
                  <i className="fas fa-check"></i> Save
                </button>
                <button onClick={handleCancel} className="cancel-btn">
                  <i className="fas fa-times"></i> Cancel
                </button>
              </div>
            ) : (
              <button onClick={handleEdit} className="edit-btn">
                <i className="fas fa-edit"></i> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-book"></i>
            </div>
            <div className="stat-info">
              <h3>{isUser?.stats?.coursesEnrolled || 0}</h3>
              <p>Courses Enrolled</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="stat-info">
              <h3>{isUser?.stats?.coursesCompleted || 0}</h3>
              <p>Completed</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-certificate"></i>
            </div>
            <div className="stat-info">
              <h3>{isUser?.stats?.certificatesEarned || 0}</h3>
              <p>Certificates</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="stat-info">
              <h3>{isUser?.stats?.studyHours || 0}</h3>
              <p>Study Hours</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          {/* Personal Information */}
          <div className="profile-section">
            <h2 className="section-title">
              <i className="fas fa-user"></i>
              Personal Information
            </h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData?.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="edit-input"
                    placeholder="Your phone number"
                  />
                ) : (
                  <span>{isUser?.phone || "Not provided"}</span>
                )}
              </div>

              <div className="info-item">
                <label>Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData?.location || ""}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="edit-input"
                    placeholder="Your location"
                  />
                ) : (
                  <span>{isUser?.location || "Not provided"}</span>
                )}
              </div>

              <div className="info-item">
                <label>Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editData?.dateOfBirth || ""}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    className="edit-input"
                  />
                ) : (
                  <span>{formatDate(isUser?.dateOfBirth)}</span>
                )}
              </div>

              <div className="info-item">
                <label>Gender</label>
                {isEditing ? (
                  <select
                    value={editData?.gender || ""}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    className="edit-input"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                ) : (
                  <span>{isUser?.gender || "Not specified"}</span>
                )}
              </div>

              <div className="info-item">
                <label>Experience</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData?.experience || ""}
                    onChange={(e) =>
                      handleInputChange("experience", e.target.value)
                    }
                    className="edit-input"
                    placeholder="Your experience level"
                  />
                ) : (
                  <span>{isUser?.experience || "Not specified"}</span>
                )}
              </div>

              <div className="info-item">
                <label>Member Since</label>
                <span>{formatDate(isUser?.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="profile-section">
            <h2 className="section-title">
              <i className="fas fa-info-circle"></i>
              About Me
            </h2>
            {isEditing ? (
              <textarea
                value={editData?.bio || ""}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="edit-textarea"
                rows="4"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="bio-text">{isUser?.bio || "No bio available"}</p>
            )}
          </div>

          {/* Interests Section */}
          <div className="profile-section">
            <h2 className="section-title">
              <i className="fas fa-heart"></i>
              Interests
            </h2>
            <div className="interests-container">
              {isEditing ? (
                <div className="interests-edit">
                  {(editData?.interests || []).map((interest, index) => (
                    <div key={index} className="interest-edit-item">
                      <input
                        type="text"
                        value={interest}
                        onChange={(e) =>
                          handleInterestChange(index, e.target.value)
                        }
                        className="edit-input"
                        placeholder="Interest"
                      />
                      <button
                        onClick={() => removeInterest(index)}
                        className="remove-interest-btn"
                        type="button"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addInterest}
                    className="add-interest-btn"
                    type="button"
                  >
                    <i className="fas fa-plus"></i> Add Interest
                  </button>
                </div>
              ) : (
                <div className="interests-list">
                  {(isUser?.interests || []).length > 0 ? (
                    isUser.interests.map((interest, index) => (
                      <span key={index} className="interest-tag">
                        {interest}
                      </span>
                    ))
                  ) : (
                    <p>No interests added yet</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Social Links Section */}
          <div className="profile-section">
            <h2 className="section-title">
              <i className="fas fa-share-alt"></i>
              Social Links
            </h2>
            <div className="social-links">
              <div className="social-item">
                <i className="fab fa-linkedin"></i>
                <label>LinkedIn</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={editData?.socialLinks?.linkedin || ""}
                    onChange={(e) =>
                      handleSocialLinkChange("linkedin", e.target.value)
                    }
                    className="edit-input"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                ) : isUser?.socialLinks?.linkedin ? (
                  <a
                    href={isUser.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {isUser.socialLinks.linkedin}
                  </a>
                ) : (
                  <span>Not provided</span>
                )}
              </div>

              <div className="social-item">
                <i className="fab fa-github"></i>
                <label>GitHub</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={editData?.socialLinks?.github || ""}
                    onChange={(e) =>
                      handleSocialLinkChange("github", e.target.value)
                    }
                    className="edit-input"
                    placeholder="https://github.com/yourusername"
                  />
                ) : isUser?.socialLinks?.github ? (
                  <a
                    href={isUser.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {isUser.socialLinks.github}
                  </a>
                ) : (
                  <span>Not provided</span>
                )}
              </div>

              <div className="social-item">
                <i className="fab fa-twitter"></i>
                <label>Twitter</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={editData?.socialLinks?.twitter || ""}
                    onChange={(e) =>
                      handleSocialLinkChange("twitter", e.target.value)
                    }
                    className="edit-input"
                    placeholder="https://twitter.com/yourusername"
                  />
                ) : isUser?.socialLinks?.twitter ? (
                  <a
                    href={isUser.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {isUser.socialLinks.twitter}
                  </a>
                ) : (
                  <span>Not provided</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;