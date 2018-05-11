import React, { Component } from "react";
import translations from "../utils/translations";
import crossimg from "../assets/smash_red.svg";
import checkimg from "../assets/check.svg";

class MoleHole extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    const real = this.props.real();
    const imgUrl = this.props.imgUrl();
    this.images = {
      cross: crossimg,
      check: checkimg,
      kanji: this.kanjiPath(real, imgUrl)
    };
    this.state = {
      moleHasBeenWhacked: false,
      show: translations.down,
      img: this.images.kanji,
      block: false,
      real: real,
      imgUrl: imgUrl
    };
  }
  kanjiPath(real, imgUrl) {
    return `https://s3.amazonaws.com/kanji-ai/${
      real ? "real/real_" : "fake/fake_"
    }${("0000" + imgUrl.toString()).slice(-4)}.svg`;
  }
  kanjiPathFetchNew() {
    this.setState({
      real: this.props.real(),
      imgUrl: this.props.imgUrl()
    });
    const kanjiPath = this.kanjiPath(this.state.real, this.state.imgUrl);
    // console.log(kanjiPath);

    return kanjiPath;
  }

  handleClick(e) {
    if (this.state.block) {
      return;
    }
    this.setState({
      moleHasBeenWhacked: true
    });
    this.updateScore(true);
  }
  updateScore(tapped) {
    if (this.state.real) {
      this.setState({ img: tapped ? this.images.cross : this.images.check });
      this.props.addToScore(tapped ? 0 : 1);
    } else {
      this.setState({ img: tapped ? this.images.check : this.images.cross });
      this.props.addToScore(tapped ? 1 : 0);
    }

    window.setTimeout(() => {
      this.setState({ show: translations.down });
      window.setTimeout(() => {
        this.setState({ img: this.kanjiPathFetchNew(), block: false });
      }, 500);
    }, 500);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.context[this.props.holeNumber] === translations.up &&
      this.props.context[this.props.holeNumber] === translations.down
    ) {
      this.setState({ block: true });
      if (!this.state.moleHasBeenWhacked) {
        this.updateScore(false);
      }
      this.setState({
        moleHasBeenWhacked: false
      });
    } else if (
      prevProps.context[this.props.holeNumber] === translations.down &&
      this.props.context[this.props.holeNumber] === translations.up
    ) {
      this.setState({ show: translations.up });
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
              WebkitTransform: this.state.show,
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
