import React, { Component } from 'react';
import { View, Text, StyleSheet, Image ,Switch} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class  ActionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {     
          spinkklers: false,
          fan: false,
          lamp: false,
          coverd: false

        };
      }

     
      componentWillUnmount() {
       
      }

      SpinkklersHandle = () => {
        if(this.state.spinkklers){
          this.setState({spinkklers: false})
          
        }
        else {
          this.setState({spinkklers: true})

        }
      }

      LampHandle = () => {
        if(this.state.lamp){
          this.setState({lamp: false})
          
        }
        else {
          this.setState({lamp: true})

        }
      }
      FanHandle = () => {
        if(this.state.fan){
          this.setState({fan: false})
          
        }
        else {
          this.setState({fan: true})

        }
      }
      Coverdhandle = () => {
        if(this.state.coverd){
          this.setState({coverd: false})
          
        }
        else {
          this.setState({coverd: true})

        }
      }
   render() {
    
    return (
      <View style= {styles.tableDataValue}>
      <View style = {styles.row}>
          <View style = {styles.dataValue}>
              <Image style ={{width:30, height: 30}} source={require('../../assets/water.jpg')}/>
              <Text>Sprinklers</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={this.state.spinkklers ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={()=> this.SpinkklersHandle()}
                value={this.state.spinkklers}
              />
          </View>

          <View style = {styles.dataValue}>
          <Image style ={{width:30, height: 30}} source={require('../../assets/lamp.jpg')}/>
              <Text>Lamp</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={this.state.lamp ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={()=> this.LampHandle()}
                value={this.state.lamp}
              />
          </View>
      </View>

      <View style = {styles.row}>
          <View style = {styles.dataValue}>
          <Image style ={{width:30, height: 30}} source={require('../../assets/fan.jpg')}/>
              <Text>Fan</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={this.state.fan ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={()=> this.FanHandle()}
                value={this.state.fan}
              />
          </View>

          <View style = {styles.dataValue}>
          <Image style ={{width:30, height: 30}} source={require('../../assets/umbrela.jpg')}/>
              <Text>Coverd</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={this.state.coverd ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={()=> this.Coverdhandle()}
                value={this.state.coverd}
              />
          </View>
      </View>

      
  </View>

    );
  }
}

const styles = StyleSheet.create({
  row: {
    padding: 3
  },
  dataValue: {
    width: 140,
    height: 140,
    backgroundColor:'#fff',
    marginBottom:10,
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    elevation: 5

},
tableDataValue: {
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#ccc',
    flexDirection: 'row',
},
});

export default ActionComponent;
