import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function RegistrationForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phno: "",
    password: "",
    dob: "",
    gender: "",
    location: "",
    profession: "",
    linkedin_url: "",
    github_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log("Registration successful!");
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError("An error occurred during registration.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="registration-auth" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh" }}>
        <div className="registration-container" style={{ background: "#fff", padding: "40px 60px", borderRadius: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.2)", maxWidth: "850px", width: "100%" }}>
          <h2 style={{ textAlign: "center", marginBottom: "30px" }}>User Registration</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            
            {/* Row 1 */}
            <div style={{ display: "flex", gap: "5px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "0px" }}>Name:</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "0px" }}>Email Id:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
              </div>
            </div>

            {/* Row 2 */}
            <div style={{ display: "flex", gap: "5px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "0px" }}>Phone no:</label>
                <input type="tel" name="phno" value={formData.phno} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "0px" }}>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
              </div>
            </div>

            {/* Row 3 */}
            <div style={{ display: "flex", gap: "5px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "0px" }}>Date of Birth:</label>
                <input type="text" name="dob" value={formData.dob} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "0px" }}>Gender:</label>
                <input type="text" name="gender" value={formData.gender} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
              </div>
            </div>

            {/* Row 4 */}
            <div style={{ display: "flex", gap: "5px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "0px" }}>Location:</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "0px" }}>Profession:</label>
                <input type="text" name="profession" value={formData.profession} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
              </div>
            </div>

            {/* Row 5 */}
            <div style={{ display: "flex", gap: "5px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "0px" }}>LinkedIn URL:</label>
                <input type="text" name="linkedin_url" value={formData.linkedin_url} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "0px" }}>GitHub URL:</label>
                <input type="text" name="github_url" value={formData.github_url} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
              </div>
            </div>

            {error && <span style={{ color: "red", marginTop: "10px" }}>{error}</span>}

            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <button type="submit" style={{ padding: "10px 25px", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "5px" }}>
                Register
              </button>
            </div>
          </form>

          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <span>
              Already have an account? <Link to="/login">Login Here</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
