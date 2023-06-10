import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image,
  ScrollView,TextInput, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../Constant/Request';
import {styles} from './ViewSmallHoldingStyle.js'

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
     selectedValue: '',
     devices : [],
     deviceId : '',
     zoneId: '',
     zonehasValue: []
    };
  }
   async componentDidMount() {
    this.fetchDeviceActive();
    fetch(url+"Zone/getby-farmid", {
      method: 'POST', //phương thức request
      headers: { //header của request
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('token'),
      },
      body: JSON.stringify({
        "farmId": this.props.route.params.farmId,
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
    if(this.state.zonehasValue.includes(zoneId)){
      this.props.navigation.navigate('DataDetailsComponent',{zoneId: zoneId});
    }
   }
   handleInsertDevice = async () => {
    fetch(url+"Device/setzone", {
      method: 'POST', //phương thức request
      headers: { //header của request
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('token'),
      },
      body: JSON.stringify({
        "deviceId": this.state.selectedValue,
        "zoneId": this.state.zoneId
        // this.props.route.params.farmId,
      }), //dữ liệu được gửi đi (trong trường hợp POST và PUT)
    })
    .then(response => response.json())
    .then( async json => {
      console.log(json);
      if(json.code ==1){
        this.setState({modelDevice: false });
        this.fetchDeviceActive();
      }
    })
    .catch(error => {
      
      console.error('Error:', error);
     
    });
   }
   handleAddDevice= (id) => {
    
    this.setState({modelDevice: true,zoneId: id
    })
   }
   async fetchDeviceActive() {
    fetch(url+"Device/getdeviceative", {
      method: 'POST', //phương thức request
      headers: { //header của request
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('token'),
      },
      body: JSON.stringify({
        "deviceId": "string",
        "zoneId": 0
        // this.props.route.params.farmId,
      }), //dữ liệu được gửi đi (trong trường hợp POST và PUT)
    })
    .then(response => response.json())
    .then( async json => {
      console.log(json);
      if(json.code ==1){
        var arr = [];
        this.setState({devices: json.data});
        json.data.map(e=> {
          if(e.zoneId!=null){
            arr.push(e.zoneId);
            this.setState({zonehasValue: arr})
          }
        })
      }
    })
    .catch(error => {
      
      console.error('Error:', error);
     
    });
   }
   handleSaveAdd = async () => {
    fetch(url+"Zone/create", {
      method: 'POST', //phương thức request
      headers: { //header của request
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('token'),
      },
      body: JSON.stringify({
        "zoneName": this.state.zoneName,
        "decription": this.state.zoneDec,
        "farmId": this.props.route.params.farmId,
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
                <Picker
              selectedValue={this.state.selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ selectedValue: itemValue })
              }>
              {this.state.devices.map((e)=> {
                return (
                  <Picker.Item key ={e.id} label={e.name} value={e.id} />
                )
              })}
              
            </Picker>
            </View>
            <View style={styles.mDFooter}>
              <TouchableOpacity onPress={()=> this.handleInsertDevice()} style={styles.mDFooter_Save}>
                <Text style = {{color: '#fff'}}>Save</Text>
              </TouchableOpacity>
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
                        this.state.zonehasValue.includes(e.id)?styles.statusDeviceGreen: styles.statusDeviceRed
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
          <View style= {styles.footerRec}></View>
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
