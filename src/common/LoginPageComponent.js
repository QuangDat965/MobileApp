import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Animated , TouchableOpacity, Alert,ActivityIndicator } from 'react-native';
import url from '../Constant/Request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './Loading';

export default class LoginPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
  }
  componentDidMount() {
    // Animated.timing(this.state.animatedValue, {
    //   toValue: 300, // giá trị cuối của animatedValue là 300
    //   duration: 10000, // thời gian thực hiện animation là 2 giây
    //   useNativeDriver: true, // để sử dụng native driver cho performance tốt hơn
    // }).start();
  }
  callApi(){
    this.setState({isLoading: true});
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
          this.props.navigation.navigate('HomeComponent')
      }
      else if(json.code ==-1){
      this.setState({isLoading:false})
      Alert.alert('Sai mat khau');
      }
      else {
      this.setState({isLoading:false})
      Alert.alert('Sai mat khau');

        
      }
    })
    .catch(error => {
      console.error('Error:', error);
      Alert.alert('Loi ngoai le');
    })
    .finally(p=>{
      this.setState({isLoading:false})
    });
  }
  handleSubmit =  () => {
    if(this.state.email.length > 3 && this.state.password.length > 3){
      this.callApi();
    }
    else{
      Alert.alert("vui long nhap tk mk")
    }
   
  }
  handlePressToRegister = () => {
    this.props.navigation.navigate('Register')
  }
 
  render() {
    return (
      <View style={styles.container}>
        <Loading isLoading={this.state.isLoading}/>
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
        <TouchableOpacity onPress={this.handlePressToRegister} style = {styles.FogotAccount}>
        <Text style={{ color: 'blue' }}>Bạn chưa có tài khoản?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handlePressToFogotAccount} style = {styles.FogotAccount}>
        <Text style={{ color: 'blue' }}>Quên mật khẩu?</Text>
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
  FogotAccount: {
    marginTop: 20
  }
});
