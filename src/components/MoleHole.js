import React, { Component } from "react";

class MoleHole extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    let target = e.target;
    console.log(target.parentNode.firstChild);

    if (this.props.real) {
      target.parentNode.firstChild.classList.add("game__cross");
      //target.classList.add("no-background");
      target.parentNode.firstChild.classList.remove("hide");
      target.parentNode.firstChild.classList.add("show");
    } else {
      target.parentNode.firstChild.classList.add("game__wavy");
      //target.classList.add("no-background");
      target.parentNode.firstChild.classList.remove("hide");
      target.parentNode.firstChild.classList.add("show");
    }
    window.setTimeout(function() {
      target.parentNode.firstChild.classList.remove("show");
      target.parentNode.firstChild.classList.remove("game__wavy");
      target.parentNode.firstChild.classList.remove("game__cross");
      //target.parentNode.firstChild.classList.remove("no-background");
      target.parentNode.firstChild.classList.add("hide");
    }, 500);
  }
  render() {
    const kanjiPath = `${window.location.origin}/image/canned/${
      this.props.real ? "real" : "fake"
    }/${("0" + this.props.imgUrl.toString()).slice(-2)}.svg`;
    console.log(kanjiPath);
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
