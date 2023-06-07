import React from "react";
import { View, StyleSheet, Text, Image, Switch } from "react-native";
import MqttService from "../../Mqtt/MqttService";
import {systemUrl, url} from "../../Constant/Request"

const mqttService = new MqttService();
const client = mqttService.getCLient();

export default class DataControl extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            device : this.props.device,
            spinkklers: false,
            fan: false,
            lamp: false,
            coverd: false

        }
    }
    componentDidMount(){
        this.connectMqtt();
        
    }
    connectMqtt(){
        client.onConnectionLost = this.onConnectionLost.bind(this);
        client.onMessageArrived = this.onMessageArrived.bind(this);
        if(!client.isConnected())
        mqttService.connect(this.callbackConnect.bind(this));
    }
    onConnectionLost() {
        console.log("lost connect");
        this.connectMqtt();
    }
    onMessageArrived(message) {
       
        var topic = message.topic.split('/');
        if(topic[3]=="IsOnFan"){
            message.payloadString==0?
            this.setState({fan: false}):
            this.setState({fan: true});
        }
        if(topic[3]=="IsOnWater"){
            message.payloadString==0?
            this.setState({spinkklers: false}):
            this.setState({spinkklers: true})
        }
        if(topic[3]=="IsOnLamp"){
            message.payloadString==0?
            this.setState({lamp: false}):
            this.setState({lamp: true})
        }
        if(topic[3]=="IsOnCover"){
            message.payloadString==0?
            this.setState({coverd: false}):
            this.setState({coverd: true})
        }
       
    }
    callbackConnect() {
        console.log("connect Succes");
        mqttService.subscribeTopic(`${systemUrl}`+"/#");
        // mqttService.subscribeTopic(`${systemUrl}`+`${this.state.device}`+"/#");
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
    componentWillUnmount() {
        
    }
    render(){

        return( 
            <View style= {styles.tableDataValue}>
            <View style = {styles.row}>
                <View style = {styles.dataValue}>
                    <Image style ={{width:30, height: 30}} source={require('../../../assets/water.jpg')}/>
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
                <Image style ={{width:30, height: 30}} source={require('../../../assets/lamp.jpg')}/>
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
                <Image style ={{width:30, height: 30}} source={require('../../../assets/fan.jpg')}/>
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
                <Image style ={{width:30, height: 30}} source={require('../../../assets/umbrela.jpg')}/>
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
      