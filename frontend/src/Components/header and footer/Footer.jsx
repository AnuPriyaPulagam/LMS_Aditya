import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import '../css/style.css'

function Footer(){
  return(
  <section id='footer'>
     <footer>
        <div className="footer-col">
          <h3>🔹Quick Links</h3>
          <li><a href="https://lms-main-1.vercel.app/">Home</a></li>
          <li><a href="https://adityauniversity.in/overview">About Us</a></li>
          <li><a href="https://lms-main-1-ten.vercel.app/courses">Courses</a></li>
          <li><a href="https://api.whatsapp.com/send/?phone=919989776661&text&type=phone_number&app_absent=0">Contact</a></li>
        </div>
        <div className="footer-col">
          <h3>🔹Explore Topics</h3>
          <li><a href="https://lms-main-1-ten.vercel.app/courses">Python</a></li>
          <li><a href="https://lms-main-1-ten.vercel.app/courses">java</a></li>
          <li><a href="https://lms-main-1-ten.vercel.app/courses">Control System</a></li>
          <li><a href="https://lms-main-1-ten.vercel.app/courses">IOT</a></li>
        </div>
        <div className="footer-col">
          <h3>🔹 Student Resources</h3>
          <li>Multiple Courses</li>
          <li>quizzes</li>
          <li>Progress Dashboard</li>
          <li>Certifications</li>
        </div>
        <div className="copyright">
          <p>Copyright ©2025 All rights reserved .</p>
          <div className="pro-links">
            <a href="https://www.facebook.com/adityauniversity9" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} className="i" />
            </a>
            <a href="https://www.instagram.com/aditya_university/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="i"/>
            </a>
            <a href="https://www.linkedin.com/school/adityauniversity/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedinIn} className="i"/>
            </a>
          </div>
        </div>
        </footer>
      </section>
  )
}
export default Footer;
