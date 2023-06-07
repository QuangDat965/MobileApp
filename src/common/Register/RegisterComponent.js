import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, Text, TextInput, Button, StyleSheet,Animated , TouchableOpacity, Alert } from 'react-native';
import url from '../../Constant/Request';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class RegisterComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            numberPhone: "",
        };
    }
    handleRegister = () => {
        fetch(url + "auth/signup",{
          method : 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + "",
          },
          body: JSON.stringify({
            "email": this.state.email,
            "fistName": this.state.firstName,
            "lastName": this.state.lastName,
            "password": this.state.password,
            "confirmPassWord": this.state.confirmPassword,
            "numberPhone": this.state.numberPhone,
          }),
        })
        .then(response => response.json())
        .then(async json => {
          console.log('Response:', json);
          if(json.code==0){
            await AsyncStorage.setItem('token', String(json.token))
            Alert.alert('Dang ki thanh cong');
            this.props.navigation.navigate('HomeComponent')
          }
          else if(json.code ==-1){
              Alert.alert('Dang ki khong thanh cong');

          }
        }).catch(error => {
        console.error('Error:', error);
        });
    }
    handleGoBack = () => {
      this.props.navigation.navigate('Login')
    }
    
    render(){
        return(
          <>
          <TouchableOpacity onPress={() => this.handleGoBack()}>
              <Image source={require('../../../assets/backpage.png')}
                style={{ width: 50, height: 50, top: 10}}/>
                </TouchableOpacity>
          <View style = {styles.container}>
                <Image source={require('../../../assets/GardenManager.png')}
                style={{ width: 400, height: 200, }}/>

                <Text style={styles.heading}>Register</Text>
                <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => this.setState({ email: text })}
                value={this.state.email}
                />
                <TextInput
                style={styles.input}
                placeholder="First Name"
                onChangeText={(text) => this.setState({ firstName: text })}
                value={this.state.firstName}
                />
                <TextInput
                style={styles.input}
                placeholder="Last Name"
                onChangeText={(text) => this.setState({ lastName: text })}
                value={this.state.lastName}
                />
                <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ password: text })}
                value={this.state.password}
                />

                <TextInput
                style={styles.input}
                placeholder="Confirm password"
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ confirmPassword: text })}
                value={this.state.confirmPassword}
                />

                <TextInput
                style={styles.input}
                placeholder="Phone number"
                onChangeText={(text) => this.setState({ numberPhone: text })}
                value={this.state.numberPhone}
                />
                <Text style = {styles.warning}>Please fill in all fields before register</Text>

                <TouchableOpacity onPress={() => this.handleRegister()}  style={styles.button}>  
                <Text style = {styles.buttonText}>Register</Text>
                </TouchableOpacity>
                
            </View>
          </>
            
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      // marginTop: '100',
      justifyContent: 'center',
      backgroundColor: '#F2F2F2',
      width : '100%'
    },
    heading: {
      fontSize: 24,
      marginBottom: 24,
      color: '#F76C6C',
      fontWeight: 'bold',
      letterSpacing: 2,
    },
    input: {
      width: '80%',
      height: 40,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 16,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
    },
    label: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: '#4CAF50',
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginHorizontal: 5,
      textAlign : 'center',
      width : 200,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    warning: {
      color: 'red',
      marginBottom: 15,
    }
  });