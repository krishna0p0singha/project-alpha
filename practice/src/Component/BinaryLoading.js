import React from "react";
import "../App.css";

const BinaryLoading = () => {
    const binaryStrings = [
        "0101010101010101010101010101",
        "1010101010101010101010101010",
        "0101010101010101010101011010",
        "1010101010101010101010101010",
    ];

    return (
        <div className="loading-container">
            {binaryStrings.map((binary, index) => (
                <div className="binary-line" key={index}>
                    {binary.split("").map((char, charIndex) => (
                        <span
                            className="binary-char"
                            key={charIndex}
                            style={{
                                animationDelay: `${0.1 * (index + charIndex)}s`,
                            }}
                        >
              {char}
            </span>
                    ))}
                </div>
            ))}
        </div>
    );
};

const App = () => {
    return (
        <div className="App">
            <BinaryLoading />
        </div>
    );
};

export default App;
