import React, { useEffect, useState } from "react";
import "./dstyle.css";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal, message } from "antd";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [isDeleted, setDeleted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [cid, setCid] = useState(-1);

  const navigate = useNavigate();

  const fetchCourses = () => {
    fetch("http://localhost:8080/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => {
        console.error("Error fetching data:", err);
        message.error("Failed to fetch courses");
      });
  };

  useEffect(() => {
    fetchCourses();
    setDeleted(false);
  }, [isDeleted]);

  const showModal = (courseId) => {
    setCid(courseId);
    setOpenModal(true);
  };

  const handleOk = async () => {
    try {
      const res = await axios.post("http://localhost:8080/delete", {
        courseId: cid,
      });
      message.success("Course deleted successfully");
      setDeleted(true);
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Failed to delete course");
    } finally {
      setOpenModal(false);
      setCid(-1);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
    setCid(-1);
  };

  const editCourse = (courseId) => {
    navigate(`/editCourse/${courseId}`);
  };

  const addQuestions = (courseId) => {
    navigate(`/addquestions/${courseId}`);
  };

  const addCourse = () => {
    navigate("/addCourse");
  };

  return (
    <>
      <SideBar current={"courses"} />
      <section id="content">
        <Navbar />
        <main className="t">
          <div className="table-data" style={{ marginTop: "-10px" }}>
            <div className="order">
              <div id="course" className="todo">
                <div className="head" style={{ marginTop: "-100px" }}>
                  <h3 style={{ color: "blue" }}>Courses</h3>
                  <button
                    onClick={addCourse}
                    style={{
                      backgroundColor: "#0b0b93",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "8px 12px",
                      fontWeight: "bold",
                      float: "right",
                    }}
                  >
                    Add Course <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <ul className="todo-list">
                  {courses.map((course) => (
                    <li
                      key={course.course_id}
                      className="completed"
                      style={{
                        marginTop: "10px",
                        backgroundColor: "white",
                        color: "black",
                        padding: "10px",
                        borderRadius: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontWeight: "500" }}>{course.course_name}</span>
                      <div style={{ display: "flex", gap: "15px" }}>
                        <button
                          onClick={() => showModal(course.course_id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "red",
                            fontSize: "16px",
                            cursor: "pointer",
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button
                          onClick={() => editCourse(course.course_id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "brown",
                            fontSize: "16px",
                            cursor: "pointer",
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => addQuestions(course.course_id)}
                          style={{
                            backgroundColor: "#457BC1",
                            borderRadius: "10px",
                            color: "white",
                            border: "none",
                            padding: "8px 12px",
                            fontWeight: "500",
                          }}
                        >
                          Test
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </section>

      <Modal
        title="Confirm Deletion"
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this course?</p>
      </Modal>
    </>
  );
}

export default Courses;
