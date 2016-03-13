var view = React.createClass.bind(React);
var rootEl = document.querySelector('#app');

var counters = function(state, action) {
  if (state === undefined) return [];
  switch (action.type) {
    case 'INCREMENT':
      var i = action.index;
      return state.slice(0, i).concat(
        state[i] + 1
      ).concat(state.slice(i + 1));
    case 'ADD_COUNTER':
      return state.concat([0]);
    case 'REMOVE_COUNTER':
      return state.slice(0, state.length - 1);
    default:
      return state;
  }
};

var Counter = view({
  render: function() {
    return (
      <div>
        <button onClick={() => store.dispatch({type: 'INCREMENT', index: this.props.index})}>+</button>
        <span>Click count: {store.getState()[this.props.index]}</span>
      </div>
    );
  }
});

var CounterList = view({
  render: function() {
    return (
      <div>
        <div>
          <button onClick={() => store.dispatch({type: 'ADD_COUNTER'})}>Add counter</button>
          <button onClick={() => store.dispatch({type: 'REMOVE_COUNTER'})}>Remove counter</button>
        </div>
        {store.getState().map(function(count, index) {
          return <Counter index={index} />
        })}
      </div>
    );
  }
});

var render = function() {
  ReactDOM.render(<CounterList />, rootEl);
};

var store = Redux.createStore(counters);
store.subscribe(render);
render();
