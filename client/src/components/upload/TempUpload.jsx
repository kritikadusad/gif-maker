// @format
import React, {Component} from 'react';
import styles from './TempUpload.module.scss';

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
        <form onChange={this.handleSubmit}>
          <label className={styles.label}>
            Upload Image
            <input className={styles.input} type="file" ref={this.fileInput} />
          </label>
          <br />
        </form>
      </div>
    );
  }
}

export default TempUpload;
