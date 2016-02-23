
import React, {
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  NavigatorIOS,
  TouchableHighlight,
  ActivityIndicatorIOS,
  RefreshControl,
  ScrollView,
  Animated,

} from 'react-native';


var Api = require("../utils/api")

var restoComponent = require("./resto.ios")


class Home extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      page: 1,
      moreInfo: true,
      isRefreshing: false,
      fadeAnim: new Animated.Value(0),
    };
  }

  componentDidMount(){
    this._data = [];
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        position = {lat: position.coords.latitude, lng: position.coords.longitude}
        this.fetchData(this.state.page, position);
      },
      (error) => {
        alert(error.message); 
        this.fetchData(this.state.page)
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    console.ignoredYellowBox = ['jsSchedulingOverhead'];

  }

  fetchData(page,position){
    if(this.state.moreInfo){
      Api.getRestos(page,position).then((res) => {
        if(res.length < 1){
          this.setState({
            moreInfo: false,
          })
        }
        Animated.timing(          // Uses easing functions
           this.state.fadeAnim,    // The value to drive
           {toValue: 1,
            duration: 500},           // Configuration
         ).start(); 
        this._data = this._data.concat(res)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this._data),
          loaded: true,
        });
      })
    }
  }

  reloadRestos(){
    this.setState({
      isRefreshing: true,
    })
    position = { lat: this.state.lat, lng: this.state.lng}
    Api.getRestos(1,position).then((res) => {
      this._data = this._data.concat(res)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this._data),
        loaded: true,
        isRefreshing: false,
      });
    })
    
  }

  render() {
    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    return (
        <View style={{flex: 1, paddingTop: 62}}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.reloadRestos.bind(this)}
                tintColor="#333"
                title="Actualizando"
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor="#ffff00"
              />
            }>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderResto.bind(this)}
              style={styles.listView}
              onEndReachedThreshold= {1000}
              onEndReached={this.fetchData(this.state.page += 1,{lat: this.state.lat, lng: this.state.lng})}
            />
          </ScrollView>
        </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.loading}>
        <ActivityIndicatorIOS
          animating={true}
          color={'#333'}
          size={'large'}
          style={styles.loading} />
      </View>
    );
  }

  goToResto(resto){
    this.props.navigator.push({
      title: resto.name,
      component: restoComponent,
      passProps: {resto: resto}
    })
  }

  renderResto(resto) {
    return (
      <TouchableHighlight underlayColor='#fff'
        onPress={this.goToResto.bind(this,resto)} >
        <View style={styles.container}>
          <View style={styles.image}>
            <Animated.Image
              source={{uri: resto.image}}
              style={{height: 190, alignItems: 'stretch', flex: 1, opacity: this.state.fadeAnim} }
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{resto.name}</Text>
            <View style={styles.circle}>
              <Text style={styles.distance}>{resto.distance} </Text>
              <Text style={styles.kms}>Kms</Text>
            </View>
          </View>
          <Text style={styles.details} numberOfLines={1}>{resto.details}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

var indicatorStylesheet = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
    height: 60,
    marginTop: 10,
  },
})

var styles = StyleSheet.create({
  info: {
    flex: 1,
    marginLeft: 20,
    flexDirection: 'row',
  },
  loading: {
    alignItems: "center",
    flex: 1,
  },
  circle: {
    width: 55,
    height: 55,
    borderRadius: 55 / PixelRatio.get(),
    backgroundColor: '#f06d22',
    borderColor: "#fff",
    marginTop: -35,
    marginRight: 12,
    borderWidth: 1,
    justifyContent: 'center',
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
  image: {
    flex: 1,
    alignItems: 'stretch',
  },
  title: {
    color: "#f06d22",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 3,
    textAlign: 'left',
    flex: 2,
  },
  details: {
    textAlign: 'left',
    flex: 1,
    marginLeft: 20,
    marginBottom: 16,
    marginRight: 20,
  },
  listView: {
    backgroundColor: '#fff',
  },
});

module.exports = Home;