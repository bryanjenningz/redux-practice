var view = React.createClass.bind(React)
var nextId = 0

var Todos = view({
  getInitialState: function() {
    return {filter: 'all', todos: []}
  },
  addTodo: function(e) {
    e.preventDefault();
    this.setState({
      todos: this.state.todos.concat({
        text: this.input.value,
        completed: false,
        key: nextId++
      })
    })
    this.input.value = ''
  },
  toggle: function(e) {
    var key = Number(e.target.dataset.key)
    var i = this.state.todos.length - 1
    while (i >= 0 && this.state.todos[i].key !== key) { i-- }
    if (i >= 0) {
      this.setState({
        todos: [
          ...this.state.todos.slice(0, i),
          Object.assign({}, this.state.todos[i], {
            completed: !this.state.todos[i].completed
          }),
          ...this.state.todos.slice(i + 1)
        ]
      })
    }
  },
  remove: function(e) {
    var key = Number(e.target.dataset.key)
    this.setState({
      todos: this.state.todos.filter(todo => todo.key !== key)
    })
  },
  clearCompleted: function() {
    this.setState({
      todos: this.state.todos.filter(todo => !todo.completed),
      filter: 'all'
    })
  },
  setFilter: function(filter) {
    this.setState({filter: filter})
  },
  componentDidMount: function() {
    this.input.focus()
  },
  render: function() {
    var ulStyle = {'paddingLeft': '10px', 'width': '250px'}
    var liStyle = {'listStyle': 'none'}
    var completedStyle = {'textDecoration': 'line-through'}
    var right = {'float': 'right'}

    var bottom;
    if (this.state.todos.some(todo => todo.completed)) {
      bottom = (
        <div>
          <button onClick={this.clearCompleted}>Clear completed</button>
          <span className={this.state.filter !== 'all' ? 'btn btn-default' : ''} onClick={() => this.setFilter('all')}>All</span>
          <span className={this.state.filter !== 'unfinished' ? 'btn btn-default' : ''} onClick={() => this.setFilter('unfinished')}>Unfinished</span>
          <span className={this.state.filter !== 'completed' ? 'btn btn-default' : ''} onClick={() => this.setFilter('completed')}>Completed</span>
        </div>
      )
    } 

    var filter = {
      all: () => true,
      unfinished: (todo) => !todo.completed,
      completed: (todo) => todo.completed
    }[this.state.filter]
    var displayedTodos = this.state.todos.filter(filter)

    return (
      <div>
        <form onSubmit={this.addTodo}>
          <input ref={(node) => this.input = node} />
          <button type="submit">Add Todo</button>
        </form>
        <ul style={ulStyle}>
          {displayedTodos.map((todo, i) => (
            <li style={liStyle} key={todo.key}>
              <input type="checkbox" data-key={todo.key} onChange={this.toggle} value={todo.completed ? 'on' : 'off'} />
              <span style={todo.completed ? completedStyle : {}}> {todo.text}</span>
              <span onClick={this.remove} data-key={todo.key} style={right} className="glyphicon glyphicon-remove" aria-hidden="true"></span> 
            </li>
          ))}
        </ul>
        {bottom}
      </div>
    )
  }
})

ReactDOM.render(<Todos />, document.querySelector('#app'))
