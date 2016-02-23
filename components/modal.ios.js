
import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableHighlight,
} from 'react-native';

var Icon= require('react-native-vector-icons/FontAwesome');

class CustomModal extends Component {
  constructor(props) {
    super(props)
  }

  _setModalVisible(visible){
    this.setState({
      modalVisible: visible
    });
  }

  render(){
    
    return(
      <View>
        <Modal
          animated={this.props.animated}
          transparent={this.props.transparent}
          visible={this.props.modalVisible}
        >
          <View style={styles.container}>
            {this.hasWifi()}
            {this.hasReservas()}
            {this.hasParking()}
            
          </View>
            <TouchableHighlight
              onPress={this.props.onPress}
              style={styles.close_button}
            >
              <Text 
                style={styles.close}>Cerrar</Text>
            </TouchableHighlight>
        </Modal>
      </View>
    );
  }

  hasWifi(){
    if(this.props.resto && this.props.resto.hasWifi){
      
      return <View style={styles.wrapper}>
        <Icon
        name='wifi'
        size={32}
        color='#333'
        style={styles.wifi}/>
        <Text style={styles.text}>Wifi</Text>
      </View>
    }
  }

  hasReservas(){
    if(this.props.resto && this.props.resto.hasReservas){
      
      return <View style={styles.wrapper}>
        <Icon
        name='bookmark'
        size={32}
        color='#333'
        style={styles.wifi}/>
        <Text style={styles.text}>Reservas</Text>
      </View>
    } 
  }

  hasParking(){
    if(this.props.resto && this.props.resto.hasParking){
      
      return <View style={styles.wrapper}>
        <Icon
        name='car'
        size={32}
        color='#333'
        style={styles.wifi}/>
        <Text style={styles.text}>Estacionamiento</Text>
      </View>
    } 
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  close_button: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  text: {
    color: "#333",
    textAlign: "left",
    fontSize: 18,
    flex: 0.7,
  },
  close: {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    flex: 1,
    padding: 15,
  },
  wifi: {
    color: "#f06d22",
    textAlign: "center",
    marginRight: 40,
    flex: 0.3,
  }
})

module.exports = CustomModal