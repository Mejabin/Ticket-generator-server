const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();
const cors = require("cors");
const app = express();
const corsConfig = {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

app.use(express.json());
app.use("*", cors(corsConfig));

const uri =
  "mongodb+srv://mehjabinelu11:IjXMc8Tu2cxWWFbm@cluster0.yer4oak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

const ticketCollection = client.db("tickets").collection("ticket");

app.post("/add-tickets", async (req, res) => {
  try {
    const service = req.body;
    console.log(service);
    const result = await ticketCollection.insertOne(service);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});
app.get("/all-tickets", async (req, res) => {
  try {
    const result = await ticketCollection.find({}).toArray();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.send("working");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
