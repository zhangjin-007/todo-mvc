import {msg, Store} from 'iflux-native';
import {fromJS, List, Map} from 'immutable';
/**
 * todomvc store
 */
const appStore = Store({
  todos: {},
  //0all,1 activity,2 completed
  filter: 0,
  inputValue: ''
});



/**
 * generate uuid
 */
var uuid = (function() {
  var i = 0;
  return function() {
    return '' + (++i);
  }
})();

msg
	//
	.on('mvc:add', add)
  .on('mvc:delete', deleteById)
  .on('mvc:text-input', handleInput)
  .on('mvc:change-status', changeStatus)
  .on('mvc:filter', filter)
;


function add(val) {
  var index = uuid();
  appStore.cursor().withMutations((cursor) => {
    cursor.set('inputValue', '');
    cursor.setIn(['todos', index], fromJS({
      id: index,
      text: val,
      done: false
    }));
  });
}


function deleteById(id){
  appStore.cursor().deleteIn(['todos', id]);
}


function handleInput(text){
  console.log('text', text);
  appStore.cursor().set('inputValue', text);
}


function changeStatus({id, text, done}) {
  appStore.cursor().updateIn(['todos', id, 'done'], done => !done);
}


function filter(status){
  appStore.cursor().set('filter', status);
}


export default
appStore;