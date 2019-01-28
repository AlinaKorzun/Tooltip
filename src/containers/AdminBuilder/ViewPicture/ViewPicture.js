import React from 'react';

import classes from './ViewPicture.css';
import Button from "../../../components/UI/Button/Button";

const viewPicture = props => {
    const tooltipPos = {
        0: 'Top',
        1: 'Right',
        2: 'Bottom',
        3: 'Left'
    };

    const pic = props.onePic.image;

    return (
        <div className={classes.ViewPicture}>
            <div className={classes.GoBackBtn}>
                <Button onclick={props.goBack}>Go back</Button>
            </div>

            <span>Look at your Picture</span>

            <div className={classes.ViewPicture_all}>
                <div className={classes.ViewPicture_part}>
                    <img src={pic} alt="Your tooltip"/>
                </div>

                <div className={classes.ViewPicture_part}>
                    <div className={classes.SpanWrapper}>
                        <span>Your tooltip text:&nbsp;</span>
                        <span>{props.onePic.tooltipText}</span>
                    </div>

                    <div className={classes.SpanWrapper}>
                        <span>Your tooltip position:&nbsp;</span>
                        <span>{tooltipPos[props.onePic.tooltipPos]}</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default viewPicture;