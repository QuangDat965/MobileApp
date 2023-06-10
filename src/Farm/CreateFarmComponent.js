import React, { Component, useState } from 'react';
import {Alert, View,Image, Text, StyleSheet, TextInput, TouchableOpacity,Button, TouchableHighlightBase } from 'react-native';
import url from '../Constant/Request';

import AsyncStorage from '@react-native-async-storage/async-storage';


const CreateFarmComponent = ({ navigation}) => {
  const [namef, setNamef] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async () => {
      fetch(url + "Farm/add", {
        method: 'POST', //phương thức request
        headers: { //header của request
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  await AsyncStorage.getItem('token'),
        },
        body: JSON.stringify({
            "farmName": namef,
            "farmDescription": description,
            "avata": "",
            "adress" : setAddress

        }), //dữ liệu được gửi đi (trong trường hợp POST và PUT)
      })
      .then(response => response.json())
      .then(async json => {
        console.log('Response:', json);
        // 
        if(json.code == 1){
          console.log('Response:', json);
          navigation.navigate('ViewFarmComponent')
          
        }
        else if(json.code == 0){
          Alert.alert('Đã xảy ra lôĩ');
          
        }})
  }

  const handleGoBack = () => {
      navigation.navigate('ViewFarmComponent')
  }

  return (
    <View >
      <TouchableOpacity onPress={() => handleGoBack()}>
        <Image source={require('../../assets/backpage.png')}
          style={{ width: 40, height: 40, top: 10 }} />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Tạo một trang trại mới </Text>

      <TextInput
        placeholder="Farm name"
        value={namef}
        onChangeText={text => setNamef({ namef: text })}
        style={{ width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={text => setDescription({ description: text })}
        style={{ width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={text => setAddress({ address: text })}
        style={{ width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />

      <Button title="Submit" onPress={() => handleSubmit()} style={styles.submit} />
      <Button title="Cancel" onPress={() => handleGoBack()} />
    </View>
  );
};

  const styles = StyleSheet.create({
    container: {


    },
    submit: {
      marginBottom: 20
    }


  });
  export default CreateFarmComponent;