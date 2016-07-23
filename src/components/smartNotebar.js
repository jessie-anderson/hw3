import React, { Component } from 'react';

class SmartNotebar extends Component {
  constructor(props) {
    super(props);
    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      input: '',
    };
  }

  onInput(event) {
    this.setState({
      input: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    // if user has put nothing into notebar to make new note, do nothing
    this.props.onNotebarSubmit(event, this.state.input);
    this.setState({
      input: '',
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} id="note-bar">
        <input
          type="text"
          value={this.state.input}
          onChange={this.onInput}
          placeholder="new note title"
        />
        <input type="submit" value="create" />
      </form>
    );
  }
}

export default SmartNotebar;
