import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image,
  ScrollView,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../Constant/Request';

class  ViewFarmComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
     farms: [],
    };
  }


  async componentDidMount () {
    fetch(url+"Farm/getbytoken", {
      method: 'GET', //phương thức request
      headers: { //header của request
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('token'),
      }
     , //dữ liệu được gửi đi (trong trường hợp POST và PUT)
    })
    .then(response => response.json())
    .then( async json => {
      console.log(json);
      this.setState({farms: json})
    })
    .catch(error => {
      
      console.error('Error:', error);
     
    });
  }
   

  handlePressFarm = (id) => {
    console.log(id);
    this.props.navigation.navigate('ViewSmallholdingComponent', {shId: id});
   
  }
   render() {
  
    return (
      <View style={styles.container}>

       <View style={styles.header}>
       <Text style={styles.title}>My Farm</Text>
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
                {this.state.farms.map(e=>{
                return (<TouchableOpacity onPress={()=> this.handlePressFarm(e.id)} style= {styles.itemFarm} key={e.id}>
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
          <TouchableOpacity style = {styles.iconPlus} >
          <Icon name="plus-circle" size={50} color="#fff" />

          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    padding: 5
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

export default ViewFarmComponent;
