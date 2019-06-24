// @format
import React, {Component} from 'react';
import styles from './Upload.module.scss';

class TempUpload extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      images: null,
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    if (this.fileInput.current.files[0]) {
      const reader = new FileReader();
      let file = this.fileInput.current.files[0];
      reader.readAsDataURL(file);
      reader.onload = e => {
        let url = reader.result;
        this.props.handleFinish(url);
      };
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <form onSubmit={this.handleSubmit}>
          <label>
            Upload Image:
            <input type="file" ref={this.fileInput} />
          </label>
          <br />
          <button type="submit"> Upload! </button>
        </form>
      </div>
    );
  }
}

export default TempUpload;
