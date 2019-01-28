import React from 'react';

import Button from '../UI/Button/Button';
import classes from './Header.css';

const header = props => {
    return(
        <div className={classes.Header}>
            <Button onclick = {props.onclick} id={'admin'}>Admin</Button>
            <Button onclick = {props.onclick} id={'client'}>Client</Button>
        </div>
    )
};

export default header;