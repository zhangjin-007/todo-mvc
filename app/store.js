import {msg, Store} from 'iflux-native';
import {fromJS} from 'immutable';

/**
 * todomvc store
 */
const appStore = Store({
  todos: {},
  //0all,1 activity,2 completed
  filter: 0,
  inputValue: ''
});

export default appStore;


/**
 * generate uuid
 */
const uuid = (function() {
  var i = 0;
  return function() {
    return '' + (++i);
  }
})();

msg
  .on('mvc:add', add)
  .on('mvc:delete', deleteById)
  .on('mvc:text-input', handleInput)
  .on('mvc:change-status', changeStatus)
  .on('mvc:filter', filter);


function add(val) {
  const id = uuid();

  appStore.cursor().withMutations((cursor) => {
    cursor
      .set('inputValue', '')
      .setIn(['todos', id], fromJS({
        id,
        text: val,
        done: false
      }));
  });
}


function deleteById(id) {
  appStore.cursor().deleteIn(['todos', id]);
}


function handleInput(text){
  appStore.cursor().set('inputValue', text);
}


function changeStatus(id) {
  appStore.cursor().updateIn(['todos', id, 'done'], (done) => {
    return !done;
  });
}


function filter(status){
  appStore.cursor().set('filter', status);
}
