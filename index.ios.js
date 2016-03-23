import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  PixelRatio
} from 'react-native';
import ToDos from './app';

export default todomvc = React.createClass({
  render() {
    return (
      <ToDos/>
    );
  }
});



AppRegistry.registerComponent('todomvc', () => todomvc);
