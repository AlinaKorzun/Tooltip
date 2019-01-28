import React from 'react';
import classes from "./Input.css";
import Aux from '../../../hoc/Aux/Aux';

const input = props => {
    let input_type;

    switch (props.type) {
        case 'text':
            input_type = <input
                type={props.type}
                onChange={props.tooltipHandler}
                ref={props.textInputRef}
                defaultValue={props.value}
                placeholder={props.placeholder}/>;
            break;

        case 'radio':
            input_type = props.radioTooltip.map((radio, index) => (

                <Aux key={index}>
                    <input
                        type={props.type}
                        id={index}
                        defaultChecked={index === parseFloat(props.checkedRadio)}
                        onChange={props.radioHandler}
                        name={props.name}/>
                    <label htmlFor={index}>{radio} </label>
                </Aux>
            ));
            break;

        case 'file':
            input_type = <input
                type={props.type}
                ref={props.fileInputText}
                onChange={props.onchange}/>;
            break;

        default:
            input_type = <input
                type={props.type}
                onChange={props.tooltipHandler}
                placeholder={props.placeholder}/>;
    }

    return (
        <div className={classes.Input_wrapper}>
            <span>{props.children}</span>
            {input_type}
        </div>
    )
};

export default input;