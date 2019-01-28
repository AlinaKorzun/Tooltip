import React from 'react';

import Button from '../../../../components/UI/Button/Button';
import Aux from '../../../../hoc/Aux/Aux';
import classes from './EachPicture.css';

const eachPicture = props => {

    const tooltipPos = {
        0: 'Top',
        1: 'Right',
        2: 'Bottom',
        3: 'Left'
    };

    const pos = props.tooltipPos;
    const eachPos = tooltipPos[pos];

    const tooltip = (props.isShowTooltip === props.id) ?
        (<div className={classes.Tooltip + ' ' + classes[eachPos]}>
            <div className={classes.Tooltip_Message}>{props.tooltip}</div>
        </div>) : null;

    const openButton = props.whichComponent === 'admin' ?
        <Button onclick={props.openPic} id={props.id}>Open</Button>
        : null;

    const bottomInfo = props.whichComponent === 'admin' ?
        (<Aux>
            <div className={classes.EachPicture__Tooltop_text}>Tooltip text: {props.tooltip}</div>
            <div className={classes.EachPicture__Tooltop_pos}>Tooltip pos: {tooltipPos[pos]}</div>
            <Button onclick={props.editPic} id={props.id}>Edit</Button>
            <Button onclick={props.deletePic} id={props.id}>Delete</Button></Aux>)
        : null;

    const image = props.whichComponent === 'client' ?
        <img
            src={props.pic} alt="Hovered pic"
            onMouseOver={() => props.showTooltip(props.id)}
            onMouseLeave={props.hideTooltip}/>
        : <img
            src={props.pic} alt="Hovered pic"/>;

    return (
        <div className={classes.EachPicture}>
            {openButton}
            {tooltip}
            {image}
            {bottomInfo}
        </div>
    )
};

export default eachPicture;