import React from 'react';

import classes from './AddOrEditPicture.css';
import emptyPic from '../../../assets/images/download.jpeg';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Modal from '../../../components/UI/Modal/Modal';

const addOrEditPicture = props => {
    let addPicWindowTitle,
        selectedPicture,
        placeholder,
        radioTitle,
        value,
        btnText;

    if (props.whichWindowToShow === 'add') {

        addPicWindowTitle = 'Add Picture';
        selectedPicture = props.selectedPicture === null ? emptyPic : props.selectedPicture;
        placeholder = 'Add tooltip text';
        radioTitle = 'Choose tooltip position';
        value = '';
        btnText = 'Add Picture';

    } else if (props.whichWindowToShow === 'edit') {

        addPicWindowTitle = 'Edit Picture';
        selectedPicture = props.selectedPicture === null ? props.onePic.image : props.selectedPicture;
        placeholder = 'Change your tooltip text';
        radioTitle = 'Change your tooltip position';
        value = props.onePic.tooltipText;
        btnText = 'Save changes'
    }

    return (
        <div className={classes.AddPicture}>
            <Modal show={props.modalShow}
                   modalClose={props.modalClose}>
                {props.modalText}
            </Modal>
            <div className={classes.GoBackBtn}>
                <Button onclick={props.goBack}>Go back</Button>
            </div>

            <span>{addPicWindowTitle}</span>

            <div className={classes.AddPicture_all}>
                <div className={classes.AddPicture_part}>
                    <img src={selectedPicture} alt="Your tooltip"/>

                    <Input
                        type='file'
                        fileInputText={props.fileInputText}
                        onchange={props.selectPictureHandler}/>
                    <p>You can upload image with size max. 1mb. Image formats: png, jpg</p>
                </div>

                <div className={classes.AddPicture_part}>
                    <Input
                        type='text'
                        textInputRef={props.textInputRef}
                        tooltipHandler={props.tooltipHandler}
                        value={value}
                        placeholder='Tooltip text'>
                        <span>{placeholder}</span>
                    </Input>

                    <form ref={props.radioInputRef}>
                        <Input
                            type='radio'
                            checkedRadio={props.onePic.tooltipPos}
                            radioHandler={props.radioHandler}
                            radioTooltip={props.radioTooltip}
                            name='position'>
                            <span>{radioTitle}</span>
                        </Input>
                    </form>
                </div>

                <Button onclick={props.upload}>{btnText}</Button>
            </div>
        </div>
    )
};

export default addOrEditPicture;