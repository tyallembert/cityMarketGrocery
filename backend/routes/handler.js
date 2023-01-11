const express = require("express");
const router = express.Router();
const Database = require('./Database');
const mailHelper = require('./sendEmail');

const database = new Database();

router.use(express.json());

router.get("/currentTasks", async (req, res) => {
    console.log("HANDLER: currentTask")
    var date = new Date();
    var dateString = date.toLocaleDateString('en-us');
    var filename = dateString.replace(/\//g, "_");
    var destination = "daysData";
    var tasks = await database.readJSON(filename, destination);
    res.send(JSON.stringify(tasks[0]));
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
    console.log("HANDLER: getNavSettings")
    var destination = "settingsFile";
    var filename = "navSettings";
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
    console.log(typeof req.body)
    var body = req.body;
    const type = "liveFreight";
    var date = new Date();
    var dateString = date.toLocaleDateString('en-us');
    var filename = dateString.replace(/\//g, "_");
    var destination = "daysData";
    var newId = await database.writeJSON(filename, destination, type, body, "");
    res.send(JSON.stringify(newId));
});
router.post('/saveFinishedLive', (req, res) => {
    console.log("HANDLER: saveFinishedLive")
    var id = req.body[0]
    var information = JSON.parse(req.body[1]);
    const type = "liveFreight";
    var date = new Date();
    var dateString = date.toLocaleDateString('en-us');
    var filename = dateString.replace(/\//g, "_");
    var destination = "daysData";
    var newId = database.writeJSON(filename, destination, type, information, id);
    res.send(newId);
});
//-------------------------------------------
// ===Task functions===
//-------------------------------------------
router.post('/saveNewTask', async(req, res) => {
    const type = req.body[0];
    var body = JSON.parse(req.body[1]);
    var date = new Date();
    var dateString = date.toLocaleDateString('en-us');
    var filename = dateString.replace(/\//g, "_");
    var destination = "daysData";
    var newId = await database.writeJSON(filename, destination, type, body, "");
    res.send(JSON.stringify(newId));
});

router.post('/saveTask', async(req, res) => {
    console.log("HANDLER: saveTask"); 
    const type = req.body.type;
    const id = req.body.id;
    var task = req.body.task;
    var destination = "daysData";
    // console.log(task)
    var date = new Date();
    var dateString = date.toLocaleDateString('en-us');
    var filename = dateString.replace(/\//g, "_");
    var newId = await database.writeJSON(filename, destination, type, task, id);
    res.send(JSON.stringify(newId));
});
//-------------------------------------------
// ===Admin functions===
//-------------------------------------------
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
    res.send(JSON.stringify(tasks));
});
router.post("/saveNewEmployee", async (req, res) => {
    console.log("HANDLER: saveNewEmployee")
    var body = req.body.employee;
    var type = "";
    var destination = "settingsFile";
    var filename = "currentEmployees";
    var newId = await database.writeJSON(filename, destination, type, body, "");
    res.send(JSON.stringify(newId));
});
router.post("/deleteEmployee", async (req, res) => {
    console.log("HANDLER: deleteEmployee")
    var body = "delete";
    var id = req.body.id;
    var type = "";
    var destination = "settingsFile";
    var filename = "currentEmployees";
    var newId = await database.writeJSON(filename, destination, type, body, id);
    res.send(JSON.stringify(newId));
});
//-------------------------------------------
// ===Send Email===
//-------------------------------------------
router.post("/sendEmail", async (req, res) => {
    console.log("HANDLER: sendEmail")
    mailHelper.sendEmail();
    
    // res.send(JSON.stringify(tasks[0]));
});

module.exports = router;