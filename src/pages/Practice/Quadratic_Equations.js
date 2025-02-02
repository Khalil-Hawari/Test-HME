import React, { Component } from "react";
import FillBlanks from "../../components/FillBlanks";
import { MathComponent } from "mathjax-react";

class Quadratic_Equations extends Component {

    constructor() {
        super();
        this.answerForm = React.createRef(); // to be used for auto focus.
    }

    state = {
        x1: 0,
        x2: 0,
        ansX1: '',
        ansX2: '',
    };

    generateQuestion = () => {
        const x1 = Math.floor(Math.random() * 25) - 12;
        const x2 = Math.floor(Math.random() * 25) - 12;
        this.setState({ x1: x1 });
        this.setState({ x2: x2 });

        const a = 1;
        const b = -a * (x1 + x2);
        const c = a * x1 * x2;

        const firstTerm = `x^2`;
        let secondTerm = '';
        let thirdTerm = '';
        let question = '';

        if (b > 1) {
            secondTerm = `+${b}x`
        } else if (b === 1) {
            secondTerm = `+x`
        } else if (b === 0) {
            secondTerm = ``
        } else if (b === -1) {
            secondTerm = `-x`
        } else {
            secondTerm = `${b}x`
        }

        if (c > 0) {
            thirdTerm = `+${c}`
        } else if (c === 0) {
            thirdTerm = ``
        } else {
            thirdTerm = `${c}`
        }

        question = firstTerm.concat(secondTerm, thirdTerm, `=0`);

        return (<MathComponent tex={question} display={false} />);
    }

    clearAnswerForm = () => {
        this.setState({ ansX1: '', ansX2: '' });
        this.answerForm.current.focus();
    }

    checkAnswer = () => {
        const x1 = this.state.x1;
        const x2 = this.state.x2;
        const ansX1 = parseInt(this.state.ansX1);
        const ansX2 = parseInt(this.state.ansX2);
        if ((ansX1 === x1 && ansX2 === x2) || (ansX1 === x2 && ansX2 === x1)) {
            return true;
        } else {
            return `Incorrect! The correct answers are ${this.state.x1} and ${this.state.x2}.`;
        }
    }

    render() {
        return (
            <FillBlanks
                checkAnswer={this.checkAnswer}
                generateQuestion={this.generateQuestion}

                clearAnswerForm={this.clearAnswerForm}
                answerForm={(
                    <>
                        <MathComponent tex="x_1=" display={false} /> <input type="number" value={this.state.ansX1}
                            ref={this.answerForm} autoFocus
                            onChange={e => this.setState({ ansX1: e.target.value })}></input><br />
                        <MathComponent tex="x_2=" display={false} /> <input type="number" value={this.state.ansX2}
                            onChange={e => this.setState({ ansX2: e.target.value })}></input><br />
                    </>
                )}
            />
        );
    }
}

export default Quadratic_Equations;
