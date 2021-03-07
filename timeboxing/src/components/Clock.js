import React from 'react';
import PropTypes from 'prop-types';

function Clock({className, hours, minutes, seconds, miliseconds}) {
    return <h2 className={"Clock " + className}>Pozostało {minutes > 9 ? minutes : "0" + minutes}:{seconds > 9 ? seconds : "0" + seconds}</h2>;
}

Clock.defaultProps = {
    className: "",
}

// function NonNegativeType(props, propName, componentName) {
//     if(props[propName] > 0) {
//         return new Error(`Invaild prop ${propName} issued to component ${componentName}. It has to be greater or equal to 0.`);
//     }
// }

const NumberOrStringType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

Clock.propTypes = {
    className: PropTypes.string,
    hours: NumberOrStringType,
    minutes: NumberOrStringType.isRequired,
    seconds: NumberOrStringType,
    miliseconds: NumberOrStringType
}

export default Clock;