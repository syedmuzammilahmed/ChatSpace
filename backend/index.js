const express = require('express');
const { MongoClient,ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

async function main() {
    const app = express();

    app.use(bodyParser.json());

    const uri = "mongodb+srv://muzu:muzu@mycluster.qdb9sxo.mongodb.net/<dbname>?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
      
        setRoutes(app, client);
        const PORT = process.env.PORT || 5001
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.error(e);
    }
}



function setRoutes(app, client) {
    const usersCollection = client.db("ChatSpace").collection("Users");
    
   
    app.post("/createUser", async (req, res) => {
        try {
            await usersCollection.insertOne(req.body);
            res.status(200).send("User created successfully");
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).send("Internal server error");
        }
    });
}  

main();