import { useState } from "react";
import { CSV_HEADERS } from "../data/sample-data";
import { subDays, format, max, addDays } from "date-fns";

const MIN_VAL : number = 5;
const MAX_VAL : number = 1000;

const first_names : string[] = ["Liam", "Olivia", "Noah", "Emma", "Elijah", "Charlotte", "James", "Amelia", "Benjamin", "Sophia", "Lucas", "Mia", "Henry", "Ava", "Alexander", "Isabella", "Mason", "Evelyn", "Michael", "Harper", "Ethan", "Abigail", "Daniel", "Ella", "Jacob", "Scarlett", "Logan", "Grace", "Jackson", "Chloe", "Sebastian", "Lily", "Jack", "Aria", "Owen", "Nora", "Samuel", "Zoey", "Levi", "Hannah"];
const last_names : string[] = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson, Jr.", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Green", "Baker", "Adams", "O'Brien"];
const city_names : string[] = ["Akron", "Canton", "Cleveland", "Mentor", "Medina", "Wooster", "Kent", "Stow", "Hudson", "Twinsburg", "Aurora", "Solon", "Strongsville", "Brunswick", "Parma", "Lakewood", "Rocky River", "Westlake", "North Olmsted", "Berea", "Elyria", "Lorain", "Avon", "Avon Lake", "Sandusky", "Willoughby", "Painesville", "Chardon", "Ravenna", "Alliance", "Massillon", "North Canton", "Barberton", "Cuyahoga Falls", "Green", "Tallmadge", "Wadsworth", "Boardman", "Youngstown", "Ashtabula"];
//const state_names : string[] = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
const service_types : string[] = ["Wednesday Night", "Sunday Morning", "Sunday Evening"];

const enum downloadType {MEMBER, GIVING, ATTENDANCE};

//creates CSV header string and data string
function createCSVLines(type : downloadType, data2D : string[][]) : string[] {
    const RESULTS : string[] = [];

    //headers
    switch(type){
    case downloadType.MEMBER:
        var CSVHeaders : string = "";
        for(var i = 0; i < CSV_HEADERS.members.length - 1; i++){
            CSVHeaders += CSV_HEADERS.members[i];
            CSVHeaders += ',';
        }
        CSVHeaders += CSV_HEADERS.members[CSV_HEADERS.members.length - 1];
        CSVHeaders += '\n';
        RESULTS.push(CSVHeaders);
        break;
    case downloadType.GIVING:
        var CSVHeaders : string = "";
        for(var i = 0; i < CSV_HEADERS.giving.length - 1; i++){
            CSVHeaders += CSV_HEADERS.giving[i];
            CSVHeaders += ',';
        }
        CSVHeaders += CSV_HEADERS.giving[CSV_HEADERS.giving.length - 1];
        CSVHeaders += '\n';
        RESULTS.push(CSVHeaders);
        break;
    case downloadType.ATTENDANCE:
        var CSVHeaders : string = "";
        for(var i = 0; i < CSV_HEADERS.attendance.length - 1; i++){
            CSVHeaders += CSV_HEADERS.attendance[i];
            CSVHeaders += ',';
        }
        CSVHeaders += CSV_HEADERS.attendance[CSV_HEADERS.attendance.length - 1];
        CSVHeaders += '\n';
        RESULTS.push(CSVHeaders);
    }

    //data
    var CSVDataHolder : string = "";
    for(var i = 0; i < data2D.length; i++){
        for(var j = 0; j < data2D[i].length - 1; j++){
            CSVDataHolder += data2D[i][j];
            CSVDataHolder += ',';
        }
        CSVDataHolder += data2D[i][data2D[i].length - 1];
        if(i < data2D.length - 1) CSVDataHolder += '\n';
    }
    RESULTS.push(CSVDataHolder);

    return RESULTS;
}

