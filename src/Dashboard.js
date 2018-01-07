import React, { Component } from 'react';
import './App.css';
import { guid } from './helpers/helper'
import PropTypes from 'prop-types'
// import Modal from 'react-modal'
// import * as Images from './importImages/images'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            amount: 0,
            type: "",
            allItems: [],
            income: 0,
            expenses: 0,
            budget: 0,
            showing1: false,
            showing2: false
            // modalIsOpen: false
        }

        // this.openModal = this.openModal.bind(this);
        // this.closeModal = this.closeModal.bind(this);
    }

    toggleForm1 = () => {
        if(this.state.showing2 === true) {
            this.setState({
                showing2: !this.state.showing2
            })
        }
        this.setState({
            showing1: !this.state.showing1,
            type: 'income'
        })
    }

    toggleForm2 = () => {
        if(this.state.showing1 === true) {
            this.setState({
                showing1: !this.state.showing1
            })
        }
        this.setState({
            showing2: !this.state.showing2,
            type: 'expense'
        })
    }

    addItem(itemObj) {
        this.setState((prevState) => ({
            allItems: [...prevState.allItems, itemObj]
        }), this.validateArray)
    }

    validateArray() {
        if(this.state.allItems.length >= 0) {
            this.calculateTotal(this.state.allItems);
        }

    }

    calculateTotal(array) {
        let expenses, income;
        expenses = array.filter((item) => {
            return item.type === 'expense'
        }).map((object) => {
            return object.amount
        }).reduce((total, amount) => {
            return total + amount
        }, 0)

        income = array.filter((item) => {
            return item.type === 'income'
        }).map((object) => {
            return object.amount
        }).reduce((total, amount) => {
            return total + amount
        }, 0)

        this.setState({
            income,
            expenses
        }, this.getBudget)
    }

    getBudget() {
        const budget = this.state.income - this.state.expenses;
        this.setState({
            budget
        }, () => console.log(`Budget: ${this.state.budget}`))
    }

    deleteEntry(item) {
        this.setState((state) => ({
            allItems: state.allItems.filter((i) => i.id !== item.id)
        }), this.validateArray)
    }

    handleChange(event) {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;

        if(name === 'amount') {
            this.setState({
            amount: Number(value)
          })
        } else if(name === 'description') {
            this.setState({
            description: value
          })
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        let newItem = {
            id: guid(),
            amount: this.state.amount,
            description: this.state.description,
            type: this.state.type
        }

        this.addItem(newItem);
        console.log(newItem);
        this.setState({
            description: "",
            amount: 0
        })
    }

    render(){
        var showHideForm1 = {
            display: this.state.showing1 ? "block" : "none"
        };

        var showHideForm2 = {
            display: this.state.showing2 ? "block" : "none"
        };

        console.log(this.state.type);

        if(this.state.allItems.length > 0) {
            const allItems = this.state.allItems
        }
        const { username } = this.props
        const { income, expenses, budget, allItems } = this.state

        // console.log(username);
        return (
            <div className='dashboard'>

                    <form style={ showHideForm1 } onSubmit={this.handleSubmit.bind(this)}>
                        <label> Description:<br />
                            <input type="text" name="description" placeholder="description" value={this.state.description} onChange={this.handleChange.bind(this)} />
                        </label><br />
                        <label> Amount:<br />
                            <input type="number" name="amount" placeholder="amount" value={this.state.amount} onChange={this.handleChange.bind(this)}/>
                        </label><br />
                        <input type="submit" value="Submit" />
                        <button onClick={this.toggleForm1}>Cancel</button>
                    </form>
                    <button onClick={this.toggleForm1}>ShowForm1</button>

                    <form style={ showHideForm2 } onSubmit={this.handleSubmit.bind(this)}>
                        <label> Description:<br />
                            <input type="text" name="description" placeholder="description" value={this.state.description} onChange={this.handleChange.bind(this)} />
                        </label><br />
                        <label> Amount:<br />
                            <input type="number" name="amount" placeholder="amount" value={this.state.amount} onChange={this.handleChange.bind(this)}/>
                        </label><br />
                        <input type="submit" value="Submit" />
                        <button onClick={this.toggleForm2}>Cancel</button>
                    </form>
                    <button onClick={this.toggleForm2}>ShowForm2</button>

                    <div>
                        <p>{ budget }</p>
                        <p>{ username }</p>
                    </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    username: PropTypes.func.isRequired
}
export default Dashboard;




