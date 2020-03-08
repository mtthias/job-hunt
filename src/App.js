import React, { Component } from 'react';
import JobManager from './components/jobManager'
import JobForm from './components/jobForm'
import './App.css'

class App extends Component {
  state = {
    appState: 'list',
    jobs: [
      {
        id: 1,
        title: 'durchblicker.at',
        status: 'invited',
        weight: 2,
      },
      {
        id: 3,
        title: 'datenwerk',
        status: 'invited',
        weight: 1,
      },
      {
        id: 2,
        title: 'sportradar',
        status: 'interviewed',
        weight: 1,
      }
    ],
    form: {
      job: null
    },
    statuses: [
      'applied',
      'invited',
      'interviewed',
      'offered',
      'rejected'
    ]
  }

  handleJobCardDelete = (id) => {
    const jobs = this.state.jobs.filter(job => job.id !== id)
    this.setState({ jobs })
  }

  handleJobEdit = (job) => {
    this.setState({form: {job}, appState: 'form'})
  }

  handleFormSubmit = (job) => {
    const jobs = this.state.jobs
    if(job.id === undefined) {
      jobs.push({...job, id: jobs.length + 1})
    } else {
      const index = jobs.findIndex(j => j.id === job.id)
      jobs[index] = job
    }
    this.setState({jobs, appState: 'list'})
    this.resetForm()
  }

  resetForm() {
    this.setState({form: {job: null}})
  }

  handleFormCancel = () => {
    this.setState({appState: 'list'})
    this.resetForm()
  }

  handleDrag = result => {
    const {destination, source, draggableId} = result

    if(!destination) {
      return
    }

    if(destination.droppableId == source.droppableId && destination.index == source.index) {
      return
    }

    console.log(result)
    let jobs = [...this.state.jobs]
    // get the current job
    const currentJob = jobs.splice(jobs.findIndex(j => j.id === parseInt(draggableId)),1)
    // get the jobs from the target status
    console.log(jobs)
    // this.state.filter(job => job.status === destination.droppableId)

    
  }

  render() {
    return (
      <div className="App">
        {this.state.appState === 'list' &&
          <JobManager
            statuses={this.state.statuses} 
            onCardEdit={this.handleJobEdit}
            onCardDelete={this.handleJobCardDelete} 
            onNewJob={() => this.setState({appState: 'form'})}
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
