// @format
import React, {Component} from 'react';
import shortid from 'shortid';
import styles from './GifPreview.module.scss';

class GifPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.url.length !== state.url.length) {
      return {
        url: props.url,
      };
    }
    return null;
  }
  //This function shows images at intervals to mimic a Gif:
  showImage() {
    let current = 0;
    let prev = 0;
    let images = document.getElementsByClassName(styles.image);
    if (typeof images !== 'undefined') {
      let Gif = setInterval(function() {
        images[prev].style.display = 'none';
        images[current].style.display = 'block';
        prev = current;
        if (current + 1 < images.length) {
          current++;
        } else {
          current = 0;
        }
      }, 500); //The interval matches the interval for making  the gif in server.
      //This stops the Gif interval function for all images except the first one.
      if (images.length > current) {
        clearInterval(Gif);
      }
    }
  }
  render() {
    let {url} = this.state;
    let gifDiv = <div />;

    gifDiv = (
      <div className={styles.gif}>
        {url.map(image => (
          <img
            className={styles.image}
            src={image}
            key={shortid.generate()}
            alt="Gif Preview"
          />
        ))}
      </div>
    );

    return (
      <div className={styles.container}>
        <div className={styles.header}>Preview of final gif:</div>
        {gifDiv}
        {this.showImage()}
        <div className={styles.note}>
          You can add more images by clicking Choose Files button.
          <br />
          Once you like the GIF preview, click on Make GIF button.
          <br />
          If you want to restart from scratch, click Refresh button in your
          browser.
        </div>
      </div>
    );
  }
}

export default GifPreview;
