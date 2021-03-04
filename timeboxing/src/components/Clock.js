import React from 'react';

function Clock({className ="", hours = 1, minutes = 2, seconds = 3, miliseconds = 4}) {
    return <h2 className={"Clock " + className}>Pozostało {minutes > 9 ? minutes : "0" + minutes}:{seconds > 9 ? seconds : "0" + seconds}</h2>;
}

Clock.defaultProps = {
    className: "",
    hours: 1,
    minutes: 2,
    seconds: 3,
    miliseconds: 4
};

export default Clock;