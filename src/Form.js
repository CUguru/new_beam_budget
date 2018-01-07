import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import { Route, Link } from 'react-router-dom'
import Dashboard from './Dashboard'

class Form extends Component {
	constructor() {
		super();
		this.state = {
			username: ''
		}
	}

	updateName = (username) => {
		this.setState({
			username: username
		})
	}

	render() {
		const { username } = this.state
		return (
			<div className='form'>
				<input
					type='text'
					value={username}
					onChange={(event) => this.updateName(event.target.value)}
				/>
				<Link to='/dashboard'>Get Started</Link>
				<Route path='/dashboard' render={() => (
					<Dashboard username={this.state.username} />
				)}/>
			</div>
		)
	}
}

export default Form;