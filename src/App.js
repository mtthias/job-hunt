import React, { Component } from 'react';
import JobManager from './components/jobManager'
import JobForm from './components/jobForm'
import './App.css'

class App extends Component {
  state = {
    appState: 'list',
    jobs: {
      'job-1': {
        id: 'job-1',
        title: 'durchblicker.at',
        status: 'invited',
      },
      'job-2': {
        id: 'job-2',
        title: 'datenwerk',
        status: 'invited',
      },
      'job-3': {
        id: 'job-3',
        title: 'sportradar',
        status: 'interviewed',
      }
    },
    form: {
      job: null,
      status: 'accepted'
    },
    statuses: {
      'applied': ['job-1', 'job-2', 'job-3'],
      'invited': [],
      'interviewed': [],
      'offered': [],
      'rejected': []
    },
    statusOrder: [
      'applied',
      'invited',
      'interviewed',
      'offered',
      'rejected'
    ]
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
    this.setState({ jobs, statuses })
  }

  handleJobEdit = (job, status) => {
    this.setState({ form: { job, status }, appState: 'form' })
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
    this.setState({ jobs, appState: 'list' })
    this.resetForm()
  }

  resetForm() {
    this.setState({ form: { job: null, status: null } })
  }

  handleFormCancel = () => {
    this.setState({ appState: 'list' })
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
    this.setState({ statuses })
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
        if(statuses[status].indexOf(id) !== -1) {
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
    return (
      <div className="App">
        {this.state.appState === 'list' &&
          <JobManager
            statuses={this.state.statuses}
            statusOrder={this.state.statusOrder}
            onCardEdit={this.handleJobEdit}
            onCardDelete={this.handleJobCardDelete}
            onNewJob={() => this.setState({ appState: 'form' })}
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
    );
  }
}

export default App;
