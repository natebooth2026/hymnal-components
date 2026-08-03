import { useState } from "react";
import { CSV_HEADERS } from "../data/sample-data";

const MIN_VAL : number = 5;
const MAX_VAL : number = 1000;

const first_names : string[] = ["Liam", "Olivia", "Noah", "Emma", "Elijah", "Charlotte", "James", "Amelia", "Benjamin", "Sophia", "Lucas", "Mia", "Henry", "Ava", "Alexander", "Isabella", "Mason", "Evelyn", "Michael", "Harper", "Ethan", "Abigail", "Daniel", "Ella", "Jacob", "Scarlett", "Logan", "Grace", "Jackson", "Chloe", "Sebastian", "Lily", "Jack", "Aria", "Owen", "Nora", "Samuel", "Zoey", "Levi", "Hannah"];
const last_names : string[] = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson, Jr.", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Green", "Baker", "Adams", "O'Brien"];
const city_names : string[] = ["Akron", "Canton", "Cleveland", "Mentor", "Medina", "Wooster", "Kent", "Stow", "Hudson", "Twinsburg", "Aurora", "Solon", "Strongsville", "Brunswick", "Parma", "Lakewood", "Rocky River", "Westlake", "North Olmsted", "Berea", "Elyria", "Lorain", "Avon", "Avon Lake", "Sandusky", "Willoughby", "Painesville", "Chardon", "Ravenna", "Alliance", "Massillon", "North Canton", "Barberton", "Cuyahoga Falls", "Green", "Tallmadge", "Wadsworth", "Boardman", "Youngstown", "Ashtabula"];
//const state_names : string[] = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

const enum downloadType {MEMBER, GIVING, ATTENDANCE};

