import axios from "axios";
import { useState, useEffect } from "react";
const API = process.env.REACT_APP_API_URL;

console.log(API);
function App() {
  const [apps, setApps] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/apps`)
      .then(
        (response) => { console.log(response.data.payload)
          setApps(response.data.payload);
        },
        (error) => console.log("get", error)
      )
      .catch((c) => console.warn("catch", c));
  }, []);
  return (
    <div>
      <ul>
        {apps.map((app) => (
          <li key={app.id}>{app.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
