const e = require('express');
const fs = require('fs');

class Database {
    constructor() {
        this.liveFreight = {};
        this.upstock = {};
        this.backstock = {};
        this.sectors = {};
        this.bulk = {};
        this.peri = {};
        this.beerWine = {};
    };
    getLocalPath(filename, destination){
        var path = "";
        console.log(destination)
        switch(destination){
            case "daysData":
                path = __dirname + "/../database/dayData/city_market_" + filename + ".json";
                break;
            case "settingsFile":
                path = __dirname + "/../database/adminInfo/" + filename + ".json";
                break;
            default:
                path = __dirname + "/../database/dayData/city_market_" + filename + ".json";
        }
        return path;
    }
    /* 
    Writes to and modifies the data of a certain days tasks
    */
    async writeJSON(filename, destination, newData, id){
        console.log("WRITE FUNCTION")
        //constructs the local path
        var path = this.getLocalPath(filename, destination);
        // Creates and populates file with blank template
        var exists = await this.checkFileExists(path);

        //gets everything saved to file for today
        // var daysData = await this.readJSON(filename, destination);

        //updated info in object to get it ready to write
        // var [updatedTasks, newId] = this.updateData(daysData, parent, type, newData, id);
        console.log("EXISTS: "+exists)
        if(exists){
            var json = JSON.stringify(newData, null, 2);
            json = "[\n" + json + "\n]"
            console.log("JSON:")
            console.log(json)
            var success = false;
            fs.writeFileSync(path, json, 'utf8', function(err){
                if (err){
                    success = false;
                    console.log("ERROR")
                    console.log(err)
                }
                else success = true;
            });
        }
    }
    /* 
    Reads in json data from the specified day
    */
    async readJSON(filename, destination){
        console.log("READ FUNCTION")
        var path = this.getLocalPath(filename, destination);
        
        this.checkFileExists(path);

        var data = fs.readFileSync(path);
        var jsonData = await JSON.parse(data);
        return jsonData;
    }
    /* 
    Checks if the file has been created yet for the day
    */
    async checkFileExists(path){

        if (fs.existsSync(path) === false) {
            var template = JSON.stringify(this.getNewDayTemplate(), null, 2);
            fs.writeFileSync(path, template);
            return false;
        }else{
            return true;
        }
    }
    /* 
    Helper function to prepare json data with updated 
    new values before it is re-written to the file
    */
    updateData(allData, taskParent, taskType, newData, id){
        if(id !== ""){
            if(newData === "delete"){
                delete allData[0][id];
            }else{
                if(taskType === ""){
                    allData[0][id] = (newData);
                }else{
                    allData[0][taskType][id] = (newData);
                }
            }
        }else{
            let r = (Math.random() + 1).toString(36).slice(2,10);
            id = r;
            if(taskType === ""){
                allData[0][r] = (newData);
            }else{
                allData[0][taskType][r] = (newData);
            }
        }
        return [allData, id];
    }
    /* 
    Helper function to prepare json data with updated 
    new values before it is re-written to the file
    */
    getNewDayTemplate(){
        console.log("creating template")
        var template = [{
                liveFreight: {
                    dryGoodsLive: {},
                    perishablesLive: {},
                    bulkLive: {}
                },
                dryGoods: {
                    upstock: {},
                    backstock: {},
                    sectors: {},
                    rounding: {},
                },
                perishables: {
                    castors: {},
                    backstock: {}
                },
                bulk: {},
                beerWine: {},
                extraNotes: {}
            }];
        return template;
    }
}

module.exports = Database