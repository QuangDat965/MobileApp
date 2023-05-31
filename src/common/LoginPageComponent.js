import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Animated , TouchableOpacity, Alert } from 'react-native';
import url from '../Constant/Request';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LoginPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      animatedValue: new Animated.Value(-100),
    };
  }
  componentDidMount() {
    // Animated.timing(this.state.animatedValue, {
    //   toValue: 300, // giá trị cuối của animatedValue là 300
    //   duration: 10000, // thời gian thực hiện animation là 2 giây
    //   useNativeDriver: true, // để sử dụng native driver cho performance tốt hơn
    // }).start();
  }
  handleSubmit =  () => {
    fetch(url+"auth/signin", {
        method: 'POST', //phương thức request
        headers: { //header của request
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + "",
        },
        body: JSON.stringify({
            "email": this.state.email,
            "password": this.state.password
        }), //dữ liệu được gửi đi (trong trường hợp POST và PUT)
      })
      .then(response => response.json())
      .then(async json => {
        console.log('Response:', json);
        if(json.code==0){
            await AsyncStorage.setItem('token', String(json.token))
            this.props.navigation.navigate('ViewFarmComponent')
        }
        else if(json.code ==-1){
            Alert.alert('Sai mật khẩu');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

    
  }
 
  render() {
    const animatedStyle = {
        transform: [{ translateX: this.state.animatedValue }],
      };
    return (
      <View style={styles.container}>
         {/* <Animated.Text style={[styles.label, animatedStyle]}>Hello, world!</Animated.Text> */}
        <Text style={styles.heading}>Login</Text>
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
        <TouchableOpacity onPress={() => this.handleSubmit()}  style={styles.button}>  
        <Text>Login</Text>     
        </TouchableOpacity>
        
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
