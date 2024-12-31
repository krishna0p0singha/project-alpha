import {ErrorComponentStyle} from "../Style/StyleLibrary";

export default function ErrorComponent({errorMsg}){
    return(
        <>
            <div className={ErrorComponentStyle.error_body}>
                <header className={ErrorComponentStyle.error_header}>Error</header>
            <div>
                {errorMsg.errorMsg !== null ?(<>
                    <span style={{color:"red",fontWeight:"bold"}}>{errorMsg.errorMsg}</span>
                </>) : (<>
                    <span style={{color:"green",fontWeight:"bold"}}>No error</span>
                </>)}
            </div>
            </div>
        </>
    );
}