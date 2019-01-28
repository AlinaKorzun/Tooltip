import React from 'react';

import Button from "../../../components/UI/Button/Button";
import Aux from '../../../hoc/Aux/Aux';
import EachPicture from './EachPicture/EachPicture';
import classes from './PicturesList.css';

const picturesList = props => {
    const pictureList = props.pictureList.slice(0).reverse();

    let mappedList = pictureList.map((item, index) => (
        <EachPicture
            key={index}
            id={item.id}
            pic={item.pic}
            tooltip={item.tooltip}
            tooltipPos={item.tooltipPos}
            deletePic={props.deletePic}
            editPic={props.editPic}
            openPic={props.openPic}
            isShowTooltip={props.isShowTooltip}
            whichComponent={props.whichComponent}
            showTooltip={props.showTooltip}
            hideTooltip={props.hideTooltip}
        />
    ));

    const buttonAdd = props.whichComponent === 'admin' ?
        (<div className={classes.PictureList__Button_wrapper}>
            <Button onclick={props.onAddPic}>Add New Pic</Button>
        </div>)
        : null;

    return (
        <Aux>
            {buttonAdd}
            <div className={classes.PictureList}>
                {mappedList}
            </div>
        </Aux>
    )
};

export default picturesList;