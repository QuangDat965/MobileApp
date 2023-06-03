import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Animated , TouchableOpacity, Alert,ScrollView } from 'react-native';
import url from '../../Constant/Request';

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        menu: [{
            Id: 1,
            Icon:"mmm",
            Title: "Quản lí nông trại",
            DateCreate: "2022-02-01"
        },
        {
            Id: 2,
            Icon:"mmm",
            Title: "Quản lí thiết bị",
            DateCreate: "2022-02-01"
        },{
            Id:3,
            Icon:"mmm",
            Title: "Thông báo",
            DateCreate: "2022-02-01"
        },{
            Id:4,
            Icon:"mmm",
            Title: "Thời tiết",
            DateCreate: "2022-02-01"
        },
    ],
    userinfor: {},
    };
  }
  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    fetch(url+"Auth/getinfor", {
      method: 'POST', //phương thức request
      headers: { //header của request
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjNhMTgzOTRhLWM1MWUtNDMzMS1hNjEzLTUwYTdiMmFhMzZmYSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImRhdEBnbWFpbC5jb20iLCJqdGkiOiIyYWZlNjE4ZC1mNTA5LTQ1NWUtYjQ1Ni04M2M4Njc1ODBlN2EiLCJleHAiOjE2ODU4MDU0NDEsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyODgiLCJhdWQiOiJVc2VyIn0.IZCB_BpovthSWIjPzbJDdk2OePk2Mb-WM5O1RX6zWew"
      }), //dữ liệu được gửi đi (trong trường hợp POST và PUT)
    })
    .then(response => response.json())
    .then(  json => {
      console.log(json);
      this.setState({userinfor: json.data})
    })
    .catch(error => {
      
      console.error('Error:', error);
     
    });
  }
 
  render() {
   
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.text}>Plant Manager</Text>
        </View>
        <View style={styles.body}>
          <View style = {styles.infor}>
            <View style ={styles.image}>
            </View>
            <View style={styles.boxname}><Text>HI am hubert</Text></View>          
          </View>
          <ScrollView style={{padding: 70}}>
                
                <View style={styles.item}>
                    <View style={styles.itemicon}></View>
                    <Text style={styles.itemtext}>ABC</Text>
                </View>
                <View style={styles.item}>
                    <View style={styles.itemicon}></View>
                    <Text style={styles.itemtext}>ABC</Text>
                </View>
                <View style={styles.item}>
                    <View style={styles.itemicon}></View>
                    <Text style={styles.itemtext}>ABC</Text>
                </View>
                <View style={styles.item}>
                    <View style={styles.itemicon}></View>
                    <Text style={styles.itemtext}>ABC</Text>
                </View>
            </ScrollView>
            
        </View>
        <View style={styles.footer}></View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  header: {
    flex: 0.1,
    width: '100%',
    height: "15%",
    backgroundColor: "#1DB90F",
    opacity: 0.7,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    height: "70%",
    flex: 0.8
  },
  footer: {
    flex: 0.1,
    height: "15%",
    width: "100%",
    backgroundColor:'blue'
  },
  item: {
    width: 70,
    height: 800,
    backgroundColor: 'red'
  },
  text: {
    fontFamily: '',
    fontWeight: 600,
    color: '#fff',
  },
  infor: {
    width: "100%",
    height: 40,
    backgroundColor: "#ccc",
    padding: 2

  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 100,
    backgroundColor: "blue",
    marginLeft: 10,
    position: 'absolute'
  },
  boxname: {
    position: 'absolute',
    marginLeft: 60,
    height: 36,
    alignItems: 'center',
    justifyContent: "center"
  },
  itemicon:{

  },
  itemtext: {

  }
});
