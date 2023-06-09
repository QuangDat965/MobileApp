import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class  DataRealTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
          tempature : 0,
          humidity: 0,
          moisture: 0,
        };
      }

      // componentDidMount() {      
      //     this.interval = setInterval(() => {
      //       fetch("http://192.168.1.248:83/api/SmallHolding/getdatasensorrealtime", {
      //           method: 'GET', //phương thức request
      //           headers: { //header của request
      //             'Content-Type': 'application/json',
      //             'Authorization': 'Bearer ' + "",
      //           },
      //            dữ liệu được gửi đi (trong trường hợp POST và PUT)
      //         })
      //         .then(response => response.json())
      //         .then( async json => {
      //           console.log('Response:', json);
      //           this.setState({
      //               tempature : json.tempature,
      //               moisture: json.moisture,
      //               humidity: json.humidity
      //           })
      //         })
      //         .catch(error => {
      //           Alert.alert('fetch Fail');
      //           console.error('Error:', error);           
      //         });
      //     }, 5000);
      // }
      componentWillUnmount() {
        // Xóa interval khi component unmount
        clearInterval(this.interval);
      }
   render() {
    
    return (
      <View style= {styles.tableDataValue}>
      <View style = {styles.row}>
          <View style = {styles.dataValue}>
              <Image style ={{width:30, height: 30}} source={require('../../assets/temp.jpg')}/>
              <Text>Temperature</Text>
              <Text style = {{color: 'blue'}}>37&#8451; </Text>
          </View>

          <View style = {styles.dataValue}>
          <Image style ={{width:30, height: 30}} source={require('../../assets/sun.jpg')}/>
              <Text>Brightness</Text>
              <Text style = {{color: 'blue'}}>37% </Text>
          </View>
      </View>

      <View style = {styles.row}>
          <View style = {styles.dataValue}>
          <Image style ={{width:30, height: 30}} source={require('../../assets/humidity.png')}/>
              <Text>Humudity</Text>
              <Text style = {{color: 'blue'}}>37%; </Text>
          </View>

          <View style = {styles.dataValue}>
          <Image style ={{width:30, height: 30}} source={require('../../assets/moisture.jpg')}/>
              <Text>Moisture</Text>
              <Text style = {{color: 'blue'}}>37&#8451; </Text>
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

export default DataRealTime;
