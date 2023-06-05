import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Animated , TouchableOpacity, Alert,ScrollView,Image } from 'react-native';
import url from '../../Constant/Request';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controller: 1,
        menu: [{
            Id: 1,
            Icon:require("../../../assets/farmHome.png"),
            Title: "Quản lí nông trại",
            DateCreate: "2022-02-01"
        },
        {
            Id: 2,
            Icon:require("../../../assets/deviceHome.png"),
            Title: "Quản lí thiết bị",
            DateCreate: "2022-02-01"
        },{
            Id:3,
            Icon:require("../../../assets/notifyHome.png"),
            Title: "Thông báo",
            DateCreate: "2022-02-01"
        },{
            Id:4,
            Icon:require("../../../assets/weatherHome.png"),
            Title: "Thời tiết",
            DateCreate: "2022-02-01"
        },
    ],
    userinfor: {},
    };
  }
  componentDidMount() {
   
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
  handleController= (number) => {
    if(number==1){
      this.setState({controller:1})
    }
    if(number==2){
      this.setState({controller:2})

    }
    if(number==3){
      this.setState({controller:3})

    }
  }
 
  render() {
   
    return (
      <View style={styles.container}>
        <View style={styles.header}>
           <Text style={styles.text}>Plant Manager</Text>
        </View>
        <View style={styles.body}>
        <View style={styles.infor}>
          <View style ={styles.avata}>
            <Image source={require("../../../assets/Avata/ronaldo.jpg")} style={{width:"100%", height:'100%',aspectRatio: 1, resizeMode:'cover' }}/>
          </View>
          <Text style={styles.boxname}>My name</Text>
        </View>
        <View style={styles.itemList} >
          {this.state.menu.map((e,i)=> {
           return ( <View key={i} style={styles.item}>
            <TouchableOpacity style= {styles.intemImg}>
            <Image source={e.Icon} style={{width: "100%", height: "100%",aspectRatio: 1}} />
            </TouchableOpacity>                
                <Text>{e.Title}</Text>
              </View>)
          })}
        </View>
        </View>
        <View style={styles.footer}>
          <View style ={styles.boxfooter}>
            <TouchableOpacity style= {styles.col} onPress={()=>this.handleController(1)}>
            <Icon name="home" size={30} color={this.state.controller==1? "#18F33B": "#000"} />   
            <Text style={{ color: this.state.controller === 1 ? "#18F33B" : "#000" }}>Trang chủ</Text>
            </TouchableOpacity >
            <TouchableOpacity style= {styles.col} onPress={()=>this.handleController(2)}>
            <Icon name="search" size={30} color={this.state.controller==2? "#18F33B": "#000"} />   
            <Text style={{ color: this.state.controller === 2 ? "#18F33B" : "#000" }}>Tìm kiếm</Text>
            </TouchableOpacity>
            <TouchableOpacity  style= {styles.col} onPress={()=>this.handleController(3)}>
            <Icon name="user" size={30} color={this.state.controller==3? "#18F33B": "#000"} />   
            <Text style={{ color: this.state.controller === 3 ? "#18F33B" : "#000" }}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  col: {
    flex: 1,
    textAlign: 'center',
    alignItems:'center'
  },
  boxfooter: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 100,
    height: 70,
    flexDirection: 'row'
  },
  container: {
    padding: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3FBFB',
    width : '100%',
    height: "100%"
  },
  header: {
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
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    width: "95%",
    height:"15%",
    backgroundColor:'F3FBFB',
    

  },
  text: {
    fontFamily: 'sans-serif',
    fontWeight: 800,
    color: '#fff',
    fontSize: 16
  },
  infor: {
    width: "100%",
    backgroundColor: "#fff",
    height: 80,
    justifyContent: 'center',
    marginTop: 10
  },
  avata: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "blue",
    marginLeft: 10,
    position: 'absolute',
    overflow:'hidden'
  },
  boxname: {
    marginLeft: 100,
    fontWeight: 800,
    fontFamily: 'sans-serif'

  },
  itemList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 350,
    alignItems: 'center'
  },
  item: {
    backgroundColor: "#F9F5F5",
    width: 150,
    height: 150,
    margin: 10,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,


    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  intemImg:{
    width: "100%",
    height:130,
    backgroundColor: "#fff",
    alignItems:'center'
  },
  itemTitle: {

  },
});
