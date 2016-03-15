var view = React.createClass.bind(React);
var rootEl = document.querySelector('#app');

var randomImage = function(state, action) {
  if (state === undefined) {
    return 'http://media4.giphy.com/media/UT0rlr8iYNEAM/giphy.gif';
  }

  switch (action.type) {
    case 'NEW_IMAGE':
      return action.src;
    default:
      return state;
  }
};

var RandomImage = view({
  render: function() {
    return (
      <div>
        <button style={{display: 'block'}} onClick={() => {
          $.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=funny+cats')
          .then(function(resp) {
            store.dispatch({type: 'NEW_IMAGE', src: resp.data.image_url});
          }).fail(function(error) {
            console.error(error);
          });
        }}>New GIF!</button>
        <img height="200" width="200" src={this.props.src} />
      </div>
    )
  }
});

var render = function() {
  ReactDOM.render(<RandomImage src={store.getState()} />, rootEl);
};

var store = Redux.createStore(randomImage);
store.subscribe(render);
render();
