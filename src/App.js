import React, {Component} from 'react';

import axios from "axios";

import AdminBuilder from './containers/AdminBuilder/AdminBuilder';
import ClientBuilder from './containers/ClientBuilder/ClientBuilder';
import Header from './components/Header/Header';
import Aux from './hoc/Aux/Aux';


class App extends Component {
    state = {
        componentToShow: 'admin',
        pictureList: []
    };

    componentDidMount() {
        this.getPicturesListFromServer()
    };

    getPicturesListFromServer = () => {
        axios.get('https://tooltip-f2a5e.firebaseio.com/tooltip.json')
            .then(res => {
                const listData = res.data;
                let list = [];

                for (const key in listData) {
                    list.push({
                        id: key,
                        pic: listData[key].pic.image,
                        tooltip: listData[key].pic.tooltipText,
                        tooltipPos: listData[key].pic.tooltipPos
                    })
                }

                this.setState({
                    pictureList: list
                })
            })
    };

    deletePic = id => {
        axios
            .delete(`https://tooltip-f2a5e.firebaseio.com/tooltip/${id}.json`)
            .then(res => {
                const newArray = this.state.pictureList.filter((item) => item.id !== id);
                this.setState({
                    pictureList: newArray
                })
            })
            .catch(err => console.log(err));
    };

    componentToShowHandler = (payload) => {
        this.setState({
            componentToShow: payload
        });
    };

    render() {
        const componentToShow = this.state.componentToShow === 'admin' ?
            <AdminBuilder
                deletePic={this.deletePic}
                pictureList={this.state.pictureList}
                getPicList={this.getPicturesListFromServer}
                whichComponent={this.state.componentToShow}/> :
            <ClientBuilder
                pictureList={this.state.pictureList}
                whichComponent={this.state.componentToShow}/>;

        return (
            <Aux>
                <Header onclick={this.componentToShowHandler}/>
                {componentToShow}
            </Aux>
        );
    }
}

export default App;
