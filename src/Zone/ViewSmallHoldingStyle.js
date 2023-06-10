import {  StyleSheet } from 'react-native';

export  const styles = StyleSheet.create({
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
  },
  statusDeviceRed: {
    backgroundColor: 'red',
    width: 10,
    height: 10,
    borderRadius: 100,
    position: 'absolute',
    right: 0,
    top: 0
  },
  statusDeviceGreen: {
    backgroundColor: 'green',
    width: 10,
    height: 10,
    borderRadius: 100,
    position: 'absolute',
    right: 0,
    top: 0
  },
  itemAddDevice: {
    position: 'absolute',
    right: 0,
    bottom: 5,
    width:30,
    height: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  },
  flexAddDevice: {
    width: "100%",
    height: "100%",
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    zIndex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modelDevice: {
    width: 300,
    height: 300,
    backgroundColor: '#fff'
  },
  mDHeader: {
    height: 50,
    backgroundColor: '#ccc'
  },
  mDBody: {
    height: 200,
  },
  mDFooter: {
    backgroundColor: '#ccc',
    height: 50,
    
  },
  boxCloseDevice: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 0,
    
  },
  mDFooter_Save: {
    width: 50,
    height: 50,
    backgroundColor: "blue",
    opacity: 0.9,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0
  }
});