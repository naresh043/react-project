import React, { useEffect, useState, useMemo } from "react";
import styles from "../../Styles/About-css/CompletedCourses.module.css";
import LoadingSpinner from "../Common/LodingSpinneer";
import axiosInstance from "../../config/axiosConfig";

const CompletedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    const fetchCompletedCourses = async () => {
      try {
        const res = await axiosInstance.get(
          "/api/enrollments/me/completed-courses"
        );

        if (res.data?.success && Array.isArray(res.data.data)) {
          setCourses(res.data.data);
        } else {
          setCourses([]);
          console.warn("Unexpected API response:", res.data);
        }
      } catch (error) {
        console.error("Failed to fetch completed courses", error);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedCourses();
  }, []);

  // Get unique categories for filter dropdown
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(courses.map(course => course.category).filter(Boolean))];
    return uniqueCategories.sort();
  }, [courses]);

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           course.category?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (a.courseName || "").localeCompare(b.courseName || "");
        case "category":
          return (a.category || "").localeCompare(b.category || "");
        default:
          return 0;
      }
    });

    return filtered;
  }, [courses, searchTerm, selectedCategory, sortBy]);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Re-trigger the useEffect by calling the fetch function directly
    const fetchCompletedCourses = async () => {
      try {
        const res = await axiosInstance.get(
          "/api/enrollments/me/completed-courses"
        );

        if (res.data?.success && Array.isArray(res.data.data)) {
          setCourses(res.data.data);
        } else {
          setCourses([]);
          console.warn("Unexpected API response:", res.data);
        }
      } catch (error) {
        console.error("Failed to fetch completed courses", error);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedCourses();
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
        <p className={styles.loadingText}>Loading your completed courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <h3 className={styles.errorTitle}>Oops! Something went wrong</h3>
        <p className={styles.errorMessage}>{error}</p>
        <button className={styles.retryButton} onClick={handleRetry}>
          Try Again
        </button>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyIcon}>🎓</div>
        <h3 className={styles.emptyTitle}>No Completed Courses Yet</h3>
        <p className={styles.emptyMessage}>
          Start learning and complete your first course to see it here!
        </p>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>
          <span className={styles.titleIcon}>🏆</span>
          Completed Courses
          <span className={styles.courseCount}>({courses.length})</span>
        </h1>
        <hr className={styles.titleDivider} />
      </div>

      <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>

        <div className={styles.filtersContainer}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="name">Sort by Name</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>
      </div>

      {filteredAndSortedCourses.length === 0 ? (
        <div className={styles.noResultsContainer}>
          <div className={styles.noResultsIcon}>🔍</div>
          <h3 className={styles.noResultsTitle}>No courses found</h3>
          <p className={styles.noResultsMessage}>
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className={styles.container}>
          {filteredAndSortedCourses.map((course, index) => (
            <div 
              className={styles.card} 
              key={course._id || `${course.courseName}-${index}`}
              style={{ animationDelay: `${(index % 6) * 0.1}s` }}
            >
              <div className={styles.completedBadge}>
                <span className={styles.checkmark}>✓</span>
                <span>COMPLETED</span>
              </div>
              
              {course.courseLogo ? (
                <img
                  src={course.courseLogo}
                  alt={`${course.courseName || "Course"} logo`}
                  className={styles.logo}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              
              <div 
                className={styles.defaultLogo}
                style={{ display: course.courseLogo ? 'none' : 'flex' }}
              >
                📚
              </div>

              <h3 className={styles.name}>
                {course.courseName || "Untitled Course"}
              </h3>
              
              {course.category && (
                <p className={styles.category}>{course.category}</p>
              )}
              
              <div className={styles.cardActions}>
                {course.courseLink ? (
                  <a
                    href={course.courseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    <span>View Course</span>
                    <span className={styles.linkIcon}>→</span>
                  </a>
                ) : (
                  <div className={styles.noLinkPlaceholder}>
                    Course Completed
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedCourses;