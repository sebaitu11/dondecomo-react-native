/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  NavigatorIOS,
} from 'react-native';

var home = require("./components/home.ios");

class dondecomo extends Component {
  
  render(){
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: "Elige un Restaurante",
          component: home,
        }} />
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

AppRegistry.registerComponent('dondecomo', () => dondecomo);

