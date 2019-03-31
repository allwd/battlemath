import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    state = {
        enemies: 5,
        answer: 0,
        challenge: "",
        type: "addition"
    }

    createChallenge = () => {
        let challenge = "";
        let answer = 0;
        let a = Math.floor(Math.random()*10-0.01)
        let b = Math.floor(Math.random()*10-0.01)

        switch (this.state.type) {
            case "addition":
                challenge = `${a} + ${b}`
                answer = a + b
                break
            case "subtraction":
                challenge = `${a} - ${b}`
                answer = a - b
                break
            case "multiplication":
                challenge = `${a} * ${b}`
                answer = a * b
                break
            case "division":
                challenge = `${a} / ${b}`
                answer = a / b
                break
        }

        this.setState({challenge: challenge, answer: answer})
    }

    killEnemy = () => {
        this.setState((prevState) => ({
            enemies: prevState.enemies - 1
        }))
    }

    addEnemy = () => {
        if (this.state.enemies < 6) {
            this.setState((prevState) => ({
                enemies: prevState.enemies + 1
            }))
        }
    }

    handleChange = (e) => {
        this.setState({
            input: e.currentTarget.value
        })
    }

    handleSubmit = () => {
        if (String(this.state.input) === String(this.state.answer)) {
            this.killEnemy()
        } else {
            this.addEnemy()
        }

        this.createChallenge()
    }

    componentDidMount() {
        this.createChallenge()
    }

    handleTypeChange = (e) => {
        this.setState({
            type: e.target.value
        }, this.createChallenge)
        console.log(e.target.value)
    }

    render() {
        return (
            <div className="App">
                <div className={"header"}>
                    <h2>Battle Math</h2><br/>
                    <select value={this.state.type} onChange={this.handleTypeChange}>
                        <option value={'addition'}>Addition</option>
                        <option value={'subtraction'}>Subtraction</option>
                        <option value={'multiplication'}>Multiplication</option>
                        <option value={'division'}>Division</option>
                    </select>
                </div>
                <div className={"body"}>
                    <div className={"player"}>
                        <div className={"cube"}/>
                    </div>
                    <div className={"enemies"}>
                        {new Array(this.state.enemies).fill(true).map(() => (
                            <div className={"cube"} />
                        ))}
                    </div>
                </div>
                <div className={"footer"}>
                    {this.state.enemies > 0 ? (
                        <div>
                            <div className={"typeContainer"}>
                                {this.state.challenge} = <input onChange={this.handleChange} />
                            </div>
                            <div className={"submit"}>
                                <button onClick={this.handleSubmit}>SUBMIT</button>
                            </div>
                        </div>
                    ) : (
                        <h1>YOU WON!</h1>
                    )}
                </div>
            </div>
        );
    }
}

export default App;
