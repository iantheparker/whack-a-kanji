import React, { Component } from "react";
import translations from "../utils/translations";
import crossimg from "../assets/smash_red.svg";
import checkimg from "../assets/check.svg";

class MoleHole extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    const kanjiPath = `${window.location.origin}/image/canned/${
      this.props.real ? "real/real_" : "fake/fake_"
    }${("0000" + this.props.imgUrl.toString()).slice(-4)}.svg`;
    this.images = {
      cross: crossimg,
      check: checkimg,
      kanji: kanjiPath
    };
    this.state = {
      moleHasBeenWhacked: false,
      img: this.images.kanji
    };
  }

  handleClick(e) {
    this.setState({
      moleHasBeenWhacked: true
    });
    this.updateScore();
  }
  updateScore() {
    if (this.props.real) {
      this.setState({ img: this.images.cross });
      this.props.addToScore(0, true);
    } else {
      this.setState({ img: this.images.check });
      this.props.addToScore(1, true);
    }

    window.setTimeout(() => {
      this.setState({ img: this.images.kanji });
    }, 500);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.context[this.props.holeNumber] === translations.up &&
      this.props.context[this.props.holeNumber] === translations.down
    ) {
      if (!this.state.moleHasBeenWhacked) {
        this.updateScore();
      }
      this.setState({
        moleHasBeenWhacked: false
      });
    }
  }

  render() {
    return (
      <div
        className="game__hole"
        style={{ display: this.props.context.display }}
      >
        <div className="game__whack">
          <div
            className={"game__mole"}
            onClick={this.handleClick}
            style={{
              WebkitTransform: this.props.context[this.props.holeNumber],
              backgroundImage: `url(${this.state.img})`
            }}
          />
          <div className="game__mound" />
        </div>
      </div>
    );
  }
}

export default MoleHole;
