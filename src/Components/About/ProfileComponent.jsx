import React, { useState, useEffect } from "react";
import "../../Styles/About-css/ProfileComponent.css"

function ProfileComponent() {
  // Mock user data based on your schema with additional profile information
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    photoURL:
      "https://t3.ftcdn.net/jpg/07/24/59/76/240_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg",
    createdAt: "2024-01-15T10:30:00.000Z",
    updatedAt: "2024-07-20T14:45:00.000Z",
    // Additional profile information
    phone: "+1 234 567 8900",
    location: "New York, USA",
    bio: "Passionate learner exploring new technologies and skills. Always eager to take on challenging courses and expand my knowledge base.",
    dateOfBirth: "1995-03-15",
    gender: "Male",
    profession: "Software Developer",
    experience: "3 years",
    interests: [
      "Web Development",
      "Machine Learning",
      "UI/UX Design",
      "Data Science",
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      twitter: "https://twitter.com/johndoe",
    },
    stats: {
      coursesEnrolled: 12,
      coursesCompleted: 8,
      certificatesEarned: 6,
      studyHours: 245,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    setEditData(userData);
  }, [userData]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(userData);
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
    const newInterests = [...editData.interests];
    newInterests[index] = value;
    setEditData((prev) => ({
      ...prev,
      interests: newInterests,
    }));
  };

  const addInterest = () => {
    setEditData((prev) => ({
      ...prev,
      interests: [...prev.interests, ""],
    }));
  };

  const removeInterest = (index) => {
    const newInterests = editData.interests.filter((_, i) => i !== index);
    setEditData((prev) => ({
      ...prev,
      interests: newInterests,
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-avatar-section">
            <img
              src={isEditing ? editData.photoURL : userData.photoURL}
              alt="Profile"
              className="profile-avatar"
            />
            {isEditing && (
              <input
                type="url"
                value={editData.photoURL}
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
                value={editData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="edit-input name-input"
              />
            ) : (
              <h1 className="profile-name">{userData.name}</h1>
            )}

            <p className="profile-email">
              <i className="fas fa-envelope"></i>
              {isEditing ? (
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="edit-input"
                />
              ) : (
                userData.email
              )}
            </p>

            <p className="profile-profession">
              <i className="fas fa-briefcase"></i>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.profession}
                  onChange={(e) =>
                    handleInputChange("profession", e.target.value)
                  }
                  className="edit-input"
                />
              ) : (
                userData.profession
              )}
            </p>
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
              <h3>{userData.stats.coursesEnrolled}</h3>
              <p>Courses Enrolled</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="stat-info">
              <h3>{userData.stats.coursesCompleted}</h3>
              <p>Completed</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-certificate"></i>
            </div>
            <div className="stat-info">
              <h3>{userData.stats.certificatesEarned}</h3>
              <p>Certificates</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="stat-info">
              <h3>{userData.stats.studyHours}</h3>
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
                    value={editData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="edit-input"
                  />
                ) : (
                  <span>{userData.phone}</span>
                )}
              </div>

              <div className="info-item">
                <label>Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="edit-input"
                  />
                ) : (
                  <span>{userData.location}</span>
                )}
              </div>

              <div className="info-item">
                <label>Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    className="edit-input"
                  />
                ) : (
                  <span>{formatDate(userData.dateOfBirth)}</span>
                )}
              </div>

              <div className="info-item">
                <label>Gender</label>
                {isEditing ? (
                  <select
                    value={editData.gender}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    className="edit-input"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                ) : (
                  <span>{userData.gender}</span>
                )}
              </div>

              <div className="info-item">
                <label>Experience</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.experience}
                    onChange={(e) =>
                      handleInputChange("experience", e.target.value)
                    }
                    className="edit-input"
                  />
                ) : (
                  <span>{userData.experience}</span>
                )}
              </div>

              <div className="info-item">
                <label>Member Since</label>
                <span>{formatDate(userData.createdAt)}</span>
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
                value={editData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="edit-textarea"
                rows="4"
              />
            ) : (
              <p className="bio-text">{userData.bio}</p>
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
                  {editData.interests.map((interest, index) => (
                    <div key={index} className="interest-edit-item">
                      <input
                        type="text"
                        value={interest}
                        onChange={(e) =>
                          handleInterestChange(index, e.target.value)
                        }
                        className="edit-input"
                      />
                      <button
                        onClick={() => removeInterest(index)}
                        className="remove-interest-btn"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                  <button onClick={addInterest} className="add-interest-btn">
                    <i className="fas fa-plus"></i> Add Interest
                  </button>
                </div>
              ) : (
                <div className="interests-list">
                  {userData.interests.map((interest, index) => (
                    <span key={index} className="interest-tag">
                      {interest}
                    </span>
                  ))}
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
                    value={editData.socialLinks.linkedin}
                    onChange={(e) =>
                      handleSocialLinkChange("linkedin", e.target.value)
                    }
                    className="edit-input"
                  />
                ) : (
                  <a
                    href={userData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {userData.socialLinks.linkedin}
                  </a>
                )}
              </div>

              <div className="social-item">
                <i className="fab fa-github"></i>
                <label>GitHub</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={editData.socialLinks.github}
                    onChange={(e) =>
                      handleSocialLinkChange("github", e.target.value)
                    }
                    className="edit-input"
                  />
                ) : (
                  <a
                    href={userData.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {userData.socialLinks.github}
                  </a>
                )}
              </div>

              <div className="social-item">
                <i className="fab fa-twitter"></i>
                <label>Twitter</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={editData.socialLinks.twitter}
                    onChange={(e) =>
                      handleSocialLinkChange("twitter", e.target.value)
                    }
                    className="edit-input"
                  />
                ) : (
                  <a
                    href={userData.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {userData.socialLinks.twitter}
                  </a>
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
