import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image,
  ScrollView,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTime from './DateTime';
import DataRealTime from './DataRealTimeComponent';
import ActionComponent from './ActionComponent';
import DataSensor from '../User/DataSensor/DataSensor';
import DataControl from '../User/DataControl/DataControl';

class  DataDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        view: true
    }
  }
  
    handleBack = () => {
    this.props.navigation.navigate('ViewSmallholdingComponent')
    }
    handleAction = () => {
        this.setState({view: false});
    }

    handleView = () => {
        this.setState({view: true});
        
    }
   
   render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>

       <View style={styles.header}>
            <Text style={styles.title}>Sensor</Text>
            <Image source = {require('../../assets/th.jpg')}
                    style = {styles.logo}
            />
        </View>
       <View style={styles.body}>

                <View style={styles.optionNav}>

                    <TouchableOpacity onPress={() => this.handleBack()}   style = {styles.filterIcon}>
                        
                    <Icon  name="arrow-left" size={30} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.settingIcon}>
                    <Icon  name="gear" size={30} color="#000" />             
                    </TouchableOpacity>
                    <View style = {styles.clock}>
                    <DateTime></DateTime>
                    </View>
                </View>

                    <ScrollView>
                    
                        {this.state.view === true ? <DataSensor/>: <DataControl/>}
                        {/* <View style= {styles.charDataValue}>
                            
                        </View> */}
                    
                    </ScrollView>
              
        </View>
        <View style = {styles.footer}>
            <View style= {styles.coverButton}>
            <View style= {styles.footerRow}>
                <Button onPress={()=> this.handleView()} color={this.state.view? 'green': '#ccc'} title='View'/>
              </View>
              <View style= {styles.footerRow}>
              <Button onPress={()=> this.handleAction()} color={this.state.view!=true? 'green': '#ccc'} title='Action'/>
              </View>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    footerRow: {

    },
    row: {
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    charDataValue: {
      height: 400,
      width: '100%'  
    },
   
    clock: {
        width: 100,
        height: '100%',
        backgroundColor:'yellow',
        borderRadius: 20,
        position: 'absolute',
        left: '50%',
        justifyContent: 'center',
        transform: [{ translateX: -50 }] 
    },
  iconPlus: {
    position: 'absolute',
    zIndex: 1,
    top: 27
  },
  footer: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    backgroundColor: 'rgba(30,30,32,0.8)',
    justifyContent: 'center',

  },
  coverButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%'

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
    left: 10,
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
    padding: 5
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

export default DataDetailsComponent;
