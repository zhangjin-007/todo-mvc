import React, {
  View,
  StyleSheet,
  TextInput,
  PixelRatio,
  Dimensions,
  ListView,
  Text,
  TouchableOpacity,
  Switch
}  from 'react-native';
import appStore from './store';
import {msg, mixins} from 'iflux-native';
const StoreMixin = mixins.StoreMixin;


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

//数据源
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
export default ToDos = React.createClass({
  mixins:[StoreMixin(appStore)],

  render() {
    const store = appStore.data();
    let todos = store.get('todos');
    const inputValue = store.get('inputValue');
    const filter = store.get('filter');

    if(filter == 1) {
      todos = todos.filter(val => val.get('done') == false);
    }else if(filter == 2) {
      todos = todos.filter(val => val.get('done') == true);
    }

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          clearButtonMode='while-editing'
          clearTextOnFocus={true}
          onEndEditing={(e) => msg.emit('mvc:add', e.nativeEvent.text)}
          placeholder={'type some thing here'}
          val={inputValue}
          onChangeText={(inputValue) => msg.emit('mvc:text-input', inputValue)}
        />
        <View style={styles.filter}>
          <TouchableOpacity style={styles.filterIterm} onPress={this._handleFilter.bind(this, 0)}>
            <Text style={[styles.font, filter == 0 && {color: '#e63a59'}]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterIterm} onPress={this._handleFilter.bind(this, 1)}>
            <Text style={[styles.font, filter == 1 && {color: '#e63a59'}]}>Activity</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterIterm} onPress={this._handleFilter.bind(this, 2)}>
            <Text style={[styles.font, filter == 2 && {color: '#e63a59'}]}>Completed</Text>
          </TouchableOpacity>
        </View>
        <ListView
          style={styles.listView}
          dataSource={ds.cloneWithRows(todos.toJS())}
                  renderRow={this._renderRow}
        />
      </View>
    );
  },

  _renderRow({id, text, done}, _, index){
    return (
      <View style={styles.item}>
        <View style={styles.rowView}>
          <Switch value={done} onValueChange={() => msg.emit('mvc:change-status', {id,text,done})}
                  style={styles.switch}
          />
          <Text style={styles.text} key={index}>{text}</Text>
        </View>
        <TouchableOpacity style={styles.delete} onPress={()=> msg.emit('mvc:delete', id)}>
          <Text style={styles.font}>X</Text>
        </TouchableOpacity>
      </View>

    )
  },

  //过滤查询
  _handleFilter(status){
    msg.emit('mvc:filter', status);
  }
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD'
  },
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
  },
  listView:{
    flex:1,
    backgroundColor: '#FDFDFD'
  },
  textInput: {
    width: SCREEN_WIDTH,
    height: 100,
    backgroundColor:'#FDFDFD',
    color: '#666',
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#ddd',
    borderRadius: 3
  },
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