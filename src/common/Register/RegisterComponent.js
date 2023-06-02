import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Animated , TouchableOpacity, Alert } from 'react-native';
import url from '../../Constant/Request';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class RegisterComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
        }
    }
    render(){
        return(
            <View>
                <Text style={styles.heading}>Register</Text>
                <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => this.setState({ email: text })}
                value={this.state.email}
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
                value={this.state.password}
                />

                <TouchableOpacity onPress={() => this.handleSubmit()}  style={styles.button}>  
                <Text>Register</Text>
                </TouchableOpacity><Text style={styles.heading}>Register</Text>
                
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
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
      borderRadius: 5,
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
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginHorizontal: 5,
    },
  });