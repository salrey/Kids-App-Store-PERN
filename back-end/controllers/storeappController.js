//Dependencies
const express = require("express")
const {
    getAllApps,
    addNewApp,
    getOneApp,
    deleteApp,
    updateApp,
} = require("../queries/storeapps")
const reviewsController = require("./reviewsController")


//Controller to handle sub-routes
const storeapps = express.Router();
storeapps.use('/:id/reviews', reviewsController)


const { setValues } = require("../helpers/functions")


//INDEX
storeapps.get("/", async (_, response) => {
    console.log("helloooo")
    const storeapps = await getAllApps();
    if(storeapps.length === 0){
        response.status(500).json({error: 'server error'})
    } else {
        response.status(200).json({payload: storeapps})
    }
})

//CREATE
storeapps.post("/", async (request, response) => {
    try {
        const newApp = await addNewApp(setValues(request.body))
        response.status(200).json({success: true, payload: newApp})
    } catch (error) {
        throw error
    } 
})

//SHOW
storeapps.get("/:id", async (request, response) => {
    const { id } = request.params;
    try {
        const storeapp = await getOneApp(id)
        if(storeapp.id) {
            response.status(200).json({ success: true, payload: storeapp })
        } else {
            response.status(404).json({ success: false, payload: "App not found" })
        }
    } catch (error) {
        throw error;
    }
})

//Update
storeapps.put("/:id", async (request, response) => {
    const updatedStoreApp = await updateApp(setValues(request.body), request.params.id) 
    console.log(updatedStoreApp)
    try {
        if(updatedStoreApp.id && updatedStoreApp.name) {
            response.status(200).json({ success: true, payload: updatedStoreApp })
        } else {
            response.status(422).json({ success: false, payload: "Include all fields" })
        }
    } catch (error) {
        throw error
    }
})

//DESTROY
storeapps.delete("/:id", async (request, response) => {
    const { id } = request.params;
    try {
        const storeapp = await deleteApp(id)
        if (storeapp.id) {
            response.status(200).json({ success: true, payload: storeapp })
        } else {
            response.status(422).json({ success: false, payload: storeapp})
        }
    } catch (error) {
        throw error
    }
})

module.exports = storeapps; 