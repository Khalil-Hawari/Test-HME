import React, { Component } from "react";
import FillBlanks from "../../components/FillBlanks";
import { MathComponent } from "mathjax-react";
import myMath from "../../assets/myMath"; //example [{prime:2,power:3}, {prime:3, power:1}];

class PrimeFactorizationForFactorials extends Component {

    constructor() {
        super();
        this.answerForm = React.createRef(); // to be used for auto focus.
    }

    state = {
        correctAnswer: '',
        userAnswer: '',
    };

    // m!/p^n, where p is a prime;
    powerOfP = (m, p) => {
        let firstPower = Math.floor(m / p);
        let power = p<=m ? firstPower + this.powerOfP(firstPower, p):0;
        return power;
    }

    // m!/a^n, where a is 2-11 inclusive;
    findN = (m, a) => {
        let primeFactorizeOfA = myMath.primeFactorize(a);
        let potentialN = [];
        let currentPower;
        for (let term of primeFactorizeOfA) {
            currentPower = this.powerOfP(m, term.prime);
            potentialN.push(Math.floor(currentPower / term.power));
        }
        return Math.min(...potentialN);
    }

    generateQuestion = () => {

        // m!/a^n 

        const m = Math.floor(Math.random() * 81) + 20; // 20~100;
        const a = Math.floor(Math.random() * 10) + 2; // 2~11;
        const n = this.findN(m, a);
        const questionString = String.raw`\text{Given} ~n\in\mathbb{Z}, {${m}!\over${a}^n} \in \mathbb{Z}`; 

        this.setState({
            correctAnswer: n,
        })

        return (<MathComponent tex={questionString} />);
    }

    clearAnswerForm = () => {
        this.setState({
            userAnswer: ''
        });
        this.answerForm.current.focus();
    }

    checkAnswer = () => {
        let correctAnswer;
        if (parseInt(this.state.userAnswer) === this.state.correctAnswer) {
            return true;
        } else {
            correctAnswer = this.state.correctAnswer;
        }
        return (
            <MathComponent display={false}
                tex={String.raw`\text{Incorrect! Answer: }${ correctAnswer }`} />
        );
}

render() {

    let answerForm = (<>
        <MathComponent display={false}
            tex={String.raw`\max(n) =~`} />
        <input type="number" value={this.state.userAnswer} ref={this.answerForm} autoFocus
            onChange={e => this.setState({ userAnswer: e.target.value })}></input><br />
    </>);
    return (
        <FillBlanks
            checkAnswer={this.checkAnswer}
            generateQuestion={this.generateQuestion}
            clearAnswerForm={this.clearAnswerForm}
            answerForm={answerForm}
        />
    );
}
}

export default PrimeFactorizationForFactorials;
