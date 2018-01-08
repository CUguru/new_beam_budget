import React, { Component } from 'react'
// import escapeRegExp from 'escape-string-regexp'
import { Link } from 'react-router-dom'
// import Dashboard from './Dashboard'
import PropTypes from 'prop-types'

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
        }, () => {this.props.onUserInput(this.state.username)})
        // this.props.onUserInput(this.state.username)
    }

    // onSubmit = (event) => {
    // 	event.preventDefault();
    // 	this.props.onUserInput(this.state.username)
    // }

	render() {
		const { username } = this.state
		// console.log(username)
		return (
			<div className='form'>
				<form>
					<input
					type='text'
					value={username}
					onChange={(event) => this.updateName(event.target.value)}
				/>
				</form>

				<Link to='/dashboard'>Get Started</Link>
			</div>
		)
	}
}

export default Form;


Form.propTypes = {
	onUserInput: PropTypes.func.isRequired
}