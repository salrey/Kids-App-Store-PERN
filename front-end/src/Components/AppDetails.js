import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios"
import Reviews from "./Reviews";

const AppDetails = () => {
    const navigate = useNavigate();
    const [app, setApp] = useState([]);
    const { id } = useParams();
    const URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(URL+"/apps/"+id)
        .then((response) => {console.log(response.data); return setApp(response.data.payload)})
        .catch(() => { navigate("/not-found")})
    }, [URL, id, navigate])

    const deleteApp = () => {
        axios.delete(`${URL}/apps/${id}`)
        .then(() => navigate("/apps"))
        .catch((e) => console.error(e));
    };

    const handleDelete = () => {
        deleteApp()
    };
    
    return (
        <article className="">
            <aside className="">
                {app?.featured}
            </aside>
            <h1>{app?.name}</h1>
            <div><img src={app?.image} alt={app?.name}/></div>
            <div>Developer: {app?.developer}</div>
            <div>Category: {app?.category}</div>
            <div>Age: {app?.age}</div>
            <div>Price: {app?.price}</div>
            <div>Description: {app?.description}</div>
            <div> 
                <Link to={`/apps`}>
                    <button className="">Back</button>
                </Link>
                <Link to={`/apps/${id}/edit`}>
                    <button className="">Edit</button>
                </Link>
                <button 
                    className="" 
                    onClick={handleDelete}>Delete
                </button>
            </div>
            <Reviews />
        </article>
    );
}

export default AppDetails;
  
