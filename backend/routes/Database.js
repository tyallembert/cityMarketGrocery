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
    async writeJSON(filename, destination, newData){
        //constructs the local path
        var path = this.getLocalPath(filename, destination);
        // Creates and populates file with blank template
        var exists = await this.checkFileExists(path);

        //gets everything saved to file for today
        // var daysData = await this.readJSON(filename, destination);
        if(exists){
            var json = JSON.stringify(newData, null, 2);
            json = "[\n" + json + "\n]"
            var success = false;
            fs.writeFileSync(path, json, 'utf8', function(err){
                if (err){
                    success = false;
                }
                else success = true;
            });
        }
    }
    /* 
    Reads in json data from the specified day
    */
    async readJSON(filename, destination){
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
    getNewDayTemplate(){
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