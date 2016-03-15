var view = React.createClass.bind(React);
var rootEl = document.querySelector('#app');
var ENTER_KEY = 13;

var randomImages = function(state, action) {
  if (state === undefined) return [];
  switch (action.type) {
    case 'NEW_IMAGE':
      var i = action.index;
      var oldElement = state[i];
      return state.slice(0, i).concat(Object.assign({}, oldElement, {
        src: action.src
      })).concat(state.slice(i + 1));
    case 'ADD_IMAGE':
      return state.concat({
        query: action.query,
        src: 'http://media4.giphy.com/media/UT0rlr8iYNEAM/giphy.gif'
      });
    default:
      return state;
  }
};

var RandomImage = view({
  render: function() {
    var index = this.props.index;
    return (
      <div>
        <h3>{this.props.query}</h3>
        <button style={{display: 'block'}} onClick={() => {
          $.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + this.props.query.replace(/ /g, '+'))
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
  componentDidMount: function() {
    this.input.focus();
  },
  render: function() {
    return (
      <div>
        <div>
          <input
            placeholder="Enter a GIF category"
            ref={(node) => {
              this.input = node;
            }}
            onKeyDown={(e) => {
              if (e.keyCode === ENTER_KEY) {
                store.dispatch({type: 'ADD_IMAGE', query: this.input.value});
                this.input.value = '';
              }
            }}
          />
        </div>

        {store.getState().map(function(element, index) {
          return <RandomImage src={element.src} index={index} query={element.query} />
        })}
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
