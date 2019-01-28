import React from 'react';

import classes from './Button.css';

const button = props => {
    return(
        <div onClick={()=>props.onclick(props.id)} className={classes.Button}>{props.children}</div>
    )
};

export default button;