//creates the data and converts to CSV file
function handleGenerate(type : downloadType, mem_num : number, member_info : string[][] = []) : string[][][] {
    if(mem_num < MIN_VAL || mem_num > MAX_VAL) return []; // JIC error case

    //inital arrays
    const members : string[][] = [];
    const giving : string[][] = [];
    const attendance : string[][] = [];
    const new_members : string[][] = []; //only used when members are being generated

    //GENERATING LIST-UNIQUE DATA
    switch(type){
        case downloadType.MEMBER:
            //shuffling
            const first_shuffle = first_names.sort(() => Math.random() - 0.5);
            const last_shuffle = last_names.sort(() => Math.random() - 0.5);

            //adding member names if > 40 members requested
            if(first_shuffle.length < mem_num){
                for(var i = first_shuffle.length; i < mem_num; i++){
                    first_shuffle.push(first_shuffle[Math.floor(Math.random() * (first_shuffle.length - 1))]);
                }
            }
            if(last_shuffle.length < mem_num){
                for(var i = last_shuffle.length; i < mem_num; i++){
                    last_shuffle.push(last_shuffle[Math.floor(Math.random() * (last_shuffle.length - 1))]);
                }
            }

            //creating sharable inital member data
            for(var i = 0; i < mem_num; i++){
                if(first_shuffle[i].includes(',') || last_shuffle[i].includes(',')){
                    const FULL_NAME = first_shuffle[i] + " " + last_shuffle[i];
                    new_members.push([`"${FULL_NAME}"`]);
                } else {
                    new_members.push([first_shuffle[i] + " " + last_shuffle[i]]);
                }
            }

            //creating inital members for members list
            for(var i = 0; i < mem_num; i++){
                if(!first_shuffle[i].includes(",") && !last_shuffle[i].includes(",")){ //neither have commas
                    members.push([first_shuffle[i], last_shuffle[i]]);
                } else if (!first_shuffle[i].includes(",")){                        //first name has comma(s)
                    members.push([first_shuffle[i], `\"${last_shuffle[i]}\"`]);
                } else if (!last_shuffle[i].includes(",")){                         //last name has comma(s)
                    members.push([`\"${first_shuffle[i]}\"`, last_shuffle[i]]);
                } else {                                                            //both names have comma(s)
                    members.push([`\"${first_shuffle[i]}\"`, `\"${last_shuffle[i]}\"`]);
                }
            }

            //EMAIL GENERATION
            //clean up names for email address generation
            const email_first : string[] = first_shuffle.map(s => s.replace(/[^a-zA-Z]/g, ""));
            const email_last : string[] = last_shuffle.map(s => s.replace(/[^a-zA-Z]/g, ""));

            //crafting and adding emails to each member
            for(var i = 0; i < mem_num; i++){
                //email address generation, sometimes skipped
                const GENERATE_EMAIL : boolean = (Math.floor(Math.random() * 99)) > 15;
                if(GENERATE_EMAIL){
                    const emailAddress : string = email_first[i].toLowerCase() + "." + email_last[i].toLowerCase() + "@example.com";
                    members[i].push(emailAddress);
                    new_members[i].push(emailAddress);
                } else {
                    members[i].push("");
                    new_members[i].push("");
                }
                
                //removes (potential) email address parts from arrays
                email_first.slice(0, i);
                email_last.slice(0, i);
            }

            //adding random phone numbers, cities, states, active statuses, and active since dates
            for(var i = 0; i < mem_num; i++){
                //phone number
                const RAND_NUM : number = Math.floor(Math.random() * 9999);
                const RAND_NUM_STR : string = String(RAND_NUM);
                var phone_num : string = "330-555-";
                if (RAND_NUM < 10){
                    phone_num += ("000" + RAND_NUM_STR);
                } else if (RAND_NUM < 100){
                    phone_num += ("00" + RAND_NUM_STR);
                } else if (RAND_NUM < 1000){
                    phone_num += ("0" + RAND_NUM_STR);
                } else {
                    phone_num += RAND_NUM_STR;
                }
                members[i].push(phone_num);

                //city & state (set Ohio to be state by default due to Ohio city names being in provided data at start of program)
                members[i].push(city_names[Math.floor(Math.random() * (city_names.length - 1))],
                                /*state_names[Math.floor(Math.random() * 100) % state_names.length]*/ "Ohio");

                //active status
                const ACTIVE_MODIFER : number = Math.floor(Math.random() * 99);
                if(ACTIVE_MODIFER > 18){            // ~72% chance
                    members[i].push("active");
                } else if (ACTIVE_MODIFER > 4) {    // ~14% chance
                    members[i].push("inactive");
                } else {                            // ~4% chance
                    members[i].push("visitor");
                }

                //random active since date
                const DAY_MODIFIER : number = Math.floor(Math.random() * 2900);
                members[i].push(format(subDays(new Date(), DAY_MODIFIER), 'yyyy-MM-dd'));
            }
            break;
        case downloadType.GIVING:
            //inserting member names and emails
            for(var i = 0; i < member_info.length; i++){
                giving.push([member_info[i][0], member_info[i][1]]);
            }
            break;
        case downloadType.ATTENDANCE:
            //inserting member names and emails
            for(var i = 0; i < member_info.length; i++){
                attendance.push([member_info[i][0], member_info[i][1]]);
            }

            //picking random Wednesday or Sunday and then a service type
            for(var i = 0; i < attendance.length; i++){
                const DAY_MODIFIER : number = Math.floor(Math.random() * 2900); //random day
                const TODAY : Date = new Date();
                var day : Date = subDays(TODAY, DAY_MODIFIER);
                if(day.getDay() != 0 && day.getDay() != 3){ //not Wednesday nor Sunday
                    //ensuring on Wednesday or Sunday
                    const WED_OR_SUN : number = Math.floor(Math.random() * 3); //0 = Wednesday, 1-2 = Sunday
                    if(WED_OR_SUN == 0){
                        day = subDays(day, day.getDay() - 3)
                    } else {
                        day = subDays(day, day.getDay());
                    }

                    //bound check
                    if(day < (subDays(TODAY, 2900))){
                        day = addDays(day, 7);
                    } else if (day > TODAY){
                        day = subDays(day, 7);
                    }
                } 
                attendance[i].push(format(day, 'yyyy-MM-dd'));

                //adding service type
                if(day.getDay() == 3) attendance[i].push(service_types[0]);
                else {
                    //random between morning/evening Sunday service (extra weight to morning)
                    const RAND_SERVICE = Math.floor(Math.random() * 3);
                    if(RAND_SERVICE < 2){
                        attendance[i].push(service_types[1]);
                    } else {
                        attendance[i].push(service_types[2]);
                    }
                }

                // //DEBUG--ensuring Sunday and Wednesday dates only
                // if(day.getDay() == 0) attendance[i].push("SUNDAY");
                // else if (day.getDay() == 3) attendance[i].push("WEDNESDAY");
                // else attendance[i].push("ERROR");
            }
            break;
    }

    //CONVERSTION TO CSV
    //headers
    var CSVData : string[] = [];
    CSVData.push('\uFEFF'); //excel formatting header 
    var results : string[] = [];

    switch(type){
    case downloadType.MEMBER:
        results = createCSVLines(downloadType.MEMBER, members);
        break;
    case downloadType.GIVING:
        results = createCSVLines(downloadType.GIVING, giving);
        break;
    case downloadType.ATTENDANCE:
        results = createCSVLines(downloadType.ATTENDANCE, attendance);
        break;
    }
    CSVData.push(results[0], results[1]);
    if(type == downloadType.MEMBER) return [[CSVData], new_members]; //for use in giving and attendance lists
    return [[CSVData], []];
}

