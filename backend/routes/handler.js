const express = require("express");
const router = express.Router();
const Database = require('./Database');
const mailHelper = require('./sendEmail');

const bcrypt = require("bcrypt");
const saltRounds = 10;

const database = new Database();

router.use(express.json());

router.get("/admin", async(req, res) => {
    console.log("FROM EMAIL");
    res.location('http://localhost:3000/');
    res.send("RESPONSE");
});
router.get("/currentTasks", async (req, res) => {
    var date = new Date();
    var dateString = date.toLocaleDateString('en-us');
    var filename = dateString.replace(/\//g, "_");
    var destination = "daysData";
    var tasks = await database.readJSON(filename, destination);
    res.send(JSON.stringify(tasks[0]));
});
router.post("/saveData", async(req, res) => {
    console.log("HANDLER: saveData")
    var body = req.body;
    var date = new Date();
    var dateString = date.toLocaleDateString('en-us');
    var filename = dateString.replace(/\//g, "_");
    var destination = "daysData";
    await database.writeJSON(filename, destination, body, "");
    var returnData = await database.readJSON(filename, destination);
    res.send(JSON.stringify(returnData));
});
//-------------------------------------------
// ===Retrieving Settings functions===
//-------------------------------------------
router.get("/getAddTaskSettings", async(req, res) => {
    console.log("HANDLER: getAddTaskSettings")
    var destination = "settingsFile";
    var filename = "addTaskSettings";
    var settings = await database.readJSON(filename, destination);
    res.send(JSON.stringify(settings[0]));
});
router.get("/getNavSettings", async(req, res) => {
    var destination = "settingsFile";
    var filename = "navSettings";
    var settings = await database.readJSON(filename, destination);
    res.send(JSON.stringify(settings[0]));
});
router.get("/getTaskSettings", async(req, res) => {
    var destination = "settingsFile";
    var filename = "taskSettings";
    console.log("HANDLER: getTaskSettings")
    var settings = await database.readJSON(filename, destination);
    res.send(JSON.stringify(settings[0]));
});
router.get("/getLiveSettings", async(req, res) => {
    console.log("HANDLER: getLiveSettings")
    var destination = "settingsFile";
    var filename = "newLiveSettings";
    var settings = await database.readJSON(filename, destination);
    res.send(JSON.stringify(settings[0]));
});
router.get("/getCurrentEmployees", async(req, res) => {
    console.log("HANDLER: getCurrentEmployees")
    var destination = "settingsFile";
    var filename = "currentEmployees";
    var settings = await database.readJSON(filename, destination);
    res.send(JSON.stringify(settings[0]));
});
//-------------------------------------------
// ===Live functions===
//-------------------------------------------
router.get("/currentLiveAisles", (req, res) => {
    console.log("HANDLER: currentLiveAisles")
    var date = new Date();
    var dateString = date.toLocaleDateString('en-us');
    var filename = dateString.replace(/\//g, "_");
    var tasks = {}
    var destination = "daysData";
    tasks = database.readJSON(filename, destination);
    res.send(JSON.stringify(tasks[0]["liveFreight"]));
});
router.post('/saveLiveData', async(req, res) => {
    console.log("HANDLER: saveLiveData")
    var body = req.body;
    const type = "liveFreight";
    var parent = "";
    var date = new Date();
    var dateString = date.toLocaleDateString('en-us');
    var filename = dateString.replace(/\//g, "_");
    var destination = "daysData";
    var newId = await database.writeJSON(filename, destination, parent, type, body, "");
    res.send(JSON.stringify(newId));
});
router.post('/saveFinishedLive', (req, res) => {
    console.log("HANDLER: saveFinishedLive")
    var id = req.body[0]
    var information = JSON.parse(req.body[1]);
    const type = "liveFreight";
    var parent = "";
    var date = new Date();
    var dateString = date.toLocaleDateString('en-us');
    var filename = dateString.replace(/\//g, "_");
    var destination = "daysData";
    var newId = database.writeJSON(filename, destination, parent, type, information, id);
    res.send(newId);
});
//-------------------------------------------
// ===Task functions===
//-------------------------------------------
router.post('/saveNewTask', async(req, res) => {
    var type = req.body[0];
    var parent = "";
    var body = JSON.parse(req.body[1]);
    var date = new Date();
    var dateString = date.toLocaleDateString('en-us');
    var filename = dateString.replace(/\//g, "_");
    var destination = "daysData";
    var newId = await database.writeJSON(filename, destination, parent, type, body, "");
    res.send(JSON.stringify(newId));
});

router.post('/saveTask', async(req, res) => {
    console.log("HANDLER: saveTask"); 
    const type = req.body.type;
    const id = req.body.id;
    var task = req.body.task;
    var destination = "daysData";
    var date = new Date();
    var dateString = date.toLocaleDateString('en-us');
    var filename = dateString.replace(/\//g, "_");
    var newId = await database.writeJSON(filename, destination, type, task, id);
    res.send(JSON.stringify(newId));
});
//-------------------------------------------
// ===Admin functions===
//-------------------------------------------
router.post("/checkAdmin", async (req, res) => {
    console.log("HANDLER: checkAdmin")
    var user = req.body;
    var filename = "adminUsers";
    var destination = "settingsFile";
    var response = await database.readJSON(filename, destination);

    var allAdmin = response;
    var response = {
        username: false,
        password: false
    }

    var hashedPass = await bcrypt.hash(user.password, saltRounds);

    for(var admin in allAdmin[0]){
        if(user.username === allAdmin[0][admin].username){
            response.username = true;
            // if(user.password === allAdmin[0][admin].password){
            var passCorrect = await bcrypt.compare(user.password, allAdmin[0][admin].password);
            console.log(passCorrect)
            if(passCorrect){
                response.password = true;
            }
        }
    }
    res.send(JSON.stringify(response));
});
router.post('/daysData', async(req, res) => {
    var destination = "tasksFile";
    var date = new Date();
    var startDate = date.toLocaleDateString('en-us');
    var endDate = date.toLocaleDateString('en-us');

    if(req.body.start != null && req.body.end != null){
        startDate = new Date(req.body.start);
        endDate = new Date(req.body.end);
    }
    var tasks = {};
    for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        var filename = d.toLocaleDateString('en-us').replace(/\//g, "_");
        try{
            var oneDay = await database.readJSON(filename, destination);
        }catch(error){
            console.log("Couldn't find day file for date " + filename);
        }
        tasks[filename] = (oneDay);
    }
    res.send(JSON.stringify(oneDay));
});
router.post("/saveNewEmployee", async (req, res) => {
    console.log("HANDLER: saveNewEmployee")
    var body = req.body.employee;
    var destination = "settingsFile";
    var filename = "currentEmployees";
    await database.writeJSON(filename, destination, body);
    var returnData = await database.readJSON(filename, destination);
    res.send(JSON.stringify(returnData));
});
router.post("/deleteEmployee", async (req, res) => {
    console.log("HANDLER: deleteEmployee")
    var id = req.body.id;
    var destination = "settingsFile";
    var filename = "currentEmployees";
    var employees = await database.readJSON(filename, destination);
    if(employees[0].hasOwnProperty(id)){
        delete employees[0][id];
    }
    console.log(employees)
    await database.writeJSON(filename, destination, employees[0]);
    // res.send(JSON.stringify(newId));
});
//-------------------------------------------
// ===Send Email===
//-------------------------------------------
router.post("/sendEmail", async (req, res) => {
    console.log("HANDLER: sendEmail")
    console.log(typeof req.body)
    mailHelper.sendEmail(req.body);
});

module.exports = router;