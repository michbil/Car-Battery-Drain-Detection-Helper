/**
 * Created by michbil on 02.05.17.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    Image,
    TouchableHighlight,
    View
} from 'react-native';

const fuses = ["5","10","15","20","25","30","5m","7.5m","10m"];

const imageResources = {
    "5" : require('../img/5.png'),
    "5m" : require('../img/5m.png'),
    "7.5m":  require('../img/7.5m.png'),
    "10" : require('../img/10.png'),
    "10m" : require('../img/10m.png'),
    "15" : require('../img/15.png'),
    "20" : require('../img/20.png'),
    "25" : require('../img/25.png'),
    "30" : require('../img/30.png')
}

export default class FuseList extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => console.log(r1, r2)});
        this.state = {
            loaded: false,
            dataSource: this.ds.cloneWithRows(this.selectFuse(fuses,this.props.initialSelection)),
            selected: this.props.initialSelection
        };
    }

    selectFuse(fuses,sel) {
        return fuses.map((x)=> {
            return {name: x,selected:x == sel}
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.mounted = false;
    }


    details(id) {
       this.props.selectFuse(id);
       this.setState({
           selected:id,
           dataSource: this.ds.cloneWithRows(this.selectFuse(fuses,id))
       });

    }


    renderRow(rowData:string, sectionID:number, rowID:number) {

        const name = rowData.name;
        const selected = rowData.selected;
        const img = imageResources[name];
        const color = selected ? {backgroundColor: '#DDD'} : {};
        return (
            <TouchableHighlight onPress={this.details.bind(this,name)} underlayColor="#B5B5B5">
                <View style={[styles.rowstyleAlign,color]}>
                    <Image
                        source={img}
                        resizeMode={"contain"}
                        style={{width: 50, height: 50}}
                        />
                    <Text style={{textAlign: "center"}} >{name}</Text>
                </View>

            </TouchableHighlight>);
    }


    render() {
        return (<View style={{flex:1}}><ListView enableEmptySections={true} horizontal={true}
                                               dataSource={this.state.dataSource}
                                               renderRow={this.renderRow.bind(this)}
                    /></View>);
    }
}

var styles = {
    rowstyleAlign: {
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        padding: 10
    }
}