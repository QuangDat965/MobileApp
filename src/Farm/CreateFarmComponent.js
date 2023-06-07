import React, { Component } from 'react';
import {Alert, View,Image, Text, StyleSheet, TextInput, TouchableOpacity,Button, TouchableHighlightBase } from 'react-native';
import url from '../Constant/Request';

import AsyncStorage from '@react-native-async-storage/async-storage';

class CreateFarmComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      address: ''
    };
  }
  
  handleSubmit = async () => {
    fetch(url + "Farm/add", {
      method: 'POST', //phương thức request
      headers: { //header của request
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  await AsyncStorage.getItem('token'),
      },
      body: JSON.stringify({
          "farmName": this.state.name,
          "farmDescription": this.state.description,
          "avata": "abctest",
          "adress" : this.state.address

      }), //dữ liệu được gửi đi (trong trường hợp POST và PUT)
    })
    .then(response => response.json())
    .then(async json => {
      console.log('Response:', json);
      // 
      if(json.code == 1){
        console.log('Response:', json);
        this.props.navigation.navigate('ViewFarmComponent', {reload : true})
        
      }
      else if(json.code == 0){
        Alert.alert('Đã xảy ra lôĩ');
      }})
    }
  handleGoBack = () => {
    this.props.navigation.navigate('ViewFarmComponent')
  }
  render() {
    const { name, description, address } = this.state;
    console.log("render create")
    return (
      <View >
        <TouchableOpacity onPress={() => this.handleGoBack()}>
            <Image source={require('../../assets/backpage.png')}
            style={{ width: 40, height: 40, top: 10}}/>
        </TouchableOpacity> 
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Tạo một trang trại mới </Text>

        <TextInput
          placeholder="Farm name"
          value={name}
          onChangeText={text => this.setState({ name: text })}
          style={{ width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        />

        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={text => this.setState({ description: text })}
          style={{ width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        />

        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={text => this.setState({ address: text })}
          style={{ width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        />

        <Button title="Submit" onPress={() => this.handleSubmit()} style={styles.submit}/>
        <Button title="Cancel" onPress={() => this.setState({ name: '', description: '', address: '' })} />
      </View>
    );
  }
}

export default CreateFarmComponent;
const styles = StyleSheet.create({
  container: {


  },
  submit: {
    marginBottom: 20
  }


})