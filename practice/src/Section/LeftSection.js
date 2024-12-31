import {LeftSectionStyle} from "../Style/StyleLibrary";
import {useContext} from "react";
import GlobalControlContext from "../GlobalController";

export default function LeftSection() {
    const {  leftSectionComponentToggle,leftSectionComponentToggleFunction}=useContext(GlobalControlContext);
    return (
        <>
            <div className={LeftSectionStyle.menu_container}>
                        <img src={""} alt={""}/>
                        {!leftSectionComponentToggle.toggleMenu && (<>
                        <button className={LeftSectionStyle.menu_btn}
                                onClick={() => {
                                    leftSectionComponentToggleFunction("profileToggle");
                                }}
                        >Profile
                        </button>
                        <button className={LeftSectionStyle.menu_btn}
                                onClick={() => {
                                    leftSectionComponentToggleFunction("competitionToggle");
                                }}
                        >Competition
                        </button>
                        <button className={LeftSectionStyle.menu_btn}
                                onClick={() => {
                                    leftSectionComponentToggleFunction("statisticToggle");
                                }}
                        >Statistic
                        </button>
                        <button className={LeftSectionStyle.menu_btn}
                        >Generate Test Question
                        </button>
                        <button className={LeftSectionStyle.menu_btn}>Logout</button>
                </>)}
            </div>

            {leftSectionComponentToggle.profileToggle && (
                <>
                    <div className={LeftSectionStyle.left_section_container}>
                        Profile
                    </div>
                </>
                )}
                {leftSectionComponentToggle.statisticToggle && (
                    <>
                    <div className={LeftSectionStyle.left_section_container}>
                        Statistic
                    </div>
                    </>
                    )}
                    {leftSectionComponentToggle.competitionToggle && (
                        <>
                        <div className={LeftSectionStyle.left_section_container}>
                            Competition
                        </div>
                        </>
                        )}
                </>
                )
            }