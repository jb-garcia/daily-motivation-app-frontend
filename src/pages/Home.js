import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
  
import Swal from "sweetalert2";


const Home = () => {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const navigate = useNavigate();


  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire({
          title: "Logged Out!",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          navigate("/login");
        });
      }
    });
  };
  

  // Emotion options with icons and colors
  const emotions = [
    { name: "Happy", icon: "😊", color: "#FFD700" },
    { name: "Sad", icon: "😢", color: "#4169E1" },
    { name: "Angry", icon: "😠", color: "#FF4500" },
    { name: "Fear", icon: "😨", color: "#800080" },
    { name: "Surprise", icon: "😲", color: "#32CD32" },
    { name: "Disgust", icon: "🤢", color: "#006400" }
  ];

  // Update date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Format date and time
  const formattedDate = dateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = dateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const fetchQuote = async (emotion) => {
    setSelectedEmotion(emotion);
    setLoading(true);
    try {
      const response = await axios.post("https://daily-motivation-backend-1.onrender.com/generate", {
        emotion: emotion
      });
      setQuote(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Failed to load quote. Please try again.");
    }
    setLoading(false);
  };


  return (




    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" 
         style={{ 
           background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
           padding: "20px"
         }}>

      <div className="card shadow-lg border-0 text-center" 
           style={{ 
             maxWidth: "700px", 
             borderRadius: "15px",
             transition: "all 0.3s ease"
           }}>

                 {/* Logout Button (Upper Right) */}
                 <div className="position-absolute top-0 end-0 p-3">
            <button className="btn btn-sm btn-danger" onClick={handleLogout}>
                Logout
            </button>
            </div>

        <div className="card-body p-5">
          <h3 className="mb-2 fw-bold" style={{ color: "#4a154b" }}>Mood-Based Motivation</h3>
          
          {/* Date and Time Display */}
          <div className="mb-3">
            <div className="badge bg-light text-dark p-2 mb-1" style={{ fontSize: "0.5rem" }}>
              {formattedDate}
            </div>
            <div className="badge bg-primary p-2" style={{ fontSize: "0.5rem" }}>
              {formattedTime}
            </div>
          </div>
          
          {/* Emotion prompt */}
          <p className="mb-3">How are you feeling today?</p>

          {/* Emotion buttons */}
          <div className="d-flex flex-wrap justify-content-center mb-3">
            {emotions.map((emotion) => (
              <button
                key={emotion.name}
                onClick={() => fetchQuote(emotion.name)}
                disabled={loading}
                className="btn btn-sm m-1"
                style={{
                  background: emotion.name === selectedEmotion ? emotion.color : "#f8f9fa",
                  color: emotion.name === selectedEmotion ? "white" : "#333",
                  borderRadius: "6px",
                  padding: "4px 8px",
                  fontSize: "0.8rem",
                  transition: "all 0.2s ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  border: "none"
                }}
              >
                <span style={{ fontSize: "0.9rem", marginRight: "3px" }}>{emotion.icon}</span>
                {emotion.name}
              </button>
            ))}
          </div>
          
          {/* Quote display */}
          <div className="p-4 mb-2 rounded" 
               style={{ 
                 minHeight: "150px", 
                 display: "flex", 
                 alignItems: "center", 
                 justifyContent: "center",
                 background: "rgba(0, 0, 0, 0.03)",
                 border: quote ? "1px solid rgba(0, 0, 0, 0.125)" : "none"
               }}>
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 text-muted">Finding the perfect words for you...</p>
              </div>
            ) : quote ? (
              <div>
                <p style={{ 
                  fontSize: "18px", 
                  fontStyle: "italic", 
                  margin: 0,
                  color: "#333"
                }}>{quote}</p>
                {selectedEmotion && (
                  <div className="mt-3">
                    <span className="badge" style={{ background: emotions.find(e => e.name === selectedEmotion)?.color }}>
                      {emotions.find(e => e.name === selectedEmotion)?.icon} {selectedEmotion}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted">Select an emotion to receive a personalized motivational quote...</p>
            )}
          </div>

           {quote && !loading && (
            <button 
              onClick={() => setQuote("")}
              className="btn btn-sm btn-outline-secondary mt-2"
            >
              Reset
            </button>
          )}
    
        </div>
      </div>
    </div>
  );
};

export default Home;
