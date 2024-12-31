import {Pass,Failed} from '../Images/ImageLibrary';
import {OutputComponentStyle} from '../Style/StyleLibrary';
export default function OutputComponent({output}){
    return(
        <>
            <div className={OutputComponentStyle.main_container}>
            <center>
                <header>Test Cases</header>
            </center>
            {output.output !== null ? (
                <>
                        {output.output.map((item, key) => {
                            return (
                                <div key={key} className={OutputComponentStyle.test_cases}>
                                    <div>
                                        <div className={OutputComponentStyle.input}>Input</div>
                                        <div>[ {output.input[key]} ]</div>
                                    </div>
                                    <div>
                                        <div className={OutputComponentStyle.output}>Output</div>
                                        <div>{output.output[key]}</div>
                                    </div>
                                    <div>
                                        <div className={OutputComponentStyle.status_pass}>Status</div>
                                        <div className={"status-pass"}> {output.result[key] ? (
                                            <>
                                                <img src={Pass} className={OutputComponentStyle.status_icon} alt={""}/>
                                                <br/>
                                                <hr style={{backgroundColor:'green'}}/>
                                            </>
                                        ) : (<>
                                            <img src={Failed} className={OutputComponentStyle.status_icon} alt={""}/>
                                            <br/>
                                            <hr style={{backgroundColor:'red'}}/>
                                        </>)}
                                        </div>
                                    <br/>
                                    </div>
                                </div>
                            )
                        })}

                </>
            ) : (
                <>
                    <div className={OutputComponentStyle.test_cases}>
                        <center>No output found.</center>
                    </div>
                </>
            )}
            </div>
        </>);
};