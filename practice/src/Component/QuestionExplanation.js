import {useEffect,useState} from "react";

export default function QuestionExplanation({Question}) {
    const [question, setQuestion] = useState(null)
    useEffect(() => {
        try {
            setQuestion(Question.question)
        }catch (error) {

        }
    }, []);
    return(
        <>
            <header>Question Explanation</header>
            {question !== null && (<>
                {question.question}<br/>
                {question.explanation}<br/>
                <label>Input : </label>
                <div>
                    {question.testCases.inputCase[0]}<br/>
                </div>
                <label>Output : </label>
                <div>
                    {question.testCases.outputCase[0]}
                </div>
                <label>Input 2 : </label>
                <div>
                    {question.testCases.inputCase[1]}<br/>
                </div>
                <label>Output 2 : </label>
                <div>
                    {question.testCases.outputCase[1]}
                </div>
            </>)}
        </>
    )
}