function handleDownload(type : downloadType, data : string[]) : void {
    //<a download> & blob
    const b = new Blob(data, { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(b);

    const l = document.createElement("a");
    l.href = url;
    switch(type){
    case downloadType.MEMBER:
        l.download = "members.csv";
        break;
    case downloadType.GIVING:
        l.download = "giving.csv";
        break;
    case downloadType.ATTENDANCE:
        l.download = "attendance.csv";
        break;
    }
    document.body.append(l);
    l.click();

    document.body.removeChild(l);
    URL.revokeObjectURL(url);
}

//generates data and triggers download buttons
function Generate({mem_num} : {mem_num : number}) : JSX.Element {
    //generating all data
    const MEMBER_GENERATION : string[][][] = handleGenerate(downloadType.MEMBER, mem_num);
    const [MEMBER_DATA, MEMBER_INFO] : [string[], string[][]] = [MEMBER_GENERATION[0][0], MEMBER_GENERATION[1]];
    const GIVING_DATA : string[] = handleGenerate(downloadType.GIVING, mem_num, MEMBER_INFO)[0][0];
    const ATTENDANCE_DATA : string[] = handleGenerate(downloadType.ATTENDANCE, mem_num, MEMBER_INFO)[0][0];

    //creating download buttons
    return (
        <div id="download_buttons">
            <button onClick={() => handleDownload(downloadType.MEMBER, MEMBER_DATA)} className="download_button">Download Member CSV</button>
            <button onClick={() => handleDownload(downloadType.GIVING, GIVING_DATA)} className="download_button">Download Giving CSV</button>
            <button onClick={() => handleDownload(downloadType.ATTENDANCE, ATTENDANCE_DATA)} className="download_button">Download Attendance CSV</button>
            <br />
            <button onClick={() => {
                handleDownload(downloadType.MEMBER, MEMBER_DATA);
                handleDownload(downloadType.GIVING, GIVING_DATA);
                handleDownload(downloadType.ATTENDANCE, ATTENDANCE_DATA);
            }} className="download_button">Download ALL CSVs</button>
        </div>
    );
}

//controls front-end of DataGenerator
export function DataGenerator() : JSX.Element {
    //generation states
    const [memNum, setMemNum] = useState(0);
    const [showGenerate, setShowGenerate] = useState(false); //to show generate button
    const [showDownload, setShowDownload] = useState(false); //to show download buttons

    return (
        <div id="data_generator">
            <h1>How many members?</h1>
            <br />
            <form onSubmit={(e) => {e.preventDefault(); setShowDownload(true);}}>
                <input type="number" id="member_num" 
                        onChange={(e) => {
                            const NEW_MEM_NUM : number = isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber;
                            if(NEW_MEM_NUM >= MIN_VAL && NEW_MEM_NUM <= MAX_VAL){
                                setShowGenerate(true);
                            } else {
                                setShowGenerate(false);
                            }
                            setShowDownload(false);
                            setMemNum(NEW_MEM_NUM);
                        }} 
                        min={MIN_VAL} max={MAX_VAL} 
                />
                <br /> <br />
                {showGenerate && <button type="submit" id="generate_button">Generate</button>}
                {!showGenerate && <p>Please enter a number between 5 and 1000.</p>}
            </form>
            {showDownload && <Generate mem_num={memNum}/>}
        </div>
    );
}