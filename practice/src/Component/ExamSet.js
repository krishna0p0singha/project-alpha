import {useContext} from "react";
import {ListOfCodingQuestion} from "./ComponentLibrary";
import GlobalControlContext from "../GlobalController";
import {QuestionSelectorStyle} from "../Style/StyleLibrary";
import {CODING_API_URL} from "../GlobalVariable";

export default function ExamSet({list}) {
    const {toggleExamList,examToggleFunction}=useContext(GlobalControlContext);
    const {testList,addQuestionFunction}=useContext(GlobalControlContext);
    // const [toggleQuestionList,setToggleQuestionList] = useState(false);
    // const [questionList,setQuestionList] = useState(null);

const fetchTestQuestion= async (e,examId)=>{
    e.preventDefault();
    try {
        let result = await fetch(`${CODING_API_URL}fetch_test_question`,{
            method:"POST",
            body:JSON.stringify({examId: examId}),
            headers:{
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        if(result.success){
            // console.log(result['questions']);
            examToggleFunction("toggleTestList");
            addQuestionFunction(result['questions']);
        }
    }catch (error) {

    }
}
    return(
        <>
        {!toggleExamList.toggleTestList ? (
            <>
                <table>
                    <thead>
                    <tr>
                        <th>Exam ID</th>
                        <th></th>
                        <th>No. of Question</th>
                        <th></th>
                    </tr>
                    </thead>
                    {list['examTestList'] !== null && list['examTestList'].map((item, index) => {
                    return <tbody key={index}>
                    <tr>
                        <td className={QuestionSelectorStyle.question_item_style}>
                            {item['examId']}
                        </td>
                        <td className={QuestionSelectorStyle.question_item_style}>
                            <button onClick={(e) => {
                                fetchTestQuestion(e, item['examId'], index).then();
                            }}>Attempt Now
                            </button>
                        </td>

                        <td className={QuestionSelectorStyle.question_item_style}>
                            {item['codingQuestionID'].length}
                        </td>
                    </tr>
                    </tbody>
                        })}
                </table>
            </>): (
                <>
                <ListOfCodingQuestion list={{list: testList}}/>
                </>
            )}
        </>
    );
}