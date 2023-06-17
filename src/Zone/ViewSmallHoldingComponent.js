import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image,
  ScrollView,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../Constant/Request';
import {styles} from './ViewSmallHoldingStyle.js';

class  ViewSmallholdingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
     smallholding: [],
     modelAdd: false,
     zoneDev :'',
     zoneDec: '',
     zoneName: '',
     modelDevice: false,
     devices : [],
     deviceId : '',
     zoneId: '',
     zoneClick: '',
     zoneSelected: '',
     choseOndevice: '',

     deviceSensor: [],
     deviceControl: []
     
    };
  }
   async componentDidMount() {
    this.fetchMeasuringDevice();
    fetch(url+"Zone/getby-farmid", {
      method: 'POST', //phương thức request
      headers: { //header của request
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('token'),
      },
      body: JSON.stringify({
        "farmId": this.props.route.params.farmId,
        "searchTerm": "",
        "filterType": 0,
        "id": 0,
        "zoneName": "string",
        "decription": "string",
        "image": "string"
        // this.props.route.params.farmId,
      }), //dữ liệu được gửi đi (trong trường hợp POST và PUT)
    })
    .then(response => response.json())
    .then( async json => {
      console.log(json);
      if(json.code == 1){
        this.setState({smallholding: json.data})
      }
    })
    .catch(error => {
      
      console.error('Error:', error);
     
    });
   }
   handleBack = () => {
    this.props.navigation.navigate('ViewFarmComponent')
    }
   handleSmallholding = (zoneId) =>{
    if(this.state.zoneSelected==zoneId&&zoneId==this.state.choseOndevice){
      this.props.navigation.navigate('DataDetailsComponent',{zoneId: zoneId});
    }
   }
   handleSelecDevice = (id) => {
      this.setState({choseOndevice: id, modelDevice: false});
   }
   handleInsertDevice = async () => {
    
   }
   async fetchMeasuringDevice() {
    fetch(url+"MeasuringDevice/get-all", {
      method: 'GET', //phương thức request
      headers: { //header của request
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('token'),
      }
    })
    .then(response => response.json())
    .then( async json => {
      console.log(json);
      this.setState({deviceSensor: json});
   
    })
    .catch(error => {
      
      console.error('Error:', error);
     
    });
   }
   handleAddDevice= (id) => {
    
    this.setState({modelDevice: true,zoneSelected: id
    })
   }
   handleSaveAdd = async () => {
    fetch(url+"Zone/create", {
      method: 'POST', //phương thức request
      headers: { //header của request
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('token'),
      },
      body: JSON.stringify({
        "searchTerm": "",
        "filterType": 0,
        "id": 0,
        "zoneName": this.state.zoneName,
        "decription": this.state.zoneDec,
        "farmId": this.props.route.params.farmId,
        "image": "string"
        // this.props.route.params.farmId,
      }), //dữ liệu được gửi đi (trong trường hợp POST và PUT)
    })
    .then(response => response.json())
    .then( async json => {
      console.log(json);
      if(json ==true){
        this.setState({modelAdd: false});
        this.componentDidMount();
      }
    })
    .catch(error => {
      
      console.error('Error:', error);
     
    });
   }
   render() {
    

    return (
      <View style={styles.container}>
        <View style={this.state.modelDevice?styles.flexAddDevice: {display: 'none'}}>
          <View style={styles.modelDevice}>
            <View style={styles.mDHeader}>
              <TouchableOpacity onPress = {()=>this.setState({modelDevice: false})} style={styles.boxCloseDevice} >
                <Icon name='close' size={50} color="red"/>
              </TouchableOpacity>
            </View>
            <View style={styles.mDBody}>
                <ScrollView>
                  {this.state.deviceSensor.map((e,i)=> {
                    let name = e.deviceType ==1?"Cảm biến nhiệt độ": e.deviceId==2?"Cảm biến độ ẩm":e.deviceId==3?"Cảm biến mưa":"Thiết bị của tôi";
                    return(<TouchableOpacity onPress={()=>this.handleSelecDevice(this.state.zoneSelected)} style={styles.deviceBox} key={i}>
                        <Text>id :{e.id}- Name: {name}</Text>
                    </TouchableOpacity>)
                  })}
                </ScrollView>
            </View>
            <View style={styles.mDFooter}>
              {/* <TouchableOpacity onPress={()=> this.handleInsertDevice()} style={styles.mDFooter_Save}>
                <Text style = {{color: '#fff'}}>Save</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>

        <View style = {this.state.modelAdd?styles.addModel:{display: 'none'}} >
          <View  style = {styles.addForm}>
                <View style={styles.addHeader}>
                  <TouchableOpacity onPress={()=>this.setState({modelAdd: false})} style = {styles.closeIcon}>
                      <Icon  name="close" size={50} color="red" />
                  </TouchableOpacity>
                </View>
                <View style={styles.addBody}>
                <Text></Text>
                 <TextInput
                    style={styles.addInput}
                    placeholder="Name Zone"
                    onChangeText={(text) => this.setState({ zoneName: text })}
                    value={this.state.zoneName}
                    />
                
                <TextInput
                    style={styles.addInput}
                    placeholder="Decription"
                    onChangeText={(text) => this.setState({ zoneDec: text })}
                    value={this.state.zoneDec}
                    />
                
                 <TextInput
                    style={styles.addInput}
                    placeholder="DevcieId"
                    value={this.state.zoneDev}
                    onChangeText={(text) => this.setState({ zoneDev: text })}
                    />
   
                </View>
                <View style={styles.addFooter}>
                  <View style={styles.addButton}>
                  <TouchableOpacity onPress={()=> this.setState({modelAdd: false})} style={styles.addCancle}><Text style={{lineHeight:40}}>Cancle</Text></TouchableOpacity>
                  <TouchableOpacity onPress={()=>this.handleSaveAdd()} style={styles.addSave}><Text style={{lineHeight:40, color: '#fff'}}>Save</Text></TouchableOpacity>
                  </View>
                </View>
          </View>
          
        </View>

       <View style={styles.header}>
          <Text style={styles.title}>My SmallHolding</Text>
          <Image source = {require('../../assets/th.jpg')}
                  style = {styles.logo}
          />
       </View>


       <View style={styles.body}>

            <View style={styles.optionNav}>
              
            <TextInput
            style = {styles.input}
            placeholder='Search'
            
            />
            <Icon style = {styles.searchIcon} name="search" size={30} color="#000" />
            <TouchableOpacity style = {styles.filterIcon}>
              <Icon  name="filter" size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.settingIcon}>
            <Icon  name="gear" size={30} color="#000" />

              </TouchableOpacity>
            </View>
            <ScrollView >
                  <View style={styles.scrolls}>
                    {this.state.smallholding.map((e,i)=>{
                    return (<TouchableOpacity onPress={()=> this.handleSmallholding(e.id)} style= {styles.itemFarm} key={i}>
                          <Image source={require('../../assets/farmImage.jpg')}
                          style={styles.farmImage}/>
                          <View style = {styles.farmText}>
                          <Text>{e.name}</Text>
                          <Text>{e.decription}</Text>
                          </View>
                          <View style={
                            this.state.zoneSelected==e.id&&this.state.choseOndevice
                            ==this.state.zoneSelected?styles.statusDeviceGreen: styles.statusDeviceRed
                          }>
                          </View>
                          <TouchableOpacity onPress={()=> this.handleAddDevice(e.id)} style={styles.itemAddDevice}>
                            <Icon name="plus" size={30} color="#ccc"/>
                          </TouchableOpacity>
                      </TouchableOpacity>)
                      })} 
                  </View>       
              </ScrollView>   
        </View>
        <View style={styles.footer}>
            <View style= {styles.footerCirle}></View>
            
            <TouchableOpacity onPress={() => this.handleBack()}   style = {styles.filterIcon}>
                      
                  <Icon  name="arrow-left" size={30} color="#000" />
                  </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.setState({modelAdd: true})} style = {styles.iconPlus} >
            <Icon name="plus-circle" size={50} color="#fff" />

            </TouchableOpacity>
          </View>
    </View>
    );
  }
}



export default ViewSmallholdingComponent;
