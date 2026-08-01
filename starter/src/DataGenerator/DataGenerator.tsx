import { useState, useRef } from 'react';

function Generate({inputVal, state, stateFuncs} : 
                  {inputVal : number, state : boolean, stateFuncs : Map<String, React.Dispatch<React.SetStateAction<boolean>>>}) {
    if(state == false) return null; //edge case
    () => stateFuncs.get("generation")?.(false); //changes state back to false
    var memNum = inputVal;
    console.log(memNum);
    if(memNum == null || memNum == undefined) return (<p style={{ color: "red" }}>Member number retrieval error. Try again later.</p>);
    if(memNum < 5 || memNum > 1000){
        return (<p style={{ color: "red" }}>Member count must be between 5 and 1000.</p>);
    } else {
        return (<p>Worked!</p>);
    }
}

export function DataGenerator() {
    //STATE FUNCTIONS
    const [showGeneration, setShowGeneration] = useState(false);

    //functions to be passed by "ref" to Generate()
    const externStateFuncs = new Map();
    externStateFuncs.set("generation", setShowGeneration);

    //VALUE REF
    const inputRef = useRef<HTMLInputElement>(null);

    //HTML
    return (
    <div id="InputNumber">
        <h1>How many members?</h1>
        <form onSubmit={(e) => {e.preventDefault();}}>
            <input type="number" defaultValue={25} name="Number" id="member_num" ref={inputRef}/>
            <button onClick={() => setShowGeneration(true)} type="submit">Generate</button>
        </form>
        <Generate inputVal={Number(inputRef.current?.value)} state={showGeneration} stateFuncs={externStateFuncs} />
    </div>
    );
}