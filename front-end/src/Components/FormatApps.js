import { Link } from "react-router-dom";

const FormatApps = ({ app }) => {
  return (
    <div className="App">
      <Link to={`/apps/${app.id}`}>
        <h4> {app.name} </h4>
        <h4>
          <div>
          </div>
        </h4>
      </Link>
    </div>
    
  );
}

export default FormatApps;
