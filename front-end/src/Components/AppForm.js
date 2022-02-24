import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';




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
      featured: false
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
        if (event.target.name === "category") {
            setApp({ ...app, [event.target.name]: event.target.value});
        }
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
      console.log(app)
    };

    const handleEdit = async (event) => {
        event.preventDefault();
        await axios.put(`${URL}/apps/${id}`, app);
        navigate(`/apps/${id}`);
    };

    return (
    <div className="Form container mt-5">
        <div className="">
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={isEdit ? handleEdit : handleNew}
            >
                <div>
                    <TextField
                    required
                    id="name"
                    label="Name"
                    value={app.name}
                    onChange={handleInputChange}
                    />
                    <TextField
                    required
                    id="image"
                    label="Image"
                    value={app.image}
                    onChange={handleInputChange}
                    />
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="price">Price</InputLabel>
                        <OutlinedInput
                            id="price"
                            value={app.price}
                            onChange={handleInputChange}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Price"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            required
                        />
                    </FormControl>
                    <TextField
                    required
                    id="developer"
                    label="Developer"
                    value={app.developer}
                    onChange={handleInputChange}
                    />
                    <TextField
                    required
                    id="age"
                    label="Age"
                    value={app.age}
                    onChange={handleInputChange}
                    />
                    <TextField
                    required
                    multiline
                    id="description"
                    label="Description"
                    value={app.description}
                    onChange={handleInputChange}
                    />
                    <TextField
                    id="category"
                    name="category"
                    select
                    label="Category"
                    value={app.category}
                    onChange={handleInputChange}
                    required
                    >
                        <MenuItem value={""}>----</MenuItem>
                        <MenuItem value={"Games"}>Games</MenuItem>
                        <MenuItem value={"Education"}>Education</MenuItem>
                        <MenuItem value={"Music"}>Music</MenuItem>
                        <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                    </TextField>
                    <FormGroup>
                        <FormControlLabel className="text-dark" control={<Checkbox checked={app.featured} onChange={handleCheckboxChange} />} id="featured" label={checkbox.text} />
                    </FormGroup>
                    <br />
                    <button className="">Submit</button>
                </div>
            </Box>
            <Link to={isEdit ? `/apps/${id}` : '/apps'}>
                <button className="">Back</button>
            </Link>
          </div>
        </div>
    );
}

export default AppForm;
