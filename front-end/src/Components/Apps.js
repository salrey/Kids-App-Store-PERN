import axios from "axios"
import { useEffect, useState } from "react"
import FormatApps from "./FormatApps";

import ImageList from '@mui/material/ImageList';


const Apps = ({parentCallBack}) => {
    const [apps, setApps] = useState([]);
    const URL = process.env.REACT_APP_API_URL

    useEffect(()=> {
        axios.get(`${URL}/apps`)
        .then((res) => { console.log(res.data.payload); return setApps(res.data.payload)})
        .catch((error) => { throw error })
    }, [URL])

    const total = apps.reduce((acc, _) => acc += 1, 0)
    
    useEffect(() => {
        parentCallBack(total)
    }, [parentCallBack, total])

    return (
    <main>
        <section className="Apps container">
            <ImageList variant="masonry" gap={20}>
                {apps.map((app) => {
                    return <FormatApps key={app.id} app={app}/>
                })}
            </ImageList>
        </section>
    </main>
    );
}
  
export default Apps;