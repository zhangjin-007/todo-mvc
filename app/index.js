//@flow
import React, {
  View,
  StyleSheet
}  from 'react-native';
import appStore from './store';
import {msg, connectToStore} from 'iflux-native';
import TextEditor from './component/text-editor';
import ActionList from './component/action-list';
import TodoList from './component/todo-list';


class TodoMVC extends React.Component {
  render() {
    const { store } = this.props;
    const inputValue = store.get('inputValue');
    const filter = store.get('filter');

    return (
      <View style={styles.container}>
        <TextEditor value={ inputValue }/>
        <ActionList filter={filter}/>
        <TodoList store={ store }/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD'
  }
});


export default connectToStore(appStore)(TodoMVC);
