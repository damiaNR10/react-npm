import React from 'react';
import classNames from 'classnames';

function ProgressBar({className ="", percent = "10", trackRemaining = false, big = false, color = null}) {
    let progressClassName = classNames(
        "progress",
        "awd",
        {
            "progress--big": big,
            "progress--color-red": color === "red",
        }
        );

    return (            
        <div className={progressClassName}>
            <div className = "progress__bar" style={{width: `${percent}%`, height: "100%", "marginLeft": trackRemaining == "true" ? "auto" : "initial"}}></div>
        </div>
    );
}

export default ProgressBar;