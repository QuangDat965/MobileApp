import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import url from "../Constant/Request";

class ViewFarmComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      filter: 0,
      farms: [],
      modelAdd: false,
      farmName: '',
      farmDesc: '',
      farmAdress: ''
    };
  }
  callApi = async () => {
    fetch(url + "Farm/getbytoken", {
      method: "POST", //phương thức request
      headers: {
        //header của request
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await AsyncStorage.getItem("token")),
      }, //dữ liệu được gửi đi (trong trường hợp POST và PUT)
      body: JSON.stringify({
        searchTerm: this.state.search,
        filterType: this.state.filter,
      }),
    })
      .then((response) => response.json())
      .then(async (json) => {
        console.log(json);
        if (json.code == 1) {
          this.setState({ farms: json.data });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  componentDidMount() {
    this.callApi();
  }

  handlePressFarm = (id) => {
    console.log(id);
    this.props.navigation.navigate("ViewSmallholdingComponent", { farmId: id });
  };
  handleGoBack = () => {
    this.props.navigation.navigate("HomeComponent");
  };
  DirectionCreateFarm = () => {
    this.props.navigation.navigate("CreateFarmComponent");
  };
  handleShow = () => {
    this.setState({ visible: true });
  };
  handleSaveAddFarm =async () => {
    this.setState({modelAdd:false})
    fetch(url + "Farm/add", {
      method: "POST", //phương thức request
      headers: {
        //header của request
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await AsyncStorage.getItem("token")),
      },
      body: JSON.stringify({
        farmName: this.state.farmName,
        farmDescription: this.state.farmDesc,
        avata: "abc",
        adress: this.state.farmAdress,
      }), //dữ liệu được gửi đi (trong trường hợp POST và PUT)
    })
      .then((response) => response.json())
      .then(async (json) => {
        console.log("Response:", json);
        //
        if (json.code == 1) {
          console.log("Response:", json);
          this.callApi();
        } else if (json.code == 0) {
          Alert.alert("Đã xảy ra lôĩ");
        }
      });
  }
  render() {
    return (
      <View style={styles.container}>
         <View style = {this.state.modelAdd?styles.addModel:{display: 'none'}} >
          <View  style = {styles.addForm}>
                <View style={styles.addHeader}>
                  <TouchableOpacity onPress={()=>this.setState({modelAdd: false})} style = {styles.closeIcon}>
                      <Icon  name="close" size={40} color="#fff" />
                  </TouchableOpacity>
                  <Text style={{
                    fontSize: 20,
                    fontWeight: '800',
                    textAlign: 'center',
                    lineHeight: 50
                  }}>Add</Text>
                </View>

                <View style={styles.addBody}>
                  <Text></Text>
                  <TextInput
                      style={styles.addInput}
                      placeholder=" Name Farm"
                      onChangeText={(text) => this.setState({ farmName: text })}
                      value={this.state.farmName}
                      />
                  
                  <TextInput
                      style={styles.addInput}
                      placeholder=" Decription"
                      onChangeText={(text) => this.setState({ farmDesc: text })}
                      value={this.state.farmDesc}
                      />
                  
                  <TextInput
                      style={styles.addInput}
                      placeholder=" DevcieId"
                      value={this.state.farmAdress}
                      onChangeText={(text) => this.setState({ farmAdress: text })}
                      />
                 </View>

                <View style={styles.addFooter}>
                  <View style={styles.addButton}>
                  <TouchableOpacity onPress={()=> this.setState({modelAdd: false})} style={styles.addCancle}><Text style={{lineHeight:35, textAlign:'center'}}>Cancle</Text></TouchableOpacity>
                  <TouchableOpacity onPress={()=>this.handleSaveAddFarm()} style={styles.addSave}><Text style={{lineHeight:35, color: '#fff',textAlign:'center'}}>Save</Text></TouchableOpacity>
                  </View>
                </View>
          </View>
          
         </View>

          <View style={styles.header}>
            <Text style={styles.title}>My Farm</Text>
            <Image
              source={require("../../assets/th.jpg")}
              style={styles.logo}
            />
          </View>
          <View style={styles.body}>
              <View style={styles.optionNav}>
                <TouchableOpacity style={styles.searchBar}>
                  <TextInput
                    style={styles.input}
                    placeholder="Search"
                    onChangeText={(text) => this.setState({ search: text })}
                    onChange={this.callApi}
                  />
                  <Icon
                    style={styles.searchIcon}
                    name="search"
                    size={30}
                    color="#000"
                    onPress={this.callApi}
                  />
                </TouchableOpacity>
                <TouchableOpacity style = {styles.filterIcon}>
                <Icon  name="filter" size={30} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style = {styles.settingIcon}>
                <Icon  name="gear" size={30} color="#000" />
                </TouchableOpacity>
            </View>

            <ScrollView>
              <View style={styles.scrolls}>
                {this.state.farms.map((e) => {
                  return (
                    <TouchableOpacity
                      onPress={() => this.handlePressFarm(e.id)}
                      style={styles.itemFarm}
                      key={e.id}
                    >
                      <Image
                        source={require("../../assets/farmImage.jpg")}
                        style={styles.farmImage}
                      />
                      <View style={styles.farmText}>
                        <Text>{e.name}</Text>
                        <Text>{e.decription}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          <View style={styles.footer}>
          <TouchableOpacity onPress={() => this.handleGoBack()}   style = {styles.backIcon}>
                    
                    <Icon  name="arrow-left" size={30} color="#000" />
          </TouchableOpacity>
            <View style={styles.footerCirle}></View>
            <TouchableOpacity onPress={()=>this.setState({modelAdd:true})}
              style={styles.iconPlus}
              
            >
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
    width: 60,
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
    width: 60,
    height:40,
    backgroundColor: 'blue',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderRadius: 8,
    elevation: 5,
    textAlign: 'center',
    alignContent:'center'
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
    borderColor: '#000',
    borderBottomWidth: 2,
  },
  closeIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 2,
    backgroundColor: 'red',
    bottom: 0,
    zIndex: 3
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
  backIcon: {
    backgroundColor: '#ccc',
    width: 40,
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    position: 'absolute',
    left: 20,
    top: 5
  },
  backHome: {
    width: 40,
    height: 40,
    position: 'absolute',
    zIndex: 2,
    left: 0
  },
  iconPlus: {
    position: "absolute",
    zIndex: 1,
    top: -5,
  },
  footer: {
    width: '100%',
    height: '10%',
    position: 'relative',
    backgroundColor: '#565656',
    alignItems: 'center'
  },

  footerCirle: {
    height: 70,
    width: 70,
    backgroundColor: "#565656",
    position: "absolute",
    borderRadius: 50,
    top: -25,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginTop: 30,
    padding: 5,
  },
  header: {
    backgroundColor: "rgb(137,219,130)",
    width: "100%",
    height: "15%",
    justifyContent: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 25,
    textAlign: "left",
    marginLeft: 10,
    color: "#fff",
  },
  logo: {
    width: 80,
    height: 80,
    position: "absolute",
    right: 20,
    borderRadius: 15,
  },
  body: {
    backgroundColor: "",
    height: "75%",
    marginTop: 0,
  },
  optionNav: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom:3
  },
  searchBar: {
    height:"80%",
    width: 180,
    marginRight:4
  },
  input: {
    backgroundColor: "#ccc",
    borderRadius: 15,
    height: "100%",
    width: "100%",
    textAlign: "left",
    paddingLeft:50
  },
  searchIcon: {
    marginLeft: 10,
    position: "absolute",
    width: 30,
    height:30,
    top:5
  },
  filterIcon: {
    backgroundColor: "#ccc",
    width: 40,
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    marginRight: 4
  },
  settingIcon: {
    backgroundColor: "#ccc",
    width: 40,
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
  itemFarm: {
    width: "90%",
    height: 100,
    backgroundColor: "#ccc",
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: "center",
  },
  scrolls: {
    justifyContent: "center",
    alignItems: "center",
  },
  farmText: {
    position: "absolute",
    left: 75,
  },
  farmImage: {
    width: 65,
    height: 65,
    borderRadius: 10,
    left: 3,
  },
  refresh: {
    position: "absolute",
    right: 10,
    marginRight: 50,
  },
  titleHeader: {
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  }
});

export default ViewFarmComponent;
