import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <h1>
        <Link to="/apps">Apps</Link>
      </h1>
      <button className="">
        <Link to="/apps/new">New App Listing</Link>
      </button>
    </nav>
  );
}

export default NavBar;