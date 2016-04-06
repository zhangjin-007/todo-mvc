//@flow
import React, {
  View,
  Text,
  PixelRatio,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { msg } from 'iflux-native';


export default class ActionList extends React.Component {
  render() {
    const { filter } = this.props;

    return (
      <View style={styles.filter}>
        <TouchableOpacity
          style={styles.filterIterm}
          onPress={() => this._handleFilter(0)}>
          <Text style={[styles.font, filter == 0 && {color: '#e63a59'}]}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterIterm}
          onPress={() => this._handleFilter(1)}>
          <Text style={[styles.font, filter == 1 && {color: '#e63a59'}]}>Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterIterm}
          onPress={() => this._handleFilter(2)}>
          <Text style={[styles.font, filter == 2 && {color: '#e63a59'}]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _handleFilter = (status: number) => {
    msg.emit('mvc:filter', status);
  };
}


const styles = StyleSheet.create({
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#eee',
    backgroundColor: '#fff'
  },
  filterIterm: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
