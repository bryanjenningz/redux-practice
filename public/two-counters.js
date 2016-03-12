var view = React.createClass.bind(React);
var rootEl = document.querySelector('#app');

var counters = function(state, action) {
  if (state === undefined) return [0, 0];
  switch (action.type) {
    case 'INCREMENT':
      var i = action.index;
      return state.slice(0, i).concat(
        state[i] + 1
      ).concat(state.slice(i + 1));
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

var Counters = view({
  render: function() {
    return (
      <div>
        <Counter index={0} />
        <Counter index={1} />
      </div>
    );
  }
});

var render = function() {
  ReactDOM.render(<Counters />, rootEl);
};

var store = Redux.createStore(counters);
store.subscribe(render);
render();
