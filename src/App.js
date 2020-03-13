import React, { Component } from 'react';
import axios from 'axios';
import JobManager from './components/jobManager'
import JobForm from './components/jobForm'
import './App.css'

class App extends Component {
  state = {
    appState: 'list',
    form: {
      job: null,
      status: 'accepted'
    },
    isLoaded: false
  }

  componentDidMount() {
    axios.get("http://jha.mattcrn.at/state")
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            ...result.data
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.updateState({
            isLoaded: true,
            error
          })
        }
      )
  }

  updateState = (state) => {
    this.setState(state)
    const data = (({ jobs, statusOrder, statuses }) => ({ jobs, statusOrder, statuses }))(this.state)
    axios.post('http://jha.mattcrn.at/state', data)
      .catch(() => {
        this.setState({ error: { message: 'We are not able to connect to the Backend Service!' } })
      })
  }

  handleJobCardDelete = (id, status) => {
    const jobs = { ...this.state.jobs }
    delete jobs[id]
    // get the statuses
    const statuses = { ...this.state.statuses }
    // get the remaining jobs in this jobs status
    const remainingJobs = statuses[status].filter(s => s !== id)
    // override the current status
    statuses[status] = remainingJobs
    this.updateState({ jobs, statuses })
  }

  handleJobEdit = (job, status) => {
    this.updateState({ form: { job, status }, appState: 'form' })
  }

  handleFormSubmit = (job) => {
    const jobs = { ...this.state.jobs }
    const statuses = { ...this.state.statuses }
    if (job.id === undefined) {
      const jobId = 'job-' + (Object.keys(jobs).length + 1)
      jobs[jobId] = { ...job, id: jobId }
      statuses[job.status].push(jobId)

    } else {
      jobs[job.id] = job
      this.moveJob(job.id, null, job.status, 0)
    }
    this.updateState({ jobs, appState: 'list' })
    this.resetForm()
  }

  resetForm() {
    this.updateState({ form: { job: null, status: null } })
  }

  handleFormCancel = () => {
    this.updateState({ appState: 'list' })
    this.resetForm()
  }

  handleDrag = result => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }
    const statuses = this.moveJob(draggableId, source.droppableId, destination.droppableId, destination.index)
    this.updateState({ statuses })
  }

  /**
   * Moves a job from a position (column, index) to another position
   */
  moveJob = (id, fromState = null, toState, toIndex) => {
    // to change the order we must recreate the statuses object with different data
    // first find the currentIndex of the Element
    const statuses = { ...this.state.statuses }
    // get the old state if not supplied
    if (fromState === null) {
      for (const status in statuses) {
        if (statuses[status].indexOf(id) !== -1) {
          fromState = status
        }
      }
    }
    // first get the current statuses
    const fromIndex = statuses[fromState].findIndex(s => s === id)
    // remove the current job
    const currentJob = statuses[fromState].splice(fromIndex, 1)
    // add it to its new position
    statuses[toState].splice(toIndex, 0, ...currentJob)
    return statuses
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          {this.state.appState === 'list' &&
            <JobManager
              statuses={this.state.statuses}
              statusOrder={this.state.statusOrder}
              onCardEdit={this.handleJobEdit}
              onCardDelete={this.handleJobCardDelete}
              onNewJob={() => this.updateState({ appState: 'form' })}
              onDragCard={this.handleDrag}
              jobs={this.state.jobs} />
          }
          {this.state.appState === 'form' &&
            <JobForm
              onSubmit={this.handleFormSubmit}
              onCancel={this.handleFormCancel}
              form={this.state.form} />
          }
        </div>
      )
    }
  }
}

export default App;
