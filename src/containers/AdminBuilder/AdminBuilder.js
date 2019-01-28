import React, {Component} from 'react';

import axios from 'axios';

import PicturesList from './PicturesList/PicturesList';
import AddPicture from './AddOrEditPicture/AddOrEditPicture';
import ViewPicture from './ViewPicture/ViewPicture';

import classes from './AdminBuilder.css';

class AdminBuilder extends Component {
    state = {
        addPic: false,
        radioTooltip: ['top', 'right', 'bottom', 'left'],
        selectedPicture: null,
        file: null,
        checkedRadio: null,
        tooltipText: null,
        modalShow: false,
        modalText: '',
        textInputRef: React.createRef(),
        radioInputRef: React.createRef(),
        fileInputText: React.createRef(),
        onePic: '',
        editedId: '',
        openPic: false,
        whichWindowToShow: ''
    };

    addNewPic = () => {
        this.setState({
            addPic: true,
            whichWindowToShow: 'add'
        })
    };

    goBackToList = () => {
        this.setState({
            addPic: false,
            selectedPicture: null,
            openPic: false,
            whichWindowToShow: ''
        });
    };

    selectedPictureUploadHandler = (event) => {
        let reader = new FileReader();
        let file = event.currentTarget.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                selectedPicture: reader.result
            });
        };

        const size = event.currentTarget.files[0].size;
        const format = event.currentTarget.files[0].type;
        const maxSize = 1000000;

        const types = ['image/jpeg', 'image/png'];

        if (size > maxSize || types.indexOf(format) < 0) {
            this.setState({
                modalShow: true,
                modalText: 'Please, check image size or format'
            });
            this.state.fileInputText.current.value = '';
        } else {
            reader.readAsDataURL(file);
        }
    };

    modalClose = () => {
        this.setState({
            modalShow: false,
            modalText: ''
        })
    };

    radioHandler = event => {
        this.setState({
            checkedRadio: event.currentTarget.id
        })
    };

    tooltipHandler = event => {
        this.setState({
            tooltipText: event.currentTarget.value
        })
    };

    uploadNewPicInfo = () => {
        const picObj = {
            'image': this.state.selectedPicture,
            'tooltipText': this.state.tooltipText,
            'tooltipPos': this.state.checkedRadio
        };

        if (this.state.selectedPicture === null || this.state.tooltipText === null || this.state.checkedRadio === null) {
            this.setState({
                modalShow: true,
                modalText: 'Please fill all inputs',
                selectedPicture: null
            });
        } else if (this.state.selectedPicture !== null && this.state.tooltipText !== null && this.state.checkedRadio !== null) {
            axios.post('https://tooltip-f2a5e.firebaseio.com/tooltip.json', {pic: picObj})
                .then(res => {
                    this.setState({
                        modalShow: true,
                        modalText: 'Thank you, your image was save',
                        selectedPicture: null
                    });

                    this.state.textInputRef.current.value = '';
                    this.state.fileInputText.current.value = '';

                    for (let i = 0; i < this.state.radioTooltip.length; i++) {
                        this.state.radioInputRef.current[i].checked = false
                    }

                    this.props.getPicList();
                });
        }
    };

    updatePic = () => {
        const id = this.state.editedId;

        let radio;
        for (let i = 0; i < this.state.radioInputRef.current.length; i++) {
            if (this.state.radioInputRef.current[i].checked === true) {
                radio = i
            }
        }

        const tooltipText = this.state.tooltipText === null ? this.state.textInputRef.current.value : this.state.tooltipText;
        const tooltipPos = this.state.checkedRadio === null ? radio : this.state.checkedRadio;
        const tooltipPic = this.state.selectedPicture === null ? this.state.onePic.image : this.state.selectedPicture;

        const picObj = {
            'image': tooltipPic,
            'tooltipText': tooltipText,
            'tooltipPos': tooltipPos
        };

        axios.put(`https://tooltip-f2a5e.firebaseio.com/tooltip/${id}.json`, {pic: picObj})
            .then(res => {
                this.setState({
                    modalShow: true,
                    modalText: 'Thank you, your image was edited',
                });
                this.props.getPicList();
            });
    };

    editPic = id => {
        axios.get(`https://tooltip-f2a5e.firebaseio.com/tooltip/${id}.json`)
            .then(res => {
                this.setState({
                    onePic: res.data.pic,
                    editedId: id,
                    whichWindowToShow: 'edit',
                    addPic: true
                })
            })
    };

    openPicToView = id => {
        axios.get(`https://tooltip-f2a5e.firebaseio.com/tooltip/${id}.json`)
            .then(res => {
                this.setState({
                    onePic: res.data.pic,
                    editedId: id,
                    openPic: true
                })
            })
    };

    render() {
        let containerToView = '';

        if (this.state.addPic) {
            containerToView = <AddPicture
                goBack={this.goBackToList}
                fileInputText={this.state.fileInputText}
                radioInputRef={this.state.radioInputRef}
                textInputRef={this.state.textInputRef}
                modalText={this.state.modalText}
                modalShow={this.state.modalShow}
                modalClose={this.modalClose}
                tooltipHandler={this.tooltipHandler}
                radioHandler={this.radioHandler}
                radioTooltip={this.state.radioTooltip}
                selectedPicture={this.state.selectedPicture}
                selectPictureHandler={this.selectedPictureUploadHandler}
                upload={this.state.whichWindowToShow === 'add' ? this.uploadNewPicInfo : this.updatePic}
                onePic={this.state.onePic}
                whichWindowToShow={this.state.whichWindowToShow}/>
        } else if (this.state.openPic) {
            containerToView = <ViewPicture
                goBack={this.goBackToList}
                onePic={this.state.onePic}/>
        } else {
            containerToView = <PicturesList
                editPic={this.editPic}
                deletePic={this.props.deletePic}
                pictureList={this.props.pictureList}
                onAddPic={this.addNewPic}
                whichComponent={this.props.whichComponent}
                openPic={this.openPicToView}/>;
        }

        return (
            <div className={classes.AdminBuiderWrapper}>
                <p className={classes.AdminTitle}>Admin Panel</p>
                {containerToView}
            </div>
        )
    }
}

export default AdminBuilder;