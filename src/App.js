import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Dashboard from './Dashboard'
import Form from './Form'

class App extends Component {
	constructor() {
		super();
		this.state = {
			username: ''
		}
	}

	addUserName = (username) => {
		this.setState({
			username: username
		})
	}

	render() {
		return (
			<div className='App'>
				<Switch>
					<Route exact path='/' render={() => (
						<Form onUserInput={this.addUserName} />
					)}/>
					<Route exact path='/dashboard' render={() => (
	                    <Dashboard username={this.state.username} />
	                )}/>
				</Switch>

			</div>
		)
	}
}

export default App;