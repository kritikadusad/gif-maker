// @format
import React, {Component} from 'react';
import Upload from 'components/upload/Upload.jsx';
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
        <h2>Create a GIF</h2>
        <div>
          This tool allows a user to upload images, see a preview of their GIF,
          and convert those images into a GIF montage!
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
