import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import MqttService from "../../Mqtt/MqttService";
import {systemUrl} from "../../Constant/Request"

const mqttService = new MqttService();
const client = mqttService.getCLient();

export default class DataSensor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            device : this.props.device,
            Tempature: '',
            Humudity: '',
            Brightness: '',
            Moisture: '',

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
        if(topic[3]=="temperature"){
            this.setState({Tempature: message.payloadString})
        }
        if(topic[3]=="moisture"){
            this.setState({Moisture: message.payloadString})
        }
        if(topic[3]=="humidity"){
            this.setState({Humudity: message.payloadString})
        }
        if(topic[3]=="brightness"){
            this.setState({Brightness: message.payloadString})
        }
       
    }
    callbackConnect() {
        console.log("connect Succes");
        mqttService.subscribeTopic(`${systemUrl}`+"/thisisdeviceid1"+"/#");
        // mqttService.subscribeTopic(`${systemUrl}`+`${this.state.device}`+"/#");
    }
    componentWillUnmount() {
        
    }
    render(){

        return( 
            <View style= {styles.tableDataValue}>
      <View style = {styles.row}>
          <View style = {styles.dataValue}>
              <Image style ={{width:30, height: 30}} source={require('../../../assets/temp.jpg')}/>
              <Text>Temperature</Text>
              <Text style = {{color: 'blue'}}>{this.state.Tempature}&#8451; </Text>
          </View>

          <View style = {styles.dataValue}>
          <Image style ={{width:30, height: 30}} source={require('../../../assets/sun.jpg')}/>
              <Text>Brightness</Text>
              <Text style = {{color: 'blue'}}>{this.state.Brightness}% </Text>
          </View>
      </View>

      <View style = {styles.row}>
          <View style = {styles.dataValue}>
          <Image style ={{width:30, height: 30}} source={require('../../../assets/humidity.png')}/>
              <Text>Humudity</Text>
              <Text style = {{color: 'blue'}}>{this.state.Humudity}%; </Text>
          </View>

          <View style = {styles.dataValue}>
          <Image style ={{width:30, height: 30}} source={require('../../../assets/moisture.jpg')}/>
              <Text>Moisture</Text>
              <Text style = {{color: 'blue'}}>{this.state.Moisture}&#8451; </Text>
          </View>
      </View>

      
  </View>
        )
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
      borderRadius: 100,
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