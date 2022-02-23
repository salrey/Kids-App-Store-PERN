import bubble from "../assets/Saly.png"
import { Link } from "react-router-dom";

const Home = () => {
    return (
      <div className="Home position-relative overflow-hidden p-3 mx-auto my-5 text-center">
        <div className="col-md-5 p-lg-5 mx-auto my-5">
          <h2>Hi Kyle! Welcome to AmaKid</h2>
          <h3>Discover Amazing Apps</h3>
          <Link to={'/apps'} >
            <img className="img-fluid" src={bubble} alt="bubble" />
          </Link>
        </div>
        <h2>A place to be a kid!</h2>
      </div>
    );
  }
  
  export default Home;
