import React, { Component } from "react";

class MoleHole extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    let target = e.target.parentNode.firstChild;

    if (this.props.real) {
      target.classList.add("game__cross");
      target.classList.remove("hide");
      target.classList.add("show");
      this.props.addToScore(-1);
    } else {
      target.classList.add("game__check");
      target.classList.remove("hide");
      target.classList.add("show");
      this.props.addToScore(1);
    }
    window.setTimeout(function() {
      target.classList.remove("show");
      target.classList.remove("game__check");
      target.classList.remove("game__cross");
      target.classList.add("hide");
    }, 500);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.context[this.props.holeNumber] === "translate(0, 110%)") {
      console.log(this.props.holeNumber);
    }
  }
  render() {
    const kanjiPath = `${window.location.origin}/image/canned/${
      this.props.real ? "real" : "fake"
    }/${("0" + this.props.imgUrl.toString()).slice(-2)}.svg`;

    return (
      <div
        className="game__hole"
        style={{ display: this.props.context.display }}
      >
        <div className="game__whack">
          <div className="hide" alt="hit" />

          <div
            className={"game__mole"}
            onClick={this.handleClick}
            style={{
              WebkitTransform: this.props.context[this.props.holeNumber],
              backgroundImage: `url(${kanjiPath})`
            }}
          />
          <div className="game__mound" />
        </div>
      </div>
    );
  }
}

export default MoleHole;
