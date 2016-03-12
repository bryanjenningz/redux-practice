var view = React.createClass.bind(React);
var rootEl = document.querySelector('#app');

var counter = function(state, action) {
  if (state === undefined) return 0;
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
};

var Counter = view({
  render: function() {
    return (
      <div>
        <button onClick={() => store.dispatch({type: 'INCREMENT'})}>+</button>
        <span>Click count: {store.getState()}</span>
      </div>
    );
  }
});

var render = function() {
  ReactDOM.render(<Counter />, rootEl);
};

var store = Redux.createStore(counter);
store.subscribe(render);
render();
