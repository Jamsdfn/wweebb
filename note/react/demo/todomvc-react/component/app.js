(function (React) {
    const todos = [
        {id: 1,title: 'eat', completed: true},
        {id: 2,title: 'eat', completed: false},
        {id: 3,title: 'eat', completed: true}
    ]
    /*
    * 修改 HTML 代码
    * 单标签 加结束的 /
    * class =》className
    * value =》defaultValue
    * checked =》defaultChecked
    * autofocus =》autoFocus
    * for =》htmlFor
    * */
    window.App = class extends React.Component {
        constructor () {
            super()
            this.state = {
                todos
            }
        }
        render () {
            return (
                <div>
                    <section className="todoapp">
                        <header className="header">
                            <h1>todos</h1>
                            <input onKeyDown={this.handleNewTodoKeyDown.bind(this)} className="new-todo" placeholder="What needs to be done?" autoFocus />
                        </header>
                        {
                            this.state.todos.length > 0 && (
                                <div>
                                    <section className="main">
                                        <input id="toggle-all" className="toggle-all" type="checkbox" />
                                        <label htmlFor="toggle-all">Mark all as complete</label>
                                        <ul className="todo-list">
                                            {/*<li className="completed">*/}
                                            {/*<div className="view">*/}
                                            {/*<input className="toggle" type="checkbox" defaultChecked />*/}
                                            {/*<label>Taste JavaScript</label>*/}
                                            {/*<button className="destroy"></button>*/}
                                            {/*</div>*/}
                                            {/*<input className="edit" defaultValue="Create a TodoMVC template" />*/}
                                            {/*</li>*/}
                                            {/*<li>*/}
                                            {/*<div className="view">*/}
                                            {/*<input className="toggle" type="checkbox" />*/}
                                            {/*<label>Buy a unicorn</label>*/}
                                            {/*<button className="destroy"></button>*/}
                                            {/*</div>*/}
                                            {/*<input className="edit" defaultValue="Rule the web" />*/}
                                            {/*</li>*/}
                                            {this.getTodoList()}
                                        </ul>
                                    </section>
                                    <footer className="footer">
                                        <span className="todo-count"><strong>0</strong> item left</span>
                                        <ul className="filters">
                                            <li>
                                                <a className="selected" href="#/">All</a>
                                            </li>
                                            <li>
                                                <a href="#/active">Active</a>
                                            </li>
                                            <li>
                                                <a href="#/completed">Completed</a>
                                            </li>
                                        </ul>
                                        <button className="clear-completed">Clear completed</button>
                                    </footer>
                                </div>
                            )
                        }

                    </section>
                    <footer className="info">
                        <p>Double-click to edit a todo</p>
                        <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
                        <p>Created by <a href="http://todomvc.com">you</a></p>
                        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
                    </footer>
                </div>
            )
        }
        getTodoList () {
            return this.state.todos.map(todo => {
                return(
                    <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                        <div className="view">
                            <input className="toggle" type="checkbox" defaultChecked />
                            <label>{todo.title}</label>
                            <button className="destroy"></button>
                        </div>
                        <input className="edit" defaultValue="Create a TodoMVC template" />
                    </li>
                )
            })
        }
        handleNewTodoKeyDown (e) {
            const {target,keyCode} = e
            if (keyCode !== 13) {
                return
            }
            const inputText = target.value.trim()
            if (!inputText.length) {
                return
            }
            const lastTodo = this.state.todos[this.state.todos.length - 1]
            // 数组追加
            this.state.todos.push({
                id: lastTodo ? lastTodo.id + 1 : 1,
                title: inputText,
                completed: false
            })
            // 数据更新
            this.setState({
                todos: this.state.todos
            })

            target.value = ''
        }
    }
})(React)
