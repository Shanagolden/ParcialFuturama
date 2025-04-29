import './About.css';
import mater from '../Img/Mater.jpg';
import sebas from '../Img/Yo.jpg';

function About() {
  return (
    <div className="about-container">
      <h1>Fundadores</h1>
      <div className="about-content">
        <div className="student-card">
          <div className="profile-image-container">
            <img 
              src={mater} 
              alt="Gustavo Garcia" 
              className="profile-image" 
            />
          </div>
          <h2>Gustavo Garcia "Ing. Multimedia"</h2>
          <p>Proxeneta</p>
          <p>Amante De Los Beatles</p>
          <p>Contacto: +57 300 521 0090</p>
        </div>
        <div className="student-card">
          <div className="profile-image-container">
            <img 
              src={sebas} 
              alt="Sebastian Echeverri" 
              className="profile-image" 
            />
          </div>
          <h2>Sebastian Echeverri "Ing.Multimedia"</h2>
          <p>Gestor De Paz</p>
          <p>Jugador De Ajedrez bajo el agua</p>
          <p>Contacto: +57 314 786 0178</p>
        </div>
      </div>
    </div>
  );
}

export default About;