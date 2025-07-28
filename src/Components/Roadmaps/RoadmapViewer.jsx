// src/components/Roadmap/RoadmapViewer.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import "../../Styles/Roadmap-css/roadmapviewer.css"; // create if needed

const RoadmapViewer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roadmapUrl = searchParams.get("url");
  console.log(roadmapUrl)

  return (
    <div className="roadmap-viewer-container">
      {roadmapUrl ? (
        <iframe
          src={roadmapUrl}
          title="Roadmap Viewer"
          width="100%"
          height="90vh"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="no-roadmap-message">
          No roadmap URL provided.
        </div>
      )}
    </div>
  );
};

export default RoadmapViewer;
