/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import FuseList from "./components/fuses.js"
import Resistances from "./components/resistances.js"

export default class fuse extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selected: "5"
    }
  }
  selectFuse(id) {
    this.setState({selected:id})
  }

  render() {
    return (
        <View style={styles.container}>
          <FuseList style={{height:60}} initialSelection={this.state.selected} selectFuse={this.selectFuse.bind(this)}/>
          <Resistances fuse={this.state.selected} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
AppRegistry.registerComponent('fuse', () => fuse);
