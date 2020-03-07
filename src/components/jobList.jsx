import React, { Component } from 'react';
import JobCard from './jobCard';
import { Droppable } from 'react-beautiful-dnd'
class jobList extends Component {

  render() {
    return (
      <section className="job-list">
        <h2>{this.props.status}</h2>
        <Droppable>
          {this.props.jobs.map(job =>
            <JobCard onEdit={this.props.onCardEdit} onDelete={this.props.onCardDelete} key={job.id} job={job} />
          )}
        </Droppable>
      </section>
    );
  }
}

export default jobList;