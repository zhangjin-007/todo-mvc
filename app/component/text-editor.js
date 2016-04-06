//@flow
import React, {
  View,
  Dimensions,
  TextInput,
  PixelRatio,
  StyleSheet,
} from 'react-native';
import { msg } from 'iflux-native';
const { width: SCREEN_WIDTH } = Dimensions.get('window');


/**
 * TextEditor
 */
export default class TextEditor extends React.Component {
  render() {
    const { value } = this.props;

    return (
      <TextInput
        style={styles.textInput}
        clearButtonMode='while-editing'
        clearTextOnFocus={true}
        placeholder={'type some thing here'}
        value={ value }
        onEndEditing={ this._handleEndEditing }
        onChangeText={ this._handleChangeText }
      />
    );
  }

  _handleChangeText = (text: string) => {
    msg.emit('mvc:text-input', text);
  };


  _handleEndEditing = (e: Object) => {
    msg.emit('mvc:add', e.nativeEvent.text);
  };
}

const styles = StyleSheet.create({
  textInput: {
    width: SCREEN_WIDTH,
    height: 100,
    backgroundColor:'#FDFDFD',
    color: '#666',
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#ddd',
    borderRadius: 3
  }
});
