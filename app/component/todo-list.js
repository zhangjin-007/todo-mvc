//@flow
import React, {
  View,
  ListView,
  StyleSheet,
} from 'react-native';
import { msg } from 'iflux-native';
import ListItem from './list-item';


export default class TodoList extends React.Component {
  _ds: Object;

  constructor(props: Object) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
  }


  render() {
    return (
      <ListView
        style={styles.listView}
        dataSource={this.ds.cloneWithRows(this._getDataSource().toJS())}
        renderRow={this._renderRow}
      />
    );
  }

  _renderRow = ({id, text, done}: Object, _: string, index: number) => {
    return (<ListItem id={id} text={text} done={done} key={index}/>);
  };


  _getDataSource = (): Object => {
    const { store } = this.props;
    let filter = store.get('filter');
    let todos = store.get('todos').toList();

    if (filter == 1) {
      return todos.filter((v) => !v.get('done'));
    } else if (filter == 2) {
      return todos.toSeq().filter((v) => v.get('done'));
    }

    return todos;
  };
}


const styles = StyleSheet.create({
  listView:{
    flex:1,
    backgroundColor: '#FDFDFD'
  },
});
