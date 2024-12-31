import {useContext, useState} from "react";
import GlobalControlContext from "../GlobalController";
import {ExamSet, CodeEditor, AddCodingQuestion, CodingQuestionList} from "../Component/ComponentLibrary";
import { DashboardStyle} from '../Style/StyleLibrary';
import {LeftSection} from "./SectionLibrary";
import {CODING_API_URL} from "../GlobalVariable";

export default function Dashboard() {
    const {
        toggleList,toggleFunction,questionId,
        middleComponentToggle, middleComponentToggleFunction,
        toggleExamList,examToggleFunction,addQuestionFunction}=useContext(GlobalControlContext);
    const [examTestList,setTestList] = useState(null);
    const fetchTestData = async (e) => {
        e.preventDefault();
        try{
            let result= await fetch(`${CODING_API_URL}test_list`);
            result = await result.json();
            if(result.success){
                setTestList(result['examList']);
            }
            // console.log(result['examList']);
        }catch (error){

        }
    }
    return (
        <>
            <div>
                {!toggleList.codeEditorToggle && (<>
                    {(middleComponentToggle.toggleExamSection && !toggleExamList.toggleTestList) && (<>
                        <button onClick={() => {
                            middleComponentToggleFunction("toggleExamSection");
                        }}>Back
                        </button>
                    </>)}
                    {toggleExamList.toggleTestList && (<>
                        <button onClick={() => {
                            examToggleFunction("toggleTestList");
                            addQuestionFunction(null);
                            }}>Back</button>
                    </>)}
                    {middleComponentToggle.toggleQuestionList && (<>
                        <button onClick={() => {
                            middleComponentToggleFunction("toggleQuestionList")
                        }}>Back
                        </button>
                    </>)}
                </>)}
                {!toggleList.codeEditorToggle ? (
                    <>
                        <div className={DashboardStyle.left_section}>
                        <LeftSection/>
                        </div>
                        {!middleComponentToggle.toggleExamSection && (<>
                            <center>
                            <div className={DashboardStyle.question_container}>
                                <button className={DashboardStyle.btn} onClick={(e) => {
                                    middleComponentToggleFunction("toggleExamSection");
                                    fetchTestData(e).then();
                                }}>TEST LIST
                                </button>
                                <button className={DashboardStyle.btn} onClick={() => {
                                    middleComponentToggleFunction("toggleAddQuestion");
                                }}>Add Question
                                </button>
                                <button className={DashboardStyle.btn} onClick={() => {
                                    middleComponentToggleFunction("toggleQuestionList");
                                }}>Question List
                                </button>
                            </div>
                            </center>
                        </>)}
                        <br/><br/>
                        {middleComponentToggle.toggleQuestionList && (<>
                            <div className={DashboardStyle.question_container}>
                                <CodingQuestionList/>
                            </div>
                        </>)}
                        {middleComponentToggle.toggleExamSection && (<>
                            <div className={DashboardStyle.question_container}>
                                <ExamSet list={{examTestList}}/>
                            </div>
                        </>)}
                        {middleComponentToggle.toggleAddQuestion && (<>
                                <div className={DashboardStyle.question_container}>
                                    <AddCodingQuestion/>
                                </div>
                            </>
                        )}
                            <div className={DashboardStyle.right_section}>
                            </div>
                            </>
                        ) : (
                            <>
                            <button onClick={()=>{
                                toggleFunction.codeEditorToggleFunction()
                            }}>Back</button>
                            <CodeEditor Question={{question: questionId}}/>
                        </>
                    )}
                    </div>
                    </>)
}