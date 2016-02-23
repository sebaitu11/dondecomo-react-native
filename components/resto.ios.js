/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var Icon= require('react-native-vector-icons/FontAwesome');

var Communications = require('react-native-communications');

var Api = require("../utils/api")

var CustomModal = require("./modal.ios")


import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  PixelRatio,
  MapView,
  Modal,
  ListView,
} from 'react-native';

class resto extends Component {
  constructor(props){
    super(props)
    this.state = {
      info_resto: {},
      menus: {},
      promos: {},
      annotations: [],
      isVisible: false,
      dataSourceMenus: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      dataSourcePromos: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    }
  }

  componentDidMount(){
    Api.getResto(this.props.resto.id).then((response) => {
      this.setState({
        info_resto: response.resto,
        promos: response.promos,
        annotations: [{latitude: parseFloat(response.resto.lat), longitude: parseFloat(response.resto.lng)}],
        dataSourceMenus: this.state.dataSourceMenus.cloneWithRows(response.menus),
        dataSourcePromos: this.state.dataSourceMenus.cloneWithRows(response.promos)
      });
    })
  }

  _setModalVisible(visible){
    this.setState({
      isVisible: visible
    })
  }

  renderMenu(menu){
    return(
      <View>
        <View>
          <Image
            style={styles.image_cont}
            source={{uri: menu.image_url}} />
        </View>
        <View style={styles.menu_info}>
          <View style={styles.menu_text_cont}>
            <Text style={styles.menu_text}>{menu.name}</Text>
          </View>
          <View style={styles.menu_price_cont}>
            <Text style={styles.menu_price}>{menu.price}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderPromo(promo){
    return(
      <View>
        <View>
          <Image
            style={styles.image_cont}
            source={{uri: promo.image_url}} />
        </View>
        <View style={styles.menu_info}>
          <View style={styles.menu_text_cont}>
            <Text style={styles.promo_text}>{promo.name}</Text>
            <Text style={styles.promo_desc}>{promo.description}</Text>
          </View>
        </View>
      </View>
    )
  }

  render(){
    return (
      <ScrollView>
        <View style={styles.img_container}>
          <Image
            style={styles.thumbnail}
            source={{uri: this.props.resto.image}} />
        </View>
        <View>
          <TouchableHighlight underlayColor='#16a085' onPress={() => Communications.phonecall(this.state.info_resto.telefono, true)} >
            <Icon
              name='phone'
              size={32}
              color='#3b5998'
              style={styles.icon}/>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='#16a085' onPress={() => this._setModalVisible(true)} >
            <Icon
              name='ellipsis-h'
              size={32}
              color='#3b5998'
              style={styles.more_info_icon}/>
          </TouchableHighlight>
          <View style={styles.circle}>
            <Text style={styles.distance}>{this.props.resto.distance} </Text>
            <Text style={styles.kms}>Kms</Text>
          </View>
          <CustomModal 
            modalVisible={this.state.isVisible}
            animated={true}
            transparent={true}
            onPress={this._setModalVisible.bind(this,false)}
            resto={this.state.info_resto}
          >
          </CustomModal>
        </View>
        <View>
          <Text style={styles.details}>{this.props.resto.details}</Text>
        </View>
        <View style={styles.horario}>
          <Text style={styles.big_text}>Horario de atención</Text>
          <Text style={styles.text}>{this.state.info_resto.open} a {this.state.info_resto.close}</Text>
        </View>
        <View style={styles.direccion}>
          <Text style={styles.big_text}>Dirección</Text>
          <Text style={styles.text}>{this.state.info_resto.direccion} a {this.state.info_resto.close}</Text>
        </View>
        <MapView
          style={styles.map}
          region={{
            latitude: parseFloat(this.state.info_resto.lat) || 0,
            longitude: parseFloat(this.state.info_resto.lng) || 0,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}
          annotations={this.state.annotations}
          showsUserLocation= {true}
          />
          <Text style={styles.menu_title}>Menus</Text>
          <ListView
            style={styles.container}
            dataSource={this.state.dataSourceMenus}
            renderRow={this.renderMenu.bind(this)} />
          <Text style={styles.menu_title}>Promos</Text>
          <ListView
            style={styles.container}
            dataSource={this.state.dataSourcePromos}
            renderRow={this.renderPromo.bind(this)} />

      </ScrollView>
      
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menu_title: {
    fontSize: 18,
    padding: 10,
    backgroundColor: "#eaeaea",
  },
  menu_info: {
    flexDirection: "row",
  },
  menu_text: {
    padding: 15,
  },
  promo_text: {
    padding: 15,
    paddingBottom: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
  promo_desc: {
    padding: 15,
    paddingTop: 2,
  },
  menu_text_cont: {
    flex: 0.8,
  },
  menu_price_cont: {
    flex: 0.2,
    alignItems: "center",
  },
  menu_price: {
    backgroundColor: "#333",
    color: "#fff",
    width: 65,
    padding: 10,
    textAlign: "center",
  },
  image_cont: {
    flex: 1,
    height: 100,
  },
  map: {
    flex: 1,
    height: 130,
  },
  img_container: {
    position: "relative",
  },
  text: {
  },
  big_text: {
    fontWeight: "bold",
  },
  horario: {
    flex: 0.5,
    padding: 10,
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderColor: "#ccc",
  },
  direccion: {
    flex: 0.5,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  thumbnail: {
    height: 190,
    alignItems: 'stretch',
    flex: 1,
  },
  details: {
    padding: 15,
    textAlign: "center",
    fontSize: 17,
    color: "#333",
  },
  icon: {
    backgroundColor: "#16a085",
    color: "#fff",
    padding: 14,
    borderRadius: 28,
    height: 53,
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  more_info_icon: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 14,
    borderRadius: 28,
    height: 53,
    position: "absolute",
    bottom: 10,
    left: 70,
  },
  circle: {
    width: 55,
    height: 55,
    borderRadius: 55 / PixelRatio.get(),
    backgroundColor: '#f06d22',
    borderColor: "#fff",
    marginTop: -35,
    marginRight: 12,
    justifyContent: 'center',
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  distance: {
    color: "#fff",
    backgroundColor: "transparent",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  kms: {
    color: "#fff",
    backgroundColor: "transparent",
    textAlign: "center",
    fontSize: 12,
  },
});


module.exports = resto
