import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-dom-confetti";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import img from './images/logo.jpg';
import seal from './images/seal2.png';
import bgImage from './images/certrificate3.jpg'; // ✅ Background image

const Certificate = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [error, setError] = useState(false);
  const courseId = window.location.pathname.split("/")[2];
  const [course, setCourse] = useState({
    course_name: "",
    instructor: "",
    price: null,
    description: "",
    y_link: "",
    p_link: "",
  });

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }

    async function fetchUserDetails() {
      try {
        const response = await  fetch(`http://localhost:8080/api/users/${id}`);
        if (!response.ok) throw new Error("Failed to fetch user details.");
        const data = await response.json();
        setUserDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError(true);
      }
    }

    async function fetchCourse() {
      try {
        const response = await fetch(`http://localhost:8080/api/courses/${courseId}`);
        if (!response.ok) throw new Error("Failed to fetch course data.");
        const fetchedCourse = await response.json();
        setCourse(fetchedCourse);
      } catch (err) {
        console.error("Error fetching course data:", err);
        setError(true);
      }
    }
    fetchCourse();
    fetchUserDetails();
  }, [authToken, navigate, id, courseId]);

  const generateCertificateNumber = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const currentDate = formatDate(new Date());
  const certificateNumber = generateCertificateNumber();

  const leftConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 80,
    elementCount: 270,
    dragFriction: 0.1,
    duration: 4000,
    stagger: 3,
    width: "10px",
    height: "10px",
    colors: ["#3498db", "#e74c3c", "#27ae60"],
  };

  const rightConfig = {
    angle: 90,
    spread: 180,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.1,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    colors: ["#3498db", "#e74c3c", "#27ae60"],
  };

  const [pdfDownloading, setPdfDownloading] = useState(false);

  const handleDownloadPDF = () => {
    setPdfDownloading(true);
    const certificateElement = document.getElementById("certificate");

    if (certificateElement) {
      html2canvas(certificateElement).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, width, height);
        pdf.save("certificate.pdf");
        setPdfDownloading(false);
      });
    } else {
      console.error("Certificate element not found.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(to right, rgb(240, 161, 23),rgb(127, 192, 242)",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <Confetti active={!loading} config={leftConfig} />
      <Confetti active={!loading} config={rightConfig} />

      {loading ? (
        <p style={{ textAlign: "center", fontSize: "20px", color: "#888" }}>
          Loading...
        </p>
      ) : (
        <div
          id="certificate"
          style={{
            maxWidth: "1080px",
            height:"706px",
            margin: "0 auto",
            padding: "40px",
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            textAlign: "center",
            backdropFilter: "blur(8px)",
            borderImage: "linear-gradient(45deg, #3498db, #e74c3c) 1",
          }}
        >
          <img
            src={img}
            alt="Logo"
            style={{
              width: "500x",
              height: "80px",
              marginTop: "20px",
              marginLeft: "40px",
              marginBottom: "20px",
              borderRadius: "0%",
              padding: "5px",
              float: "left",
              marginRight: "20px",
            }}
          />
          <h1 style={{ color: "#ff5a08", fontSize: "65px",textAlign:"center",marginTop:"125px", marginBottom: "25px",fontFamily:" 'UnifrakturCook', 'Old English Text MT', serif" }}>
            Certificate of Completion
          </h1>
          <p style={{ fontSize: "30px", color: "#1c1c1c",fontFamily: "Times New Roman" }}>
            This certificate is awarded to
          </p>
          <p
            style={{
              fontSize: "35px",
              fontFamily: "Times New Roman",
              fontWeight: "600",
              color: "#040b8a",
              margin: "10px 0",
            }}
          >
            {userDetails.username}
          </p>
          <p style={{ fontSize: "30px", color: "#1c1c1c",fontFamily: "Times New Roman" }}>
            has successfully completed the course
          </p>
          <p
            style={{
              fontSize: "30px",
              color: "#f51d28",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            {course.course_name.length < 10
              ? course.course_name + " Tutorial"
              : course.course_name}
          </p>
          <p style={{ color: "#1c1c1c", fontSize: "20px" }}>
            Issued on {currentDate}
          </p>
          <p style={{ color: "#1c1c1c", fontSize: "18px" ,marginTop:"2" }}>
            Certificate ID: <strong>{certificateNumber}</strong>
          </p>
          <img
            src={seal}
            alt="Seal"
            style={{
              width: "200px",
              height: "200px",
              marginTop: "-10px",
            }}
          />
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={handleDownloadPDF}
          style={{
            padding: "12px 30px",
            fontSize: "18px",
            background: "#2980b9",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.background = "#1c5980")}
          onMouseOut={(e) => (e.target.style.background = "#2980b9")}
        >
          {pdfDownloading ? "Downloading..." : "Download Certificate as PDF"}
        </button>
      </div>
    </div>
  );
};

export default Certificate;
