const db = require("../db/dbConfig.js");

const getAllApps = async () => {
    try {
        const apps = await db.any("SELECT * FROM storeapp");

        return apps;
    } catch (err) {
        return err;
    }
};
  
const getOneApp = async (id) => {
    try {
        const app = await db.one("SELECT * FROM storeapp WHERE id=$1", id);
  
        return app;
    } catch (error) {
        return error;
    }
};
  
const addNewApp = async (newApp) => {
    try {
        const { name, developer, image, price, description, category, age, featured } = newApp

        const app = await db.one(
            "INSERT INTO storeapp (name, developer, image, price, description, category, age, featured) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [ name, developer, image, price, description, category, age, featured ]
            );

        return app;
    } catch (error) {
        return error;
    }
};

const deleteApp = async (id) => {
    try {
        const app = await db.one("DELETE FROM storeapp WHERE id=$1 RETURNING *",id);
  
        return app;
    } catch (error) {
        return error;
    }
};
  
const updateApp = async (app, id) => {
    try {
        const { name, developer, image, price, description, category, age, featured } = app
    
        const query = "UPDATE storeapp SET name=$1, developer=$2, image=$3, price=$4, description=$5, category=$6, age=$7, featured=$8 WHERE id=$9 RETURNING *";
    
        const values = [name, developer, image, price, description, category, age, featured, id];
        
        const updated = await db.one(query, values);
      
        return updated;

    } catch (error) {
        return error;
    }
};
  
  module.exports = {
    getAllApps,
    addNewApp,
    getOneApp,
    deleteApp,
    updateApp,
  };
