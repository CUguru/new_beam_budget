import React, { Component } from 'react'
// import escapeRegExp from 'escape-string-regexp'
import './App.css';
import { Link } from 'react-router-dom'
import { financialHealth, quickEntry, whiteLogo } from './importImages/images'
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
				<div className='gradient-background upper-section'>
					<div className='logo' id='white-logo'>
						<img src={ whiteLogo } className='logo--image' alt='Beam White Logo'/>
					</div>

					<h2 id='beam--welcome'>Welcome to Beam Budget</h2>
					<p className='beam--intro'>A quick and easy way to get your personal finances in control</p>

					<input
						type='text'
						value={username}
						onChange={(event) => this.updateName(event.target.value)}
						className='intro--form'
						placeholder='Enter your First Name'
					/>
					<Link to='/dashboard' className='button--get-started'>Get Started</Link>

				</div>
				<div className='lower-section'>
					<div className='beam--benefits'>
						<img src={ quickEntry } alt='Quick Entry'/>
						<h4>Quick Entry</h4>
						<p>Beam Budget is a really quick way to visualize your finances</p>
					</div>
					<div className='beam--benefits'>
						<img src={ financialHealth } alt='Financial Health'/>
						<h4>Financial Health</h4>
						<p>We calculate the current standings of your finances for you</p>
					</div>
				</div>
			</div>
		)
	}
}

export default Form;


Form.propTypes = {
	onUserInput: PropTypes.func.isRequired
}