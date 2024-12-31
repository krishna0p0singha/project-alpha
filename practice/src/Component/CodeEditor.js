import { CodeEditorStyle } from "../Style/StyleLibrary";
import { useEffect, useState } from "react";
import OutputComponent from "./OutputComponent";
import {ErrorComponent, QuestionExplanation} from "./ComponentLibrary";
import BinaryLoading from "./BinaryLoading";
import {CODING_API_URL} from "../GlobalVariable";
import {languages as getExecuteUrlList} from "prismjs/components";

export default function CodeEditor({Question}) {
    const [txt, setTxt] = useState(``);
    const [questions, setQuestions] = useState(null);
    const [output, setOutput] = useState(null);
    const [input, setInput] = useState(null);
    const [testResult, setTestResult] = useState(null);
    const [errorMsg,setErrorMsg]=useState(null);
    const executeUrlList={
        java:"java_program_execute",
        python:"python_program_execute"
    };
    const getCodeUrlList= {
        java:"get_java_question",
        python:"get_python_question"
    };
    const [getCodeUrl,setGetCodeeUrl] = useState(getCodeUrlList.java);
    const [executeUrl,setExecuteUrl] = useState(getExecuteUrlList.java);
    const [loadingIcon,setlLoadingIcon] = useState(false);





    const submitButton =async (e) => {
        e.preventDefault();
        setlLoadingIcon(true);
      try{
          let result = await fetch(`${CODING_API_URL}java_program_execute`,{
              method: "POST",
              body: JSON.stringify({ program : txt,  questionID: Question.question}),
              headers: {
                  "Content-Type": "application/json"
              }
          });
          result = await result.json();
          if(result.success){
              setTestResult(result.output);
              setErrorMsg(null);
              setlLoadingIcon(false);
          }else{
              setTestResult(null);
              setErrorMsg(result.error);
              setlLoadingIcon(false);
          }
      }catch (e) {

      }
    };

    const handleKeyDown = (e) => {

    };
    const fetchQuestion = async (questionId) => {
        try{
            let result = await fetch(`${CODING_API_URL}${getCodeUrl}`,{
                method: "POST",
                body: JSON.stringify({ questionID: questionId}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            result = await result.json();
            if(result.success){
                // console.log(result['question']);
                   setTxt(result['question'].writeMethod);
                   setQuestions(result['question']);
                   setInput(result['question'].testCases.inputCase);
                   setOutput(result['question'].testCases.outputCase);
            }else{
                console.log(result.status);
            }

        }catch (e) {

        }
    }

    useEffect(() => {
        fetchQuestion(Question.question).then();
    }, []);


    return (
        <>
            <div className={CodeEditorStyle.body}>
                <div className={CodeEditorStyle.left_section}>
                    {questions && (
                        <QuestionExplanation Question={
                            {question: questions}
                        }/>
                    )}
                </div>
                <center>
                    <div className={CodeEditorStyle.text_section}>
                    <textarea
                        onKeyDown={handleKeyDown}
                        value={txt}
                        className={CodeEditorStyle.textarea}
                        onChange={(e) => setTxt(e.target.value)}
                    ></textarea>
                        <div className={CodeEditorStyle.btn_container_item}>
                            <button className={`solarized-button ${CodeEditorStyle.btn}`}>Submit Code</button>
                        </div>
                        <div className={CodeEditorStyle.btn_container_item}>
                            <button className={`solarized-button ${CodeEditorStyle.btn}`} onClick={submitButton}>Run
                            </button>
                        </div>
                    </div>

                    <div className={CodeEditorStyle.error_section_style}>
                        {loadingIcon ? (<>
                            <BinaryLoading/>
                        </>) : (<>
                            {errorMsg !== null ? (<>
                                <ErrorComponent errorMsg={{errorMsg: errorMsg.error}}/>
                            </>) : (<>
                                <ErrorComponent errorMsg={{errorMsg: null}}/>
                            </>)}
                        </>)}
                    </div>
                </center>
                <div className={CodeEditorStyle.right_section}>
                    {loadingIcon ? (<>
                        <br/>
                        <BinaryLoading/>
                    </>) : (<>
                        {testResult !== null && input !== null && output !== null ? (<>
                            <OutputComponent output={{input: input, output: output, result: testResult}}/>
                        </>) : (<>
                            <OutputComponent output={{input: input, output: null, result: testResult}}/>
                        </>)}
                    </>)}
                </div>
            </div>
        </>
    );
}
