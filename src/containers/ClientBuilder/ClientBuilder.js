import React, {Component} from 'react';

import PicturesList from '../AdminBuilder/PicturesList/PicturesList';
import classes from './ClientBuilder.css';

class ClientBuilder extends Component {
    state = {
        isShowTooltipId: false
    };

    showTooltip = (id) => {
        this.setState({
            isShowTooltipId: id
        })
    };

    hideTooltip = () => {
        this.setState({
            isShowTooltipId: ''
        })
    };

    render() {
        return (
            <div className={classes.ClientBuilder}>
                <p className={classes.ClientTitle}>Client Panel</p>
                <PicturesList
                    pictureList={this.props.pictureList}
                    whichComponent={this.props.whichComponent}
                    isShowTooltip={this.state.isShowTooltipId}
                    showTooltip={this.showTooltip}
                    hideTooltip={this.hideTooltip}/>
            </div>
        )
    }
}

export default ClientBuilder;