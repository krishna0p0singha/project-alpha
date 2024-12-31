import {useEffect, useState} from "react";
import {ListOfCodingQuestion} from "./ComponentLibrary";
import {CODING_API_URL} from "../GlobalVariable";

export default function CodingQuestionList() {
    const [questions, setQuestions] = useState(null);
    const fetchQuestions = async () => {
     try{
         let result = await fetch(`${CODING_API_URL}get_coding_question_list`);
         result = await result.json();
         if(result.success){
             // console.log(result['question']);
             setQuestions(result['question']);
         }
     }catch (e) {

     }   
    }
    useEffect(() => {
        fetchQuestions().then();
    }, []);
    return(
        <>
            {questions !== null && (<>
            <ListOfCodingQuestion list={{list: questions}} />
            </>)}
        </>
    )
    
}