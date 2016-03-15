var view = React.createClass.bind(React);
var rootEl = document.querySelector('#app');

var randomImages = function(state, action) {
  if (state === undefined) {
    return [0, 1].map(() => 'http://media4.giphy.com/media/UT0rlr8iYNEAM/giphy.gif');
  }

  switch (action.type) {
    case 'NEW_IMAGE':
      var i = action.index;
      return state.slice(0, i).concat(
        action.src
      ).concat(state.slice(i + 1));
    default:
      return state;
  }
};

var RandomImage = view({
  render: function() {
    var index = this.props.index;
    return (
      <div>
        <button style={{display: 'block'}} onClick={() => {
          $.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=funny+cats')
          .then(function(resp) {
            store.dispatch({type: 'NEW_IMAGE', src: resp.data.image_url, index: index});
          }).fail(function(error) {
            console.error(error);
          });
        }}>New GIF!</button>
        <img height="200" width="200" src={this.props.src} />
      </div>
    );
  }
});

var RandomImages = view({
  render: function() {
    return (
      <div>
        <RandomImage src={store.getState()[0]} index={0} />
        <RandomImage src={store.getState()[1]} index={1} />
      </div>
    );
  }
});

var render = function() {
  ReactDOM.render(<RandomImages />, rootEl);
};

var store = Redux.createStore(randomImages);
store.subscribe(render);
render();
