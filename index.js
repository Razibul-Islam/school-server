const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://school_management:school_management@cluster0.et9phym.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const TeacherCollection = client.db("test").collection("teacher");
const StudentCollection = client.db("test").collection("student");
const NoticeCollection = client.db("test").collection("notice");
const NewsCollection = client.db("test").collection("news");
const InfoCollection = client.db("test").collection("info");
// school_management

async function run() {
  try {
    app.get("/", (req, res) => {
      res.send("Running Your Server");
    });

    // teacher section --------------------------------------------------->>>>>>>>>>>>>>>>>>>>>

    app.post("/add-teacher", async (req, res) => {
      const data = req.body;
      const result = await TeacherCollection.insertOne(data);
      res.send(result);
    });
    app.get("/get-teacher", async (req, res) => {
      const query = {};
      const result = await TeacherCollection.find(query).toArray();
      res.send(result);
    });
    app.delete("/delete-teacher", async (req, res) => {
      const _id = req.query._id;
      const query = { _id: new ObjectId(_id) };
      const result = await TeacherCollection.deleteOne(query);
      res.send(result);
    });

    // student section --------------------------------------------------->>>>>>>>>>>>>>>>>>>>>

    app.post("/add-student", async (req, res) => {
      const data = req.body;
      const result = await StudentCollection.insertOne(data);
      res.send(result);
    });

    app.get("/get-student", async (req, res) => {
      const class_id = req.query.class_id;
      const query = { class_id: class_id };
      const result = await StudentCollection.find(query).toArray();
      res.send(result);
      console.log(class_id);
    });

    app.get("/get-allStudent", async (req, res) => {
      const query = {};
      const result = await StudentCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/delete-student", async (req, res) => {
      const _id = req.query._id;
      const query = { _id: new ObjectId(_id) };
      const result = await StudentCollection.deleteOne(query);
      res.send(result);
    });

    // notice section --------------------------------------------------->>>>>>>>>>>>>>>>>>>>>

    app.post("/add-notice", async (req, res) => {
      const data = req.body;
      const result = await NoticeCollection.insertOne(data);
      res.send(result);
    });

    app.get("/get-notice", async (req, res) => {
      const query = {};
      const result = await NoticeCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/single-notice", async (req, res) => {
      const _id = req.query._id;
      const query = { _id: new ObjectId(_id) };
      const result = await NoticeCollection.findOne(query);
      res.send(result);
    });

    app.delete("/delete-notice", async (req, res) => {
      const _id = req.query._id;
      const query = { _id: new ObjectId(_id) };
      const result = await NoticeCollection.deleteOne(query);
      res.send(result);
    });

    // news section ------------------------------------

    app.post("/add-news", async (req, res) => {
      const data = req.body;
      const result = await NewsCollection.insertOne(data);
      res.send(result);
    });

    app.get("/get-news-single-view", async (req, res) => {
      const _id = req.query._id;
      const query = { _id: new ObjectId(_id) };
      const result = await NewsCollection.findOne(query);
      res.send(result);
    });

    app.get("/get-news", async (req, res) => {
      const query = {};
      const result = await NewsCollection.find(query).toArray();
      res.send(result);
    });

    // school information

    app.put("/school-information", async (req, res) => {
      const data = req.body;
      const { _id } = req.query;
      const query = {};
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          founded: data.founded,
          regularStudent: data.regularStudent,
          teacher: data.teacher,
          totat_gpa_five: data.totat_gpa_five,
        },
      };
      const result = await InfoCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    app.get("/information", async (req, res) => {
      const result = await InfoCollection.findOne({});
      res.send(result);
    });
  } finally {
  }
}

run();

app.listen(port, () => {
  console.log("Running your server");
});
