require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// const uri = `mongodb://localhost:27017`;

const uri = `mongodb+srv://nextPcBuilder:nextPcBuilder@cluster0.es092.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    await client.connect();

    const pcCollection = await client.db("pc_builder").collection("pc");

    const monitorCollection = await client
      .db("pc_category")
      .collection("featured");

    const processorCollection = await client
      .db("pc_category")
      .collection("processor");

    const motherboardCollection = await client
      .db("pc_category")
      .collection("motherboard");

    console.log("database connected");

    app.get("/featured-pc/:id", async (req, res) => {
      const id = req.params.id;

      // const validIdPattern = /^[0-9a-fA-F]{24}$/;
      // if (!validIdPattern.test(id)) {
      //   return res
      //     .status(400)
      //     .send({ status: false, message: "Invalid ID format" });
      // }

      const result = await pcCollection.findOne({ _id: ObjectId(id) });
      // console.log(result);
      res.send({ status: true, data: result });
    });

    app.get("/featured-pc", async (req, res) => {
      const cursor = pcCollection.find({});
      const product = await cursor.toArray();

      res.send({ status: true, data: product });
    });

    app.get("/monitor", async (req, res) => {
      const cursor = monitorCollection.find({});
      const product = await cursor.toArray();

      res.send({ status: true, data: product });
    });

    app.get("/processor", async (req, res) => {
      const cursor = processorCollection.find({});
      const product = await cursor.toArray();
      res.send({ status: true, data: product });
    });

    app.get("/motherboard", async (req, res) => {
      const cursor = motherboardCollection.find({});
      const product = await cursor.toArray();
      res.send({ status: true, data: product });
    });
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
