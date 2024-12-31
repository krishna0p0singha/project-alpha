import {useContext, useEffect} from "react";
import GlobalControlContext from "../GlobalController";
import {QuestionSelectorStyle} from "../Style/StyleLibrary";

export default function ListOfCodingQuestion({list}){
    // console.log(list.list);
    const {toggleFunction, addToEditor}=useContext(GlobalControlContext);


    const openEditor = (index) => {

        if (list.list && index >= 0 && index < list.list.length) {
            addToEditor(list.list[index].questionID);
            // console.log(list.list[index].questionID);
            toggleFunction.codeEditorToggleFunction();
        } else {
            console.error("Invalid index or questions not loaded yet");
        }
    };
    useEffect(() => {
                // fetchData();
    }, []);
    return(<>
        {list.list !== null && (
            <>
                <div className={QuestionSelectorStyle.question_item}>
                    <table>
                        <thead>
                        <tr>
                            <th>Attempt</th>
                            <th>Question</th>
                            <th>Question Topic</th>
                            <th>Level</th>
                        </tr>
                        </thead>
                        {list.list.map((item, index) => {
                    return (
                        <tbody key={index}>
                        <tr>
                            <td className={QuestionSelectorStyle.question_item_style}>
                                <button key={index} onClick={() => {
                                    openEditor(index);
                                }}>Attempt Now
                                </button>
                            </td>
                            <td className={QuestionSelectorStyle.question_item_style}>
                                {item['question']}
                            </td>
                            <td className={QuestionSelectorStyle.question_item_style}>
                                {item['tags'].map((tag, tagIndex) => {
                                    return (
                                        <div key={tagIndex}  className={QuestionSelectorStyle.tag_item}>
                                                {tag}
                                        </div>
                                    )
                                })}
                            </td>
                            <td className={QuestionSelectorStyle.question_item_style}>
                                {item['questionLevel']}
                            </td>
                        </tr>
                        </tbody>
                    )
                        })}
                    </table>
                </div>
            </>)}
    </>)
}