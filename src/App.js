import React, { useState } from "react";
import "./App.css";

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [phrase1, setPhrase1] = useState("");
  const [phrase2, setPhrase2] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("video")) {
      setVideoFile(file);
    } else {
      alert("Please select a valid video file.");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("video")) {
      setVideoFile(file);
    } else {
      alert("Please drop a valid video file.");
    }
  };

  const handleSubmit = () => {
    if (!videoFile && !/^https?:\/\//.test(phrase1)) {
      alert("Please provide a video file or a valid URL.");
      return;
    }
    alert(
      `Submitted!\nVideo: ${
        videoFile ? videoFile.name : phrase1
      }\nPhrase 1: ${phrase1}\nPhrase 2: ${phrase2}`
    );
  };

  return (
    <div className="container">
      <div
        className={`drag-drop-area ${dragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("videoInput").click()}
      >
        {videoFile ? (
          <>
            <span className="success-message">
              Video Uploaded: {videoFile.name}
            </span>
            <span className="checkmark">&#10003;</span>
          </>
        ) : (
          <span>Drag & Drop a Video File or Click to Browse</span>
        )}
        <input
          type="file"
          id="videoInput"
          accept="video/*"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
      </div>

      <input
        type="text"
        className="input-box"
        id="phrase1"
        value={phrase1}
        onChange={(e) => setPhrase1(e.target.value)}
        placeholder="Enter first phrase"
      />
      <input
        type="text"
        className="input-box"
        id="phrase2"
        value={phrase2}
        onChange={(e) => setPhrase2(e.target.value)}
        placeholder="Enter second phrase"
      />

      <button className="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default App;
