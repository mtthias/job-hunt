import React, { Component } from 'react';

class jobForm extends Component {
  constructor(props) {
    super(props);
    if (props.form.job === null) {
      this.state = {
        title: '',
        status: 'applied'
      }
    } else {
      this.state = { ...props.form.job }
      this.state.status = props.form.status
    }
  }
  render() {
    return (<form onSubmit={(e) => {
      e.preventDefault()
      this.props.onSubmit(this.state)
    }}>
      <label htmlFor="title">Title</label>
      <input type="text" value={this.state.title} name="title" onChange={(e) => this.setState({ title: e.target.value })} required></input>
      <label htmlFor="status">Status</label>
      <select value={this.state.status} onChange={(e) => this.setState({ status: e.target.value })} name="status">
        <option value="applied">applied</option>
        <option value="invited">invited</option>
        <option value="interviewed">interviewed</option>
        <option value="offered">offered</option>
        <option value="rejected">rejected</option>
      </select>
      <lable htmlFor="ad">Link to job ad</lable>
      <input type="text" value={this.state.ad} onChange={(e) => this.setState({ ad: e.target.value })} required name="ad" id="ad"/>
      <input type="submit" value="Add" />
      <button onClick={e => {
        e.preventDefault()
        this.props.onCancel()
      }}>
        Cancel
        </button>
    </form>);
  }
}

export default jobForm;