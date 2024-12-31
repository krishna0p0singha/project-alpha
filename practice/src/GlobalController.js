import {useState, createContext, } from "react";

const GlobalControlContext=createContext({});
export const GlobalControllerProvider = ({ children }) => {
    const [testList,setTestList]=useState(null);
    const [questionId, setQuestionId] = useState(null);
    const [leftSectionComponentToggle, setLeftSectionComponentToggle] = useState({
        profileToggle:false,
        statisticToggle:false,
        competitionToggle:false,
        toggleMenu: false
    });
    const [middleComponentToggle, setMiddleComponentToggle] = useState({
        toggleAddQuestion:false,
        toggleExamSection:false,
        toggleQuestionList: false
    });
    const [toggleExamList, setToggleExamList] = useState({
        toggleTestList:false,
    })
    const addQuestionFunction = (questionList) => {
            setTestList(questionList);
    };

    const leftSectionComponentToggleFunction = (key) => {
        setLeftSectionComponentToggle((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
            profileToggle: key === "profileToggle" ? !prevState[key] : false,
            statisticToggle: key === "statisticToggle" ? !prevState[key] : false,
            competitionToggle: key === "competitionToggle" ? !prevState[key] : false,
            toggleMenu: key === "toggleMenu" ? !prevState[key] : false,
        }));
    };
    const middleComponentToggleFunction=(key)=>{
        setMiddleComponentToggle((prevState)=>({
            ...prevState,
            [key]: !prevState[key],
            toggleAddQuestion: key==="toggleAddQuestion"? !prevState[key]:false,
            toggleExamSection:key==="toggleExamSection"? !prevState[key]:false,
            toggleQuestionList:key==="toggleQuestionList"? !prevState[key]:false,

        }));
    };
    const examToggleFunction=(key)=>{
        setToggleExamList((prevState)=>({
            ...prevState,
            [key]: !prevState[key],
            toggleTestList: key==="toggleTestList"? !prevState[key]:false,
        }))
    }
    const [toggleList, setToggleList] = useState({
        codeEditorToggle: false,
    });
    const toggleFunction={
        codeEditorToggleFunction: () => {
            setToggleList({...toggleList, codeEditorToggle: !toggleList.codeEditorToggle});
            // examToggleFunction("toggleTestList");
        }
    };
    const addToEditor=(question)=>{
        setQuestionId(question);
    }
return(<>
<GlobalControlContext.Provider value={{
    toggleList,toggleFunction,addToEditor,questionId,
    leftSectionComponentToggle,leftSectionComponentToggleFunction,
    middleComponentToggle, middleComponentToggleFunction,
    testList,addQuestionFunction,
    toggleExamList,examToggleFunction
}}>
    {children}
</GlobalControlContext.Provider>

</>)
}
export default GlobalControlContext;