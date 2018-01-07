<form>
                        <input type='text' name='description' value={this.state.description} placeholder='Enter Description' onChange={this.handleChange.bind(this)} />
                        <input type='number' name='amount' value={this.state.amount} onChange={this.handleChange.bind(this)}/>
                    </form>



<button onClick={this.openModal}>Add New Entry</button>
                <ReactModal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={this.state.openModal}
                    onRequestClose={this.closeModal}
                    contentLabel='Modal'
                >
                        <button onClick={this.closeModal}>Close form</button>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                        <label> Description:
                            <input type="text" name="description" placeholder="description" value={this.state.description} onChange={this.handleChange.bind(this)} />
                        </label><br />
                        <label> Amount:
                            <input type="number" name="amount" placeholder="amount" value={this.state.amount} onChange={this.handleChange.bind(this)}/>
                        </label><br />
                        <div>
                            Money In
                            <input
                                type="radio"
                                name='money'
                                checked={this.state.value === 'income'}
                                onClick={() => this.handleRadioChange('income')}
                            />
                            Money out
                            <input
                                type="radio"
                                name='money'
                                checked={this.state.value === 'expense'}
                                onClick={() => this.handleRadioChange('expense')}
                            />
                        </div>
                        <input type="submit" value="Submit" />
                    </form>
                </ReactModal>
                <div>
                    <ol className='type-columns income'>
                        {allItems.filter((item) => (
                            item.type === 'income')).map((income) => (
                            <li key={income.id} className="contact-details">
                                <p>{income.description}</p>
                                <p>{income.amount}</p>
                                <button onClick={() => this.deleteEntry(income)}>Delete</button>
                            </li>
                        ))}
                    </ol>
                    <ol className='type-columns expenses'>
                        {allItems.filter((item) => (
                            item.type === 'expense')).map((expense) => (
                            <li key={expense.id} className="contact-details">
                                <p>{expense.description}</p>
                                <p>{expense.amount}</p>
                                <button onClick={() => this.deleteEntry(expense)}>Delete</button>
                            </li>
                        ))}
                    </ol>
                    <div className="totals">
                        <p>Income: {income}</p>
                        <p>Expenses: {expenses}</p>
                        <p>Budget: {budget}</p>
                    </div>


                </div>










/* Main App Here */
import React, { Component } from 'react';
import './App.css';
import { guid } from './helpers/helper'
import Modal from 'react-modal'
import * as Images from './importImages/images'

class App extends Component {
    constructor() {
        super();
        this.state = {
            description: "",
            amount: 0,
            type: "",
            allItems: [],
            income: 0,
            expenses: 0,
            budget: 0,
            modalIsOpen: false
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    /* Modal functionality */
    openModal() {
        this.setState({
            modalIsOpen: true
        })
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        })
    }
    /* Modal functionality */

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
        // console.log(newItem);
        this.setState({
            description: "",
            amount: 0
        })
    }

    handleRadioChange(value) {
        this.setState({
            type: value
        });
    }

    render(){
        if(this.state.allItems.length > 0) {
            const allItems = this.state.allItems
        }
        const { income, expenses, budget, allItems, } = this.state
        return (
            <div className='App'>
                <button onClick={this.openModal}><img src={Images.modalButton} className='button--open'/></button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    className='modal'
                    overlayClassName='overlay'
                    contentLabel='Modal'
                    ariaHideApp={false}
                >
                    <form className="main-form" onSubmit={this.handleSubmit.bind(this)}>
                        <label> Description:<br />
                            <input type="text" name="description" placeholder="description" value={this.state.description} onChange={this.handleChange.bind(this)} />
                        </label><br />
                        <label> Amount:<br />
                            <input type="number" name="amount" placeholder="amount" value={this.state.amount} onChange={this.handleChange.bind(this)}/>
                        </label><br />
                        <div>
                            Money In
                            <input
                                type="radio"
                                name='money'
                                checked={this.state.value === 'income'}
                                onClick={() => this.handleRadioChange('income')}
                            />
                            Money out
                            <input
                                type="radio"
                                name='money'
                                checked={this.state.value === 'expense'}
                                onClick={() => this.handleRadioChange('expense')}
                            />
                            <input type='text' value='income' name='money'/>
                        </div>
                        <input type="submit" value="Submit" />
                    </form>
                    <button onClick={this.closeModal}><img src={Images.closeButton}/></button>
                </Modal>
                <div>
                    <ol className='type-columns income'>
                        {allItems.filter((item) => (
                            item.type === 'income')).map((income) => (
                            <li key={income.id} className="contact-details">
                                <p>{income.description}</p>
                                <p>{income.amount}</p>
                                <button onClick={() => this.deleteEntry(income)}>Delete</button>
                            </li>
                        ))}
                    </ol>
                    <ol className='type-columns expenses'>
                        {allItems.filter((item) => (
                            item.type === 'expense')).map((expense) => (
                            <li key={expense.id} className="contact-details">
                                <p>{expense.description}</p>
                                <p>{expense.amount}</p>
                                <button onClick={() => this.deleteEntry(expense)}>Delete</button>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default App;






