import React, { Component } from "react";
import "../App.css";
import anime from "animejs";
import Score from "./Score.js";
import GameOver from "./GameOver.js";
import StartButton from "./StartButton.js";
import MoleHole from "./MoleHole.js";

const moleTotal = 9;

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      1: "translate(0, 110%)",
      2: "translate(0, 110%)",
      3: "translate(0, 110%)",
      4: "translate(0, 110%)",
      5: "translate(0, 110%)",
      6: "translate(0, 110%)",
      7: "translate(0, 110%)",
      8: "translate(0, 110%)",
      9: "translate(0, 110%)",
      shake: "translate(0, 0)",
      gameHasStarted: false,
      moleHasBeenWhacked: false,
      score: 0,
      lastMole: "",
      display: "none",
      buttonMessage: "Start Game",
      gameOver: "none",
      buttonDisplay: "inline-block",
      titleMargin: "15px"
    };
  }

  animate(el) {
    anime({
      targets: el,
      direction: "alternate",
      loop: true,
      easing: "easeInQuad",
      duration: 8000,
      scale: function(el, i, l) {
        return l - i + 0.08;
      }
    });
  }

  timeOut(num) {
    if (this.state.gameHasStarted) {
      return;
    }
    this.setState({
      buttonDisplay: "none",
      display: "block",
      gameOver: "none",
      titleMargin: 0
    });
    this.shakeScreen();
    window.setTimeout(() => {
      this.startGame();
    }, num);
  }

  startGame() {
    if (this.state.gameHasStarted) {
      return;
    }

    this.setState({
      gameHasStarted: true,
      score: 0
    });

    let x = 0;
    const intervalID = setInterval(() => {
      this.displayMoles();
      if (++x === moleTotal) {
        window.clearInterval(intervalID);
        this.clearMoles();
        this.setState({ gameHasStarted: false });
        window.setTimeout(() => {
          this.setState({
            display: "none",
            gameOver: "block",
            buttonMessage: "Play again",
            buttonDisplay: "inline-block",
            titleMargin: "15px"
          });
          this.animate(this.refs.gameOver);
        }, 850);
      }
    }, moleTotal * 200);
  }

  clearMoles() {
    for (let value in this.state) {
      if (!isNaN(value)) {
        this.setState({
          [value]: "translate(0, 110%)"
        });
      }
    }
  }

  displayMoles() {
    let activeMole = Math.ceil(Math.random() * moleTotal);
    if (this.state.lastMole[0] === activeMole) {
      this.displayMoles();
      return;
    }
    this.clearMoles();
    this.setState({
      [activeMole]: "translate(0, 15%)",
      lastMole: [activeMole]
    });
  }

  addToScore(num) {
    this.setState((prevState, props) => ({
      score: prevState.score + num
    }));
  }

  shakeScreen() {
    let posOrNeg = "+";
    let i = 0;
    let shake = () => {
      if (i === 15) {
        this.setState({ shake: "translate(0, 0)" });
        return;
      }
      window.setTimeout(() => {
        posOrNeg = posOrNeg === "-" ? "+" : "-";
        this.setState({ shake: `translate(${posOrNeg}${i}px, 0)` });
        shake();
      }, 80);
      i++;
    };
    shake();
  }

  createMoleHoles() {
    var holes = [];
    for (let i = 1; i <= moleTotal; i++) {
      holes.push(
        <MoleHole
          key={i}
          context={this.state}
          holeNumber={i}
          addToScore={this.addToScore.bind(this)}
          imgUrl={Math.ceil(Math.random() * 20)}
          real={Boolean(Math.round(Math.random() * 1))}
        />
      );
    }
    return <div className="board">{holes}</div>;
  }

  render() {
    return (
      <div className="main-container">
        <div className="game" style={{ WebkitTransform: this.state["shake"] }}>
          <h1
            className="game__title"
            style={{ margin: this.state.titleMargin }}
          >
            WHACK-A-FAKE-KANJI
          </h1>
          <GameOver context={this} moles={moleTotal} />
          <div ref={"gameOver"} className="game__button-container">
            <StartButton
              context={this.state}
              onClick={this.timeOut.bind(this)}
            />
          </div>
          {this.createMoleHoles()}
          <Score context={this.state} />
          <div style={{ margin: 20 }}>
            <p>
              Some of these kanji characters are real. Some of them are faked by
              a robot. Only whack the fake ones. <br /> <br />
              Special thanks to{" "}
              <a href="http://blog.otoro.net/2015/12/28/recurrent-net-dreams-up-fake-chinese-characters-in-vector-format-with-tensorflow/">
                David Ha{" "}
              </a>{" "}
              for his kanji-dreaming AI and to{" "}
              <a href="https://github.com/RhodesPeter/whack-a-mole-react">
                {" "}
                Peter Rhodes
              </a>{" "}
              for his fun whack-a-mole game.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
