import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AppForm = () => {
    const { id } = useParams();
    const URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [ checkbox, setCheckbox ] = useState({
        text: "Add to Featured?",
        classList: "",
    })
    const [ app, setApp ] = useState({
      name: "",
      developer: "",
      image: "",
      price: "",
      description: "",
      category: "",
      age: "",
      featured: ""
    });

    const isEdit = id ? true : false;

    useEffect(() => {
      const getApp = async () => {
        const targetApp = await axios.get(`${URL}/apps/${id}`);
        setApp(targetApp.data.payload);
      };
      isEdit && getApp();
    }, [URL, id]);

    const handleInputChange = (event) => {
        setApp({ ...app, [event.target.id]: event.target.value});
    };

    const handleCheckboxChange = (event) => {
        if (event.target.checked === false) {
            setCheckbox({
                text: "Add to Featured?",
                classList: "",
            })
            setApp({ ...app, featured: false});
        } else {
            setCheckbox({
                text: "✓ Added",
                classList: "",
            })
            setApp({ ...app, featured: true});
        }
    };

    const handleNew = async (event) => {
      event.preventDefault();
      await axios.post(`${URL}/apps`, app);
      navigate("/apps");
    };

    const handleEdit = async (event) => {
        event.preventDefault();
        await axios.put(`${URL}/apps/${id}`, app);
        navigate(`/apps`);
    };

    return (
    <div className="Form">
        <div className="">
            <form className="" onSubmit={isEdit ? handleEdit : handleNew}>
                <label htmlFor="name">Name</label>
                <input
                className=""
                id="name"
                value={app.name}
                type="text"
                onChange={handleInputChange}
                placeholder="app name"
                required
                />
                <label htmlFor="image">Image</label>
                <input 
                type="text" 
                className="" 
                id="image" 
                value={app.image} 
                onChange={handleInputChange}
                placeholder="link to app image"
                required
                />
                <label htmlFor="price">Price</label>
                <input
                className=""
                id="price"
                value={app.price}
                type="number"
                min="0"
                onChange={handleInputChange}
                placeholder="app price"
                required
                />
                <label htmlFor="developer">Developer</label>
                <input
                className=""
                id="developer"
                type="text"
                value={app.developer}
                placeholder="app developer"
                onChange={handleInputChange}
                required
                />
                <label htmlFor="description">Description</label>
                <input
                className=""
                id="description"
                type="text"
                value={app.description}
                placeholder="app description"
                onChange={handleInputChange}
                required
                />
                <label htmlFor="age">Age</label>
                <input
                className=""
                id="age"
                type="text"
                value={app.age}
                placeholder="app age"
                onChange={handleInputChange}
                required
                />
                <label className="" htmlFor="category">
                    <select onChange={handleInputChange} className="" name="category" id="category" value={app.category} required>
                        <option className="dropdown-item" value="">---choose a category---</option>
                        <option className="dropdown-item" value="Games">Games</option>
                        <option className="dropdown-item" value="Education">Education</option>
                        <option className="dropdown-item" value="Music">Music</option>
                        <option className="dropdown-item" value="Entertainment">Entertainment</option>
                    </select>
                </label>
                <label className={checkbox.classList} id="featured" >{checkbox.text}
                    <input
                    className=""
                    id="type"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    />
                </label>
                <br />
                <button className="">Submit</button>
            </form>
            <Link to={isEdit ? `/apps/${id}` : '/apps'}>
                <button className="">Back</button>
            </Link>
          </div>
        </div>
    );
}

export default AppForm;
