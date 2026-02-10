import { useAuth } from "../store/Auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Service.css";

export const Service = () => {
  const { services, isLoggedIn } = useAuth(); 
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [showPaidPopup, setShowPaidPopup] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const getCourseNotesUrl = (serviceName) => {
    const notesUrls = {
      'Web Development': 'https://mrcet.com/downloads/digital_notes/IT/WEB%20APPLICATION%20DEVELOPMENT.pdf',
      'E-commerce Website Development': 'https://backup.pondiuni.edu.in/storage/dde/dde_ug_pg_books/E-%20Commerce.pdf',
      'Responsive Web Design': 'https://www.lpude.in/SLMs/Master%20of%20Computer%20Applications/Sem_4/DECAP784_RESPONSIVE%20WEB%20DESIGN.pdf',
      'Mobile App Development': 'https://mrcet.com/downloads/digital_notes/it/mobile%20application%20development%20digital%20notes(r18a1207).pdf',
      'WordPress Website Development': 'https://www.tutorialspoint.com/wordpress/wordpress_tutorial.pdf',
      'UI/UX Design Services': 'https://rwskill.edu.in/wp-content/uploads/2025/09/uiuxgraphic.pdf'
    };
    return notesUrls[serviceName];
  };

  const handleAccess = (serviceName, isFree) => {
    if (isFree) {
      window.open(getCourseNotesUrl(serviceName), '_blank');
    } else {
      if (!isLoggedIn) {
        setShowLoginPopup(true);
        return;
      }
      setSelectedService(serviceName);
      setShowPopup(true);
    }
  };

  const handleBuySubscription = () => {
    setShowPopup(false);
    setShowNotes(true);
    setTimeout(() => {
      setShowNotes(false);
      setShowPaidPopup(true);
    }, 2000);
  };

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>

      <div className="container grid grid-three-cols">
        {services && services.map((curElem, index) => {
          const { service, description, provider, price, isFree } = curElem;

          return (
            <div className="card service-card" key={index}>
              <div className="card-img service-card-img">
                <img src="/images/design.png" alt="service" width="200" />
              </div>

              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p className="service-provider">{provider}</p>
                  <p className={`service-price ${isFree ? 'free' : 'paid'}`}>
                    {isFree ? "FREE" : price}
                  </p>
                </div>
                <h2 className="service-title">{service}</h2>
                <p className="service-description">{description}</p>
                
                <button 
                  className={`btn ${isFree ? 'btn-free-access' : 'btn-subscribe'}`}
                  onClick={() => handleAccess(service, isFree)}
                >
                  {isFree ? "Free Access" : "Subscribe"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showLoginPopup && (
        <div className="popup-overlay-blocked">
          <div className="popup-content">
            <h2 className="popup-title">Login Required !</h2>
            <p className="popup-text">Please Login or Register to Access Paid Services</p>
            
            <div className="popup-btns">
              <button className="btn btn-primary" onClick={() => navigate("/login")}>
                Login
              </button>
              <button className="btn btn-secondary" onClick={() => navigate("/register")}>
                Register
              </button>
            </div>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2 className="popup-title">Subscription Required !</h2>
            <p className="popup-text">
              <strong className="popup-text-strong">{selectedService}</strong> For Access Please Take Subscription.
            </p>
            <button className="btn btn-primary" onClick={handleBuySubscription}>
              Buy Subscription
            </button>
            <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {showNotes && (
        <div className="popup-overlay scrollable">
          <div className="popup-content scrollable">
            <h2 className="popup-title">{selectedService} - Course Notes</h2>
            <div className="notes-content">
              <h3 className="notes-heading">Course Content:</h3>
              <ul className="notes-list">
                <li>Introduction to {selectedService}</li>
                <li>Basic Concepts & Fundamentals</li>
                <li>Practical Examples & Projects</li>
              </ul>
              <p className="notes-info"><strong>Duration:</strong> 4-6 weeks</p>
              <p className="notes-info"><strong>Level:</strong> Beginner to Advanced</p>
            </div>
            <p className="processing-text">Processing payment...</p>
          </div>
        </div>
      )}

      {showPaidPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2 className="success-title">Paid ✅</h2>
            <p className="popup-text">
              Your subscription has been activated for <strong className="popup-text-strong">{selectedService}</strong>!
            </p>
            <p className="notes-info">You now have full access to all course materials.</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowPaidPopup(false);
                window.open(getCourseNotesUrl(selectedService), '_blank');
              }}
            >
              Start Learning
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
