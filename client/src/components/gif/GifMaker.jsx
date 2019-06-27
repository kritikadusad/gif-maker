// @format
import React, {Component} from 'react';
import TempUpload from 'components/upload/TempUpload.jsx';
import GifPreview from './GifPreview.jsx';
import GifCreate from './GifCreate.jsx';
import styles from './GifMaker.module.scss';

class GifMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
    };
  }

  handleFinish = url => {
    this.setState({
      urls: [...this.state.urls, url],
    });
  };

  render() {
    const {urls} = this.state;

    return (
      <div className={styles.container}>
        <h2>GIF-Maker</h2>
        <div>
          <h4>
            To make a GIF, upload images (one by one) and check out a preview of
            the GIF. If you like it, click Create GIF to convert those images
            into a GIF montage! NOTE: Multiple image upload feature coming up
            soon...
          </h4>{' '}
        </div>
        <TempUpload handleFinish={this.handleFinish} />
        {urls.length ? (
          <>
            <GifPreview url={urls} />
            <GifCreate url={urls} />
          </>
        ) : null}
      </div>
    );
  }
}

export default GifMaker;
