const { timeStamp } = require('console');
const fs = require('fs');


var options = {
    year: "numeric",
    month: "2-digit",
    day: "numeric"
};

const warningsFile = require('../data/warnings.json')
const kicksFile = require('../data/kicks.json')
const muteFiles = require('../data/mutes.json')
const outputRoot = 'C:/Users/rm20k/Documents/GitHub/Warns-to-Obsidian/Out/'

module.exports = {
    execute: async function (log) {
        await mute()
        await warning()
        await kick()
    }
}

async function warning() {
    var mydata = warningsFile
    mydata.forEach(element => {
        //console.log(element)
        const userid = element.userId
        var output = outputRoot +"warnings/"+ userid + "/"
        if (!fs.existsSync(output)) {
            fs.mkdirSync(output, { recursive: true });
        }
        let i=0
        element.warnings.forEach(warning => {
            i++
            //console.log(warning)
            const mod = warning.author
            const reason = warning.reason.replace(/[^a-z\d\s]+/gi, "").replace(/\s/g, '-');;
            //console.log(reason)
            var date = new Date(warning.timestamp);
            const formattedTime = date.toLocaleString('en-GB',options)
            let last10Message = "\n"
            if(warning.Last10Messages.length>0){
                warning.Last10Messages.forEach(element => {
                    last10Message=last10Message+element+"\n"
                });
                //console.log(warning.Last10Messages)
            }
            
            let modtag = "mod/"+mod
            let text = `---
userid: ${userid}
tags: ${modtag}, warnings
aliases: ${i}
cssclass: null
---
### Metadata
reason:: #reason/${reason}
dateGiven:: #date/${formattedTime}
messages::${last10Message}`
            //console.log(text)
            const fileName = output+i
            fs.writeFile(`${fileName}.md`, text, function (err) {
                console.log(`${fileName}.md done`)
                if (err) throw err;
                console.log('File is created successfully.');
            });
        });
    });
}

async function kick() {
    var mydata = kicksFile
    mydata.forEach(element => {
        //console.log(element)
        const userid = element.userId
        var output = outputRoot +"kicks/"+ userid + "/"
        if (!fs.existsSync(output)) {
            fs.mkdirSync(output, { recursive: true });
        }
        let i=0
        element.kicks.forEach(kick => {
            i++
            //console.log(warning)
            const mod = kick.author
            const reason = kick.reason.replace(/[^a-z\d\s]+/gi, "").replace(/\s/g, '-');;
            //console.log(reason)
            var date = new Date(kick.timestamp);
            const formattedTime = date.toLocaleString('en-GB',options)
            let last10Message = "\n"
            if(kick.Last10Messages.length>0){
                kick.Last10Messages.forEach(element => {
                    last10Message=last10Message+element+"\n"
                });
                //console.log(kick.Last10Messages)
            }
            
            let modtag = "mod/"+mod
            let text = `---
userid: ${userid}
tags: ${modtag}, kick
aliases: ${i}
cssclass: null
---
### Metadata
reason:: #reason/${reason}
dateGiven:: #date/${formattedTime}
messages::${last10Message}`
            //console.log(text)
            const fileName = output+i
            fs.writeFile(`${fileName}.md`, text, function (err) {
                console.log(`${fileName}.md done`)
                if (err) throw err;
                console.log('File is created successfully.');
            });
        });
    });
}

async function mute() {
    var mydata = muteFiles
    mydata.forEach(element => {
        //console.log(element)
        const userid = element.userId
        var output = outputRoot +"mutes/"+ userid + "/"
        if (!fs.existsSync(output)) {
            fs.mkdirSync(output, { recursive: true });
        }
        let i=0
        element.mutes.forEach(mute => {
            i++
            //console.log(warning)
            const mod = mute.author
            const reason = mute.reason.replace(/[^a-z\d\s]+/gi, "").replace(/\s/g, '-');;
            //console.log(reason)
            var date = new Date(mute.timestamp);
            const formattedTime = date.toLocaleString('en-GB',options)
            let formattedDuration = ""
            if(mute.duration!="perma"){
                var sec_num = parseInt(mute.duration, 10); // don't forget the second param
                var hours = Math.floor(sec_num / 3600);
                var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
                var seconds = sec_num - (hours * 3600) - (minutes * 60);
                if (hours < 10) { hours = "0" + hours; }
                if (minutes < 10) { minutes = "0" + minutes; }
                if (seconds < 10) { seconds = "0" + seconds; }
                formattedDuration=hours + ':' + minutes + ':' + seconds
            }
            else{
                formattedDuration=mute.duration
            }
            let last10Message = "\n"
            if(mute.Last10Messages.length>0){
                mute.Last10Messages.forEach(element => {
                    last10Message=last10Message+element+"\n"
                });
                //console.log(kick.Last10Messages)
            }
            
            let modtag = "mod/"+mod
            let text = `---
userid: ${userid}
tags: ${modtag}, mute
aliases: ${i}
cssclass: null
---
### Metadata
reason:: #reason/${reason}
dateGiven:: #date/${formattedTime}
duration:: #duration/${formattedDuration}
messages::${last10Message}`
            //console.log(text)
            const fileName = output+i
            fs.writeFile(`${fileName}.md`, text, function (err) {
                console.log(`${fileName}.md done`)
                if (err) throw err;
                console.log('File is created successfully.');
            });
        });
    });
}


async function unixToDate(unix_timestamp) {
    var options = {
        year: "numeric",
        month: "2-digit",
        day: "numeric"
    };
    //console.log(unix_timestamp)
    var date = new Date(unix_timestamp);
    var formattedTime = date.toLocaleString('en-GB',options)
    return(formattedTime);
}