//creates the data and downloads CSV file to device
function handleDownload(type : downloadType, mem_num : number) : void {
    if(mem_num < MIN_VAL || mem_num > MAX_VAL) return; // JIC error case

    //inital arrays
    const members : string[][] = [];
    const giving : string[][] = [];
    const attendance : string[][] = [];
    var currentType : downloadType | null = null;

    //generating data and convert to CSV functionality
    switch(type){
        case downloadType.MEMBER:
            currentType = downloadType.MEMBER;

            //shuffling
            const first_shuffle = first_names.sort(() => Math.random() - 0.5);
            const last_shuffle = last_names.sort(() => Math.random() - 0.5);

            //binding any names with commas to the name via quotes
            for(var i = 0; i < first_shuffle.length; i++){
                if(first_shuffle[i].includes(',')){
                    first_shuffle[i] = `\"${first_shuffle[i]}\"`
                }
            }
            for(var i = 0; i < last_shuffle.length; i++){
                if(last_shuffle[i].includes(',')){
                    last_shuffle[i] = `\"${last_shuffle[i]}\"`
                }
            }

            //adding member names if > 40 members requested
            if(first_shuffle.length < mem_num){
                for(var i = first_shuffle.length; i < mem_num; i++){
                    first_shuffle.push(first_shuffle[Math.floor(Math.random() * 100) % first_shuffle.length]);
                }
            }
            if(last_shuffle.length < mem_num){
                for(var i = last_shuffle.length; i < mem_num; i++){
                    last_shuffle.push(last_shuffle[Math.floor(Math.random() * 100) % last_shuffle.length]);
                }
            }

            //creating inital members
            for(var i = 0; i < mem_num; i++){
                members.push([first_shuffle[i], last_shuffle[i]]);
            }

            //EMAIL GENERATION
            //clean up names for email address generation
            const email_first : string[] = first_shuffle.map(s => s.replace(/[^a-zA-Z]/g, ""));
            const email_last : string[] = last_shuffle.map(s => s.replace(/[^a-zA-Z]/g, ""));

            //crafting and adding emails to each member
            for(var i = 0; i < mem_num; i++){
                //email address generation, sometimes skipped
                const GENERATE_EMAIL : boolean = (Math.floor(Math.random() * 100 - 1) % 100) > 15;
                if(GENERATE_EMAIL){
                    const emailAddress : string = email_first[i].toLowerCase() + "." + email_last[i].toLowerCase() + "@example.com";
                    members[i].push(emailAddress);
                } else {
                    members[i].push("");
                }
                
                //removes (potential) email address parts from arrays
                email_first.slice(0, i);
                email_last.slice(0, i);
            }

            //grabbing current date
            const CURRENT_DATE : Date = new Date();
            const CURRENT_YEAR : string = String(CURRENT_DATE.getFullYear());

            //adding random phone numbers, cities, states, active statuses, and active since dates
            for(var i = 0; i < mem_num; i++){
                //phone number
                const RAND_NUM : number = Math.floor(Math.random() * 10000 - 1) % 10000;
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
                members[i].push(city_names[Math.floor(Math.random() * 100) % city_names.length],
                                /*state_names[Math.floor(Math.random() * 100) % state_names.length]*/ "Ohio");

                //active status
                const IS_ACTIVE : boolean = (Math.floor(Math.random() * 100 - 1) % 100) > 18;
                if(IS_ACTIVE){
                    members[i].push("active");
                } else {
                    members[i].push("inactive");
                }

                //random active since date (WARNING! May change with calendar systems lol)
                const RAND_YEAR : number = (Number(CURRENT_YEAR) - 8) + (Math.floor(Math.random() * 100) % 8 + 1);
                const RAND_MONTH_IDX : number = Math.floor(Math.random() * 100) % 12 + 1;
                const IS_FEBRUARY : boolean = RAND_MONTH_IDX == 2;
                const IS_30_DAY : boolean = RAND_MONTH_IDX == 4 || RAND_MONTH_IDX == 6 || RAND_MONTH_IDX == 9 || RAND_MONTH_IDX == 11;

                if(IS_FEBRUARY){ //28 or 29 days
                    //leap year check based on Gregorian calendar rules
                    const IS_LEAP_YEAR : boolean = RAND_YEAR % 4 == 0 && (RAND_YEAR % 100 != 0 || RAND_YEAR % 400 == 0);
                    if(IS_LEAP_YEAR){
                        members[i].push(String(RAND_YEAR) + "-" + (RAND_MONTH_IDX >= 10 ? String(RAND_MONTH_IDX) : "0" + String(RAND_MONTH_IDX)) + "-" + String(Math.floor(Math.random() * 100) % 29));
                    } else {
                        members[i].push(String(RAND_YEAR) + "-" + (RAND_MONTH_IDX >= 10 ? String(RAND_MONTH_IDX) : "0" + String(RAND_MONTH_IDX)) + "-" + String(Math.floor(Math.random() * 100) % 28));
                    }
                } else if (IS_30_DAY){ //30 days
                    members[i].push(String(RAND_YEAR) + "-" + (RAND_MONTH_IDX >= 10 ? String(RAND_MONTH_IDX) : "0" + String(RAND_MONTH_IDX)) + "-" + String(Math.floor(Math.random() * 100) % 30));
                } else { //31 days
                    members[i].push(String(RAND_YEAR) + "-" + (RAND_MONTH_IDX >= 10 ? String(RAND_MONTH_IDX) : "0" + String(RAND_MONTH_IDX)) + "-" + String(Math.floor(Math.random() * 100) % 31));
                }
            }

            //CONVERSTION TO CSV
            var CSVData : string[] = [];
            CSVData.push('\uFEFF'); //excel formatting header 

            //headers
            var CSVHeaders : string = "";
            for(var i = 0; i < CSV_HEADERS.members.length - 1; i++){
                CSVHeaders += CSV_HEADERS.members[i];
                CSVHeaders += ',';
            }
            CSVHeaders += CSV_HEADERS.members[CSV_HEADERS.members.length - 1];
            CSVHeaders += '\n';
            CSVData.push(CSVHeaders);

            //member data
            var CSVDataHolder : string = "";
            for(var i = 0; i < members.length; i++){
                for(var j = 0; j < members[i].length - 1; j++){
                    CSVDataHolder += members[i][j];
                    CSVDataHolder += ',';
                }
                CSVDataHolder += members[i][members[i].length - 1];
                if(i < members.length - 1) CSVDataHolder += '\n';
                CSVData.push(CSVDataHolder);
                CSVDataHolder = "";
            }

            //<a download> & blob
            const b = new Blob(CSVData, { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(b);

            const l = document.createElement("a");
            l.href = url;
            l.download = "members.csv";
            document.body.append(l);
            l.click();

            document.body.removeChild(l);
            URL.revokeObjectURL(url);
            break;
        case downloadType.GIVING:
            currentType = downloadType.GIVING;
            break;
        case downloadType.ATTENDANCE:
            currentType = downloadType.ATTENDANCE;
            break;
    }
}

//triggers download buttons
function Download({mem_num} : {mem_num : number}) : JSX.Element {
    return (
        <div id="download_buttons">
            <button onClick={() => handleDownload(downloadType.MEMBER, mem_num)} className="download_button">Download Member CSV</button>
            <button onClick={() => handleDownload(downloadType.GIVING, mem_num)} className="download_button">Download Giving CSV</button>
            <button onClick={() => handleDownload(downloadType.ATTENDANCE, mem_num)} className="download_button">Download Attendance CSV</button>
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
                            setMemNum(NEW_MEM_NUM);
                            if(NEW_MEM_NUM >= MIN_VAL && NEW_MEM_NUM <= MAX_VAL){
                                setShowGenerate(true);
                                setShowDownload(false);
                            } else {
                                setShowGenerate(false);
                            }
                        }} 
                        min={MIN_VAL} max={MAX_VAL} 
                />
                <br /> <br />
                {showGenerate && <button type="submit" id="generate_button">Generate</button>}
                {!showGenerate && <p>Please enter a number between 5 and 1000.</p>}
            </form>
            {showDownload && <Download mem_num={memNum}/>}
        </div>
    );
}