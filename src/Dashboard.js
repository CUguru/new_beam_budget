import React, { Component } from 'react';
import './App.css';
import { guid } from './helpers/helper'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { greenLogo } from './importImages/images'

var styles = {
    out: {
        backgroundColor: 'white'
    },
    in: {
        backgroundColor: 'white'
    }
}

class ProgressCircle extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const squareSize = this.props.squareSize;

        const circleRadius = (this.props.squareSize - this.props.strokeWidth) / 2;

        const viewBox = `0 0 ${squareSize} ${squareSize}`;

        const dashArray = circleRadius * Math.PI * 2;

        const offsetDash = dashArray - dashArray * this.props.percentage / 100;

        return(
            <svg
                width={this.props.squareSize}
                height={this.props.squareSize}
                viewBox={viewBox}>
                <circle
                    className="progress-circle-background"
                    cx={this.props.squareSize / 2}
                    cy={this.props.squareSize / 2}
                    r={circleRadius}
                    strokeWidth={`${3}px`} />

                <circle
                    className="progress-circle-path"
                    cx={this.props.squareSize / 2}
                    cy={this.props.squareSize / 2}
                    r={circleRadius}
                    strokeWidth={`${this.props.strokeWidth}px`}
                    transform={`rotate(-90 ${this.props.squareSize / 2} ${this.props.squareSize / 2})`}
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: offsetDash
                    }} />
                    <text
                        className="circle--heading"
                        x="23%"
                        y="30%"
                        dy=".3em"
                        textAnchor="start">
                        FINANCIAL HEALTH
                    </text>
                    <text
                        className="financial-health-text"
                        x="50%"
                        y="50%"
                        dy=".2em"
                        textAnchor="middle">
                        {`${this.props.percentage}%`}
                    </text>
            </svg>
        );
    }
}

