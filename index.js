const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://schoolManagement:SchoolManagement@cluster0.bg9rqij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const TeacherCollection = client.db("school-management").collection("teacher");
const StudentCollection = client.db("school-management").collection("student");
const NoticeCollection = client.db("school-management").collection("notice");
const NewsCollection = client.db("school-management").collection("news");
const InfoCollection = client.db("school-management").collection("info");
const GalleryCollection = client.db("school-management").collection("Gallery");
const RutinCollection = client.db("school-management").collection("Rutin");
const SMCCollection = client.db("school-management").collection("smc");
const CabinetCollection = client.db("school-management").collection("cabinet");
const InstituteInformationCollection = client
  .db("school-management")
  .collection("instituteInfo");
const failStudentCollection = client.db("school-management").collection("fail");
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
    app.get("/single-teacher", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await TeacherCollection.findOne(query);
      res.send(result);
    });
    app.delete("/delete-teacher", async (req, res) => {
      const _id = req.query._id;
      const query = { _id: new ObjectId(_id) };
      const result = await TeacherCollection.deleteOne(query);
      res.send(result);
    });

    // student cabinet

    app.post("/add-cabinet", async (req, res) => {
      const data = req.body;
      const result = await CabinetCollection.insertOne(data);
      res.send(result);
    });

    app.get("/get-cabinet", async (req, res) => {
      const query = {};
      const result = await CabinetCollection.find(query).toArray();
      res.send(result);
    });

    app.put("/update-cabinet", async (req, res) => {
      const data = req.body;
      const _id = data.id;
      const query = { _id: new ObjectId(_id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          Name: data.Name,
          EIIN: data.EIIN,
          Member: data.Member,
          Ready: data.Ready,
          LastUpdate: data.LastUpdate,
        },
      };
      const result = await CabinetCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });

    app.delete("/delete-cabinet", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await CabinetCollection.deleteOne(query);
      res.send(result);
    });

    // student section --------------------------------------------------->>>>>>>>>>>>>>>>>>>>>

    app.post("/add-student", async (req, res) => {
      const data = req.body;
      const result = await StudentCollection.insertOne(data);
      res.send(result);
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

    app.put("/update-student", async (req, res) => {
      const data = req.body;
      const _id = data.id;
      const query = { _id: new ObjectId(_id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: data.name,
          role: data.role,
          yourClass: data.yourClass,
          father_name: data.father_name,
          mother_name: data.mother_name,
          dipperment: data.dipperment,
          phone: data.phone,
          address: data.address,
          date_of_birth: data.date_of_birth,
        },
      };
      const result = await StudentCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });

    app.get("/single-student", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await StudentCollection.findOne(query);
      res.send(result);
    });

    // SMC

    app.post("/add-smc-counsil", async (req, res) => {
      const data = req.body;
      const result = await SMCCollection.insertOne(data);
      res.send(result);
    });

    app.get("/get-smc-counsil", async (req, res) => {
      const query = {};
      const result = await SMCCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/delete-smc", async (req, res) => {
      const { _id } = req.query;
      if (!_id) {
        return res.status(400).send({ error: "Missing _id parameter" });
      }

      try {
        const query = { _id: new ObjectId(_id) };
        const deletedSMC = await SMCCollection.deleteOne(query);
        if (!deletedSMC) {
          return res.status(404).send({ error: "SMC not found" });
        }
        res.send({ message: "SMC deleted successfully" });
      } catch (error) {
        console.error("Error deleting SMC:", error);
        res.status(500).send({ error: "Internal server error" });
      }
    });

    // Fail Student
    app.post("/post-fail-student", async (req, res) => {
      const data = req.body;
      const result = await failStudentCollection.insertOne(data);
      res.send(result);
    });

    app.put("/edit-fail-student", async (req, res) => {
      const { _id } = req.query;
      const data = req.body;
      const query = { _id: new ObjectId(_id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          classes: data.classes,
          department: data.department,
          group: data.group,
          failedMaleStudent: data.failedMaleStudent,
          failedFemaleStudent: data.failedFemaleStudent,
          year: data.year,
        },
      };
      const result = await failStudentCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });

    app.get("/get-fail-student", async (req, res) => {
      const query = {};
      const result = await failStudentCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/delete-fail-student", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await failStudentCollection.deleteOne(query);
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

    app.delete("/delete-notice", async (req, res) => {
      const _id = req.query._id;
      const query = { _id: new ObjectId(_id) };
      const result = await NoticeCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/single-notice", async (req, res) => {
      const _id = req.query._id;
      const query = { _id: new ObjectId(_id) };
      const result = await NoticeCollection.findOne(query);
      res.send(result);
    });

    // news section ------------------------------------

    app.post("/add-news", async (req, res) => {
      const data = req.body;
      const result = await NewsCollection.insertOne(data);
      res.send(result);
    });

    app.get("/get-news", async (req, res) => {
      const query = {};
      const result = await NewsCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/get-news-single-view", async (req, res) => {
      const _id = req.query._id;
      const query = { _id: new ObjectId(_id) };
      const result = await NewsCollection.findOne(query);
      res.send(result);
    });

    app.delete("/delete-news", async (req, res) => {
      const _id = req.query._id;
      const query = { _id: new ObjectId(_id) };
      const result = await NewsCollection.deleteOne(query);
      res.send(result);
    });

    // Institute information

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

    app.post("/add-school-information", async (req, res) => {
      const data = req.body;
      const result = await InstituteInformationCollection.insertOne(data);
      res.send(result);
    });

    app.get("/get-institute-info", async (req, res) => {
      const query = {};
      const result = await InstituteInformationCollection.findOne(query);
      res.send(result);
    });

    app.put("/edit-institute-information", async (req, res) => {
      const data = req.body;
      const _id = data.id;
      const query = { _id: new ObjectId(_id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          instituteName: data.instituteName,
          instituteType: data.instituteType,
          instituteCode: data.instituteCode,
          mpoCode: data.mpoCode,
          stipendCode: data.stipendCode,
          district: data.district,
          ParliamentarySeat: data.ParliamentarySeat,
          mainBuildingName: data.mainBuildingName,
          Union: data.Union,
          PostCode: data.PostCode,
          instituteMobile: data.instituteMobile,
          instituteHeadName: data.instituteHeadName,
          fax: data.fax,
          webAddress: data.webAddress,
          EIIN: data.EIIN,
          geoCode: data.geoCode,
          BTEBCode: data.BTEBCode,
          BTEBMpoCode: data.BTEBMpoCode,
          region: data.region,
          Upazila: data.Upazila,
          Village_HoldingNo: data.Village_HoldingNo,
          postOffice: data.postOffice,
          Founder: data.Founder,
          instituteHeadMobile: data.instituteHeadMobile,
          instituteEmail: data.instituteEmail,
        },
      };
      const result = await InstituteInformationCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });

    // add gallery -------------------------------

    app.post("/add-gallery", async (req, res) => {
      const data = req.body;
      const result = await GalleryCollection.insertOne(data);
      res.send(result);
    });

    app.get("/gallery", async (req, res) => {
      const query = {};
      const result = await GalleryCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/gallery", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await GalleryCollection.deleteOne(query);
      res.send(result);
    });

    // rutine

    app.post("/add-rutine", async (req, res) => {
      const data = req.body;
      const result = await RutinCollection.insertOne(data);
      res.send(result);
    });

    app.get("/rutin", async (req, res) => {
      const query = {};
      const result = await RutinCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/delete-rutin", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await RutinCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}

run();

app.listen(port, () => {
  console.log("Running your server");
});
