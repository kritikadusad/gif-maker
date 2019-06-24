// @format
import React, {Component} from 'react';
import styles from './GifCreate.module.scss';

class GifCreateButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gif: undefined,
      url: this.props.url,
      loading: false,
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
  createGif = () => {
    const {url} = this.props;
    const body = {
      url,
    };

    this.setState({
      loading: true,
      gif: undefined,
    });

    fetch('/', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            gif: result.gif,
            loading: false,
          });
        },
        error => {
          console.log('An error occurred:', error);
          this.setState({
            loading: false,
          });
        },
      );
  };

  renderFinalGif() {
    const {gif} = this.state;

    if (!gif) return null;
    else
      return (
        <>
          <div className={styles.header}>Final GIF:</div>
          <img src={gif} alt="GIF Final" className={styles.gif} />
        </>
      );
  }

  render() {
    const {loading} = this.state;
    return (
      <div className={styles.container}>
        {loading ? (
          'Loading ...'
        ) : (
          <input type="button" value="Make a GIF" onClick={this.createGif} />
        )}
        {this.renderFinalGif()}
      </div>
    );
  }
}

export default GifCreateButton;