ProgressCircle.defaultProps = {
    squareSize: 300,
    percentage: 0,
    strokeWidth: 10
};

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
            showing2: false,
            showAddButton1: true,
            showAddButton2: true,
            hover: 'out',
            username: this.props.username,
            percentage: 0
        };
    }

    showDelete() {
        this.setState({
            hover: 'in'
        })
    }

    hideDelete() {
        this.setState({
            hover: 'out'
        })
    }

    getPercentage = () => {
        let percentage;
        if((this.state.income === 0) || (this.state.budget === 0)) {
            this.setState({
                percentage: 0
            })
        } else {
            percentage = (this.state.budget / this.state.income) * 100
            this.setState({
                percentage: percentage
            })
        }
    }

    toggleForm1 = () => {
        if((this.state.showing2 === true) && (this.state.showAddButton2 === false)) {
            this.setState({
                showing2: !this.state.showing2,
                showAddButton2: !this.state.showAddButton2
            })
        }
        this.setState({
            showing1: !this.state.showing1,
            showAddButton1: !this.state.showAddButton1,
            type: 'income'
        })
    }

    closeForm1 = () => {
        console.log('Clicked on cancel, should close form')
        this.setState({
            showing1: !this.state.showing1,
            showAddButton1: !this.state.showAddButton1
        })
    }

    toggleForm2 = () => {
        if((this.state.showing1 === true) && (this.state.showAddButton1 === false)) {
            this.setState({
                showing1: !this.state.showing1,
                showAddButton1: !this.state.showAddButton1
            })
        }
        this.setState({
            showing2: !this.state.showing2,
            showAddButton2: !this.state.showAddButton2,
            type: 'expense'
        })
    }

    closeForm2 = () => {
        console.log('Clicked on cancel, should close form')
        this.setState({
            showing2: !this.state.showing2,
            showAddButton2: !this.state.showAddButton2
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
        }, this.getPercentage)
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
        if(this.state.description === "") {
            alert('You need to enter a description');
            return;
        }

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

        var showHideButton1 = {
            display: this.state.showAddButton1 ? "block" : "none"
        }
        var showHideButton2 = {
            display: this.state.showAddButton2 ? "block" : "none"
        }


        // if(this.state.allItems.length >= 0) {
        //     const allItems = this.state.allItems
        // }
        // const { username } = this.props
        const { income, expenses, budget, allItems, username } = this.state

        // console.log(username);
        return (
            <div className='dashboard'>

                <div className='dashboard--upper-section'>
                    <div className='logo' id='white-logo'>
                        <img src={ greenLogo } className='logo--image' alt='Beam White Logo'/>
                    </div>
                    <div className='username--section'>
                        <p id='user-name'>{`Welcome ${ username }.`}</p>
                    </div>

                    <div className='financial--summary'>
                        <div className='individual--amounts'>
                            <strong><h3>INCOME</h3></strong>
                            <p className='amounts'>{ `$${income}` }</p>
                        </div>
                        <div className='individual--amounts'>
                            <strong><h3>EXPENSES</h3></strong>
                            <p className='amounts'>{ `$${expenses}` }</p>
                        </div>
                        <div className='individual--amounts'>
                            <strong><h3>BALANCE</h3></strong>
                            <p className='amounts'>{ `$${budget}` }</p>
                        </div>
                        <div className='svg--chart'>
                            <ProgressCircle
                                strokeWidth="10"
                                squareSize="250"
                                percentage={this.state.percentage}
                            />
                        </div>
                    </div>
                </div>

                <div className='dashboard--log-section'>
                    <div className='income--list'>
                        <strong><h5>Money In</h5></strong>
                        <ol className='type-columns income'>
                            {allItems.filter((item) => (
                                item.type === 'income')).map((income) => (
                                <li key={income.id} className="entry--details">
                                    <p className="entry--description">{income.description}</p>
                                    <div className="amount-and-button">
                                        <a href="#" style={{...styles[this.state.hover]}}
                                            onMouseEnter={this.showDelete.bind(this)}
                                            onMouseLeave={this.hideDelete.bind(this)}>
                                            <p className="entry--amount" id="income--amount">{`$${income.amount}`}</p>
                                        </a>
                                        <button onClick={() => this.deleteEntry(income)} className="income--remove delete--button">X</button>
                                    </div>

                                </li>
                            ))}
                        </ol>
                        <form style={ showHideForm1 } onSubmit={this.handleSubmit.bind(this)} className="entry--form">
                            <input className="item--description" type="text" name="description" placeholder="Enter Description" value={this.state.description} onChange={this.handleChange.bind(this)} />
                            <input className="item--amount" type="number" name="amount" placeholder="amount" value={this.state.amount} onChange={this.handleChange.bind(this)}/>
                            <br />
                            <input type="submit" value="Save" className='button--save-entry'/>
                            <a href="#" onClick={this.closeForm1} className='button--cancel' name='cancel'>Cancel</a>
                        </form>

                        <button style={ showHideButton1 } onClick={this.toggleForm1} className='button--new-entry'>Add</button>
                    </div>
                    <div className='expense--list'>
                        <strong><h5>Money Out</h5></strong>
                        <ol className='type-columns expenses'>
                            {allItems.filter((item) => (
                                item.type === 'expense')).map((expense) => (
                                <li key={expense.id} className="entry--details">
                                    <p className="entry--description">{expense.description}</p>
                                    <div className="amount-and-button">
                                        <a href="#" style={{...styles[this.state.hover]}}
                                            onMouseEnter={this.showDelete.bind(this)}
                                            onMouseLeave={this.hideDelete.bind(this)}>
                                            <p className="entry--amount" id="expense--amount">{`$${expense.amount}`}</p>
                                        </a>
                                        <button onClick={() => this.deleteEntry(expense)} className="expense--remove delete--button">X</button>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <form style={ showHideForm2 } onSubmit={this.handleSubmit.bind(this)} className="entry--form">
                            <input className="item--description" type="text" name="description" placeholder="Enter Description" value={this.state.description} onChange={this.handleChange.bind(this)} />
                            <input className="item--amount" type="number" name="amount" placeholder="Amount" value={this.state.amount} onChange={this.handleChange.bind(this)}/>
                            <br />
                            <input type="submit" value="Save" className='button--save-entry'/>
                            <a href="#" onClick={this.closeForm2} className='button--cancel'>Cancel</a>
                        </form>
                        <button style={ showHideButton2 } onClick={this.toggleForm2} className='button--new-entry'>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}



Dashboard.propTypes = {
    username: PropTypes.string.isRequired
}
export default Dashboard;




