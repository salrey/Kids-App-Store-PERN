import axios from "axios"
import { useEffect, useState } from "react"
import FormatApps from "./FormatApps";

const Apps = () => {
  const [apps, setApps] = useState([]);
  const URL = process.env.REACT_APP_API_URL

  useEffect(()=> {
    axios.get(`${URL}/apps`)
      .then((res) => { console.log(res.data.payload); return setApps(res.data.payload)})
      .catch((error) => { throw error })
  }, [URL])

    return (
      <main>
        <section className="Apps">
          <article>
              {apps.map((app) => {
                return <FormatApps key={app.id} app={app}/>
              })}
          </article>
        </section>
      </main>
    );
  }
  
export default Apps;