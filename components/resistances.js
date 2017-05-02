/**
 * Created by michbil on 02.05.17.
 */
/**
 * Created by michbil on 02.05.17.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';


const formatMV = (v) =>`${v} mV`;
const formatMA = (v) => `${parseFloat(v).toFixed(1)} mA`;
const toAmp = (mv,res) => (mv)/res;



const resistanceTable = {
    "30": 0.00162601626	,
    "25": 0.002133333333,
    "20": 0.003289473684,
    "15": 0.004424778761,
    "10": 0.007490636704,
    "5":  0.01515151515,
    "5m": 0.01666666667	,
    "7.5m":0.01005025126,
    "10m":0.007042253521
};

const maList = [0.1,  0.2, 0.3,  0.5, 0.7, 0.8, 0.9,  1,  1.5,   2,    3,    4,    5,    6,    7,    8,    9,    10,    11, 12, 13,14,15];

function toPaddedHexString(num, len) {
    str = num.toString(16);
    return "0".repeat(len - str.length) + str;
}

export default class Resistances extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => console.log(r1, r2)});
        this.state = {
            loaded: false,
            dataSource: this.ds.cloneWithRows(this.calcRows(maList,this.props.fuse))
        };
    }

    calcRows (data,r) {
        const R = resistanceTable[r];
        const head = [{
            mv:"milliVolts",
            i: "Current",
            color: "#aaa"
        }]
        const result =  data.map((row)=>{
            const I = toAmp(row,R);
            return {
                mv: formatMV(row),
                i: formatMA(I),
                color: this.calcColor(I)
            }
        });
        return head.concat(result);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.ds.cloneWithRows(this.calcRows(maList,nextProps.fuse))
        })
    }


    componentDidMount() {

    }

    componentWillUnmount() {
        this.mounted = false;
    }

    calcColor(resMa) {
        const clamp = (v,min,max) => Math.min(Math.max(v, min), max);
        const scale = clamp(resMa / 220,0,1);
        const median = 0.3;
        const formatHex = (x) => toPaddedHexString(parseInt(clamp(x,0,255)),2);
        redComponent = (scale)*255;
        greenComponent = (1-scale)*255;
        return `#${formatHex(redComponent)}${formatHex(greenComponent)}0033`
    }


    renderRow(rowData:string, sectionID:number, rowID:number) {
        return (
            <TouchableHighlight underlayColor="#B5B5B5">
                <View style={[{flex:1, flexDirection:"row",height:30,alignItems: "center",justifyContent:"center"},{backgroundColor:rowData.color}]}>
                    <View style={styles.rowstyleAlign}>
                        <Text style={{textAlign:"center"}}>{rowData.mv}</Text>
                    </View>
                    <View style={[styles.rowstyleAlign,{flex:2}]}>
                        <Text style={{textAlign:"center"}}>{rowData.i}</Text>
                    </View>
                </View>
            </TouchableHighlight>);
    }


    render() {
        return (<View style={{flex:4}}>
            <ListView enableEmptySections={true}
                           dataSource={this.state.dataSource}
                           renderRow={this.renderRow.bind(this)}
            /></View>);
    }
}

var styles = {
    rowstyleAlign: {
        flex:1,
        padding: 5,
        justifyContent: 'center',
    }
};