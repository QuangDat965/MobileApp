import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image,
  ScrollView,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../Constant/Request';

class  ViewSmallholdingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
     smallholding: [],
     modelAdd: false,
     zoneDev :'',
     zoneDec: '',
     zoneName: '',
    };
  }
   async componentDidMount() {
    fetch(url+"Zone/getbyfarmid", {
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
      this.setState({smallholding: json})
    })
    .catch(error => {
      
      console.error('Error:', error);
     
    });
   }
   handleBack = () => {
    this.props.navigation.navigate('ViewFarmComponent')
    }
   handleSmallholding = (shId) =>{
    this.props.navigation.navigate('DataDetailsComponent',{shId});
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

const styles = StyleSheet.create({
  addButton: {
    width: 150,
    height: 50,
    position: 'absolute',
    right: 10,
    textAlign: 'center',
    justifyContent: 'center'
    
  },
  addFooter: {
    backgroundColor: '#fff',
    height: 50,
    
  },
  addCancle: {
    position: 'absolute',
    left: 0,
    width: 50,
    height:40,
    backgroundColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 8,
  },
  addSave: {
    position: 'absolute',
    right: 0,
    width: 50,
    height:40,
    backgroundColor: 'blue',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderRadius: 8,
    elevation: 5,
  },
  addInput: {
   
    width: '80%',
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
   
  },
  inputBox: {
    width: 100,
    height: 50,
  },
  addBody: {
    width: '100%',
    height: 250,
    backgroundColor: '#cca',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addHeader: {
    width:'100%',
    height: 50,
    backgroundColor: "#ccc",

  },
  closeIcon: {
    width: 50,
    height: 50,
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 2,
  },

  addForm: {
    backgroundColor: '#fff',
    width: 300,
    height: 350,
    zIndex: 3,
    opacity: 1,
    borderRadius: 10,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  addModel: {
    backgroundColor: "rgba(0,0,0,0.4)",
    width: "100%",
    height: "100%",
    position: 'absolute',
    zIndex:2,
    alignItems: 'center',
    justifyContent: 'center',
   flex: 1,
    // display: 'none'
  },
  iconPlus: {
    position: 'absolute',
    zIndex: 1,
    top: -5
  },
  footer: {
    width: '100%',
    height: '10%',
    position: 'relative',
    alignItems: 'center',
    backgroundColor: '#565656'
  },

  footerCirle: {
    height: 70,
    width: 70,
    backgroundColor: '#565656',
    position: 'absolute',
    borderRadius: 50,
    top: -25,
    
  },
  container: {
    flex: 1,
    marginTop: 30,
    position: 'relative'
  },
  header: {
    backgroundColor: 'rgb(137,219,130)', 
    width: '100%',
    height: '15%',
    justifyContent: 'center',
    marginBottom: 4
    
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 10,
    color: '#fff'
  },
  logo: {
    width: 80,
    height: 80,
    position : 'absolute',
    right: 20,
    borderRadius: 15,
  },
  body: {
    backgroundColor: '',
    height: '75%',
    marginTop: 0
  },
  optionNav: {
    backgroundColor: '',
    height: 50,
    justifyContent: 'center',
    borderRadius: 5
  },
  input: {
    backgroundColor: '#ccc',
    width: '60%',
    borderRadius: 15,
    marginLeft: 10,
    height: '80%',
    position: 'absolute',
    textAlign: 'left',
    paddingLeft: 50
  },
  searchIcon: {
    marginLeft: 20,
    position: 'absolute'
  },
  filterIcon: {
    position: 'absolute',
    right: 60,
    backgroundColor: '#ccc',
    width: 40,
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7

  },
  settingIcon: {
    position: 'absolute',
    right: 10,
    backgroundColor: '#ccc',
    width: 40,
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7
  },
  itemFarm: {
    width: '90%',
    height: 100,
    backgroundColor: '#ccc',
    marginBottom: 10,
    borderRadius: 10,
    justifyContent:'center'
  },
  scrolls: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  farmText: {
    position:'absolute',
    left: 75 
  },
  farmImage: {
    width: 65,
    height: 65,
    borderRadius: 10,
    left: 3
  }

});

export default ViewSmallholdingComponent;
