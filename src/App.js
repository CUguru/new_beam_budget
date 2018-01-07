import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import { Route, Link } from 'react-router-dom'
import Dashboard from './Dashboard'

class App extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			shown: true
		}
	}

	updateName = (username) => {
		this.setState({
			username: username
		})
	}

	toggle = () => {
		this.setState({
			shown: !this.state.shown
		})
	}

	getUserName = () => {
		var name = this.state.username
		return name
	}
	render() {
		const { username } = this.state
		var showForm = {
            display: this.state.shown ? "block" : "none"
        };

		return (
			<div className='App'>
				<form style={ showForm }>
					<input
						type='text'
						value={username}
						onChange={(event) => this.updateName(event.target.value)}
					/>
					<Link to='/dashboard' onClick={this.toggle}>Get Started</Link>
				</form>

				<Route path='/dashboard' render={({history}) => (
					<Dashboard
						username={() => {
							this.getUserName
							history.push('/')
						}}
					/>
				)}/>
			</div>
		)
	}
}

export default App;