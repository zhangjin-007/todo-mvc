//@flow
import React, {
  View,
  Text,
  Switch,
  addons,
  PixelRatio,
  Dimensions,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { msg } from 'iflux-native';
import reactMixin from 'react-mixin';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { PureRenderMixin } = addons;


class ListItem extends React.Component {
  render() {
    const {done, text, id}  = this.props;

    return (
      <View style={styles.item}>
        <View style={styles.rowView}>
          <Switch
            value={done}
            onValueChange={ (val) => this._handleValueChange(id, val) }
            style={styles.switch}/>
          <Text style={styles.text}>{text}</Text>
        </View>

        <TouchableOpacity style={styles.delete}
          onPress={()=> msg.emit('mvc:delete', id)}>
          <Text style={styles.font}>X</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _handleValueChange = (id: number, val: boolean) => {
    msg.emit('mvc:change-status', id);
  };
}


const styles = StyleSheet.create({
  item:{
    flexDirection: 'row',
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#ddd',
    width: SCREEN_WIDTH,
    height:40,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  switch:{
    marginLeft: 10
  },
  text: {
    color: '#666',
    marginLeft: 10
  },
  font: {
    color: '#666'
  },
  rowView:{
    flexDirection: 'row',
    alignItems: 'center'
  },

  delete:{
    marginRight: 10
  }
});

reactMixin(ListItem.prototype, PureRenderMixin);
export default ListItem;
