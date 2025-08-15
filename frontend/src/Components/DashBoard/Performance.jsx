import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dstyle.css';
import { useNavigate } from 'react-router-dom';

const Performance = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  // Fetch enrolled courses
  useEffect(() => {
    async function fetchCourse() {
      try {
        const userId = localStorage.getItem("id");
        const response = await axios.get(`http://localhost:8080/api/learning/${userId}`);
        console.log("Enrolled Courses API Response:", response.data);
        
        // Ensure it's an array
        setEnrolledCourses(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching courses:", err); 
        setEnrolledCourses([]); // fallback to empty array
      }
    }
    fetchCourse();
  }, []);

  // Fetch performance data
  useEffect(() => {
    const userId = localStorage.getItem("id");
    fetch(`http://localhost:8080/api/assessments/perfomance/${userId}`)
      .then((res) => res.json())
      .then((data) => { 
        console.log("Performance API Response:", data);

        // Ensure it's an array before setting state
        if (Array.isArray(data)) {
          setPerformanceData(data);
        } else if (data && Array.isArray(data.performance)) {
          // If backend wraps it in an object like { performance: [...] }
          setPerformanceData(data.performance);
        } else {
          setPerformanceData([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching performance data:", err);
        setPerformanceData([]); // fallback
      });
  }, []);

  function certifiedUser(id) {
    navigate(`/certificate/${id}`);
  }

  return (
    <div className="performance-container" style={{ marginTop: '70px' }}>
      
      {/* Courses Enrolled */}
      <div style={{ marginBottom: '80px' }}>
        <h2 style={{ color: 'darkblue' }}>Courses Enrolled</h2>
        <table className="performance-table" style={{ width: '40%' }}>
          <thead>
            <tr>
              <th>Courses</th>
            </tr>
          </thead>
          <tbody>
            {enrolledCourses.length > 0 ? (
              enrolledCourses.map((data, index) => (
                <tr key={index}>
                  <td>{data.course_name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No courses enrolled</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <div>
        <h2 style={{ color: 'darkblue' }}>PERFORMANCE</h2>
        <table className="performance-table" style={{ marginBottom: '40px' }}>
          <thead>
            <tr>
              <th>Courses</th>
              <th>Progress</th>
              <th>Marks</th>
              <th>Certificate</th>
            </tr>
          </thead>
          <tbody>
            {performanceData.length > 0 ? (
              performanceData.map((data, index) => (
                <tr key={index}>
                  <td>{data.course?.course_name || "N/A"}</td>
                  <td className={data.marks !== 0 ? 'completed-status' : 'pending-status'}>
                    {data.marks !== 0 ? 'Completed' : 'Pending'}
                  </td>
                  <td>{data.marks ?? "N/A"}</td>
                  <td
                    className={data.marks !== 0 ? 'completed-certificate' : 'pending-certificate'}
                    onClick={() => data.marks !== 0 && certifiedUser(data.course?.id)}
                  >
                    {data.marks !== 0 ? 'Download Certificate' : 'Not Available'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No performance data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Performance;
