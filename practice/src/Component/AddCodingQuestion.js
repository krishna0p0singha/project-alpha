import {useContext, useState} from "react";
import {AddCodingQuestionStyle} from '../Style/StyleLibrary';
import GlobalControlContext from "../GlobalController";
import {CODING_API_URL} from "../GlobalVariable";
export default function AddCodingQuestion() {
    const {middleComponentToggleFunction}=useContext(GlobalControlContext);
    const [topicToggle, setTopicToggle] = useState({
        arrayToggle:false,
        numberTheoryToggle:false,
        stringToggle:false,
    });
    const [obj,setObj] = useState({
        question: "",
        explanation: "",
        questionLevel: "",
        writeMethod:"",
        mainMethod:"",
        tags: [],
        testCases: {},
    });
    const [inputCase,setInputCase] = useState("");
    const [outputCase,setOutputCase] = useState("");
    const [testCases,setTestCases] = useState({
        inputCase:[],
        outputCase:[]
    });
const [testToggle,setTestToggle] = useState(false);
const addTestCases = () => {
    let inputCases=testCases.inputCase;
    let outputCases=testCases.outputCase;
    if(inputCase !== "" && outputCase !== ""){
        inputCases.push(inputCase);
        outputCases.push(outputCase);
        setTestCases({...testCases,inputCase: inputCases,outputCase:outputCases});
        setObj({...obj, testCases: testCases});
        setInputCase("");
        setOutputCase("");
    }
}
const submitData = async (e) => {
    e.preventDefault();
    try{
        let result = await fetch(`${CODING_API_URL}add_coding_question`,{
            method: "POST",
            body: JSON.stringify(obj),
            headers:{
                "Content-Type": "application/json"
            }
        });

        if(result.status === 201){
            result = await result.json();
            alert(result.message);
            clearState();
        }else if(result.status === 500){
            result = await result.json();
            clearState();
            alert(result.error);
        }
    }catch (e) {

    }
}
const clearState=()=>{
    setObj({...obj,
        question: "",
        explanation: "",
        questionLevel: "",
        writeMethod:"",
        mainMethod:"",
        tags: [],
        testCases: {}
    });
}
    const addTag = (newTag) => {
        if (!newTag) {
            console.error("New tag is empty or undefined.");
            return;
        }

        setObj((prevState) => {
            if (!Array.isArray(prevState.tags)) {
                console.error("Tags is not an array!");
                return prevState; // Safeguard to prevent state corruption
            }

            return {
                ...prevState,
                tags: [...prevState.tags, newTag],
            };
        });
    };
    return(<>

        <fieldset>
            <legend>
                <button onClick={() => {
                    middleComponentToggleFunction("toggleAddQuestion");
                }}>Back
                </button>
            </legend>
            <label htmlFor="#Question"><span className={AddCodingQuestionStyle.label}>Question</span> :
                <textarea id={"#Question"}
                          value={obj.question}
                          className={AddCodingQuestionStyle.textarea}
                          onChange={(e) => setObj({...obj, question: e.target.value})}>
                </textarea>
            </label><br/>
            <label htmlFor="#Explanation"><span className={AddCodingQuestionStyle.label}>Explanation </span>
                <textarea id={"#Explanation"}
                          value={obj.explanation}
                          className={AddCodingQuestionStyle.textarea}
                          onChange={(e) => setObj({...obj, explanation: e.target.value})}>
                </textarea>
            </label><br/>
            <label htmlFor="#WriteMethod"><span className={AddCodingQuestionStyle.label}>Write Method </span>
                <textarea id={"#WriteMethod"}
                          value={obj.writeMethod}
                          className={AddCodingQuestionStyle.textarea}
                          onChange={(e) => setObj({...obj, writeMethod: e.target.value})}>
                </textarea>
            </label><br/>
            <label htmlFor="#MainMethod"><span className={AddCodingQuestionStyle.label}>Main Method </span>
                <textarea id={"#MainMethod"}
                          value={obj.mainMethod}
                          className={AddCodingQuestionStyle.textarea}
                          onChange={(e) => setObj({...obj, mainMethod: e.target.value})}>
                </textarea>
            </label><br/>
            <label htmlFor="#MainMethod"><span className={AddCodingQuestionStyle.label}>Topic Select</span>
                <button style={{backgroundColor: topicToggle.arrayToggle ? "red" : ""}}
                        onClick={() => {
                            addTag("Array");
                            setTopicToggle({...topicToggle, arrayToggle: !topicToggle.arrayToggle});
                        }}
                        disabled={topicToggle.arrayToggle}>
                    Array
                </button>

                <button style={{backgroundColor: topicToggle.numberTheoryToggle ? "red" : ""}}
                        onClick={() => {
                            addTag("Number Theory");
                            setTopicToggle({...topicToggle, numberTheoryToggle: !topicToggle.numberTheoryToggle});
                        }}
                        disabled={topicToggle.numberTheoryToggle}>
                    Number Theory
                </button>
                <button style={{backgroundColor: topicToggle.stringToggle? "red" : ""}}
                        onClick={() => {
                            addTag("String");
                            setTopicToggle({...topicToggle, stringToggle: !topicToggle.stringToggle});
                        }}
                        disabled={topicToggle.stringToggle}>
                    String
                </button>
            </label><br/>
            <label htmlFor="#questionLevel"><span className={AddCodingQuestionStyle.label}>Question Level</span>
                <select id={"#questionLevel"}
                        value={obj.questionLevel}
                        onChange={(e) => {
                            setObj({...obj, questionLevel: e.target.value})
                        }}>
                    <option value={""}></option>
                    <option value={"EASY"}>EASY</option>
                    <option value={"MEDIUM"}>MEDIUM</option>
                    <option value={"HARD"}>HARD</option>
                </select>
            </label><br/>
            <br/>
            <label>
                <center>
                    <button className={AddCodingQuestionStyle.event_btn}
                            onClick={() => {
                                setTestToggle(prevState => !prevState)
                            }}>Add Test Cases
                    </button>
                </center>
                <br/>
                {testToggle && (
                    <div>
                        <label htmlFor={"#input"}><span className={AddCodingQuestionStyle.label}>Input Case</span>
                            <input value={inputCase}
                                   id={"#input"}
                                   className={AddCodingQuestionStyle.test_case_section}
                                   type={"text"}
                                   onChange={(e) => {
                                       setInputCase(e.target.value)
                                   }}/>
                        </label><br/><br/>
                        <label htmlFor={"#output"}><span className={AddCodingQuestionStyle.label}>Output Case</span>
                            <input value={outputCase}
                                   id={"#output"}
                                   className={AddCodingQuestionStyle.test_case_section}
                                   type={"text"}
                                   onChange={(e) => {
                                       setOutputCase(e.target.value)
                                   }}/>
                        </label><br/><br/>
                        <center>
                            <button id={"#addBtn"}
                                    className={AddCodingQuestionStyle.event_btn}
                                    onClick={addTestCases}>Add Case
                            </button>
                        </center>
                    </div>
                )}
            </label><br/>
            <button id={"#submitbtn"}
                    className={AddCodingQuestionStyle.event_btn}
                    onClick={submitData}>Submit
            </button>
        </fieldset>
    </>);
}