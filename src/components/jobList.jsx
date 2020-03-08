import React, { Component } from 'react';
import JobCard from './jobCard';
import { Droppable } from 'react-beautiful-dnd'
class jobList extends Component {

  render() {
    const jobs = this.props.jobs.sort((a,b) => {
      return a.weight - b.weight
    })

    return (
      <section className="job-list">
        <h2>{this.props.status}</h2>
        <Droppable droppableId={this.props.status}>
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {jobs.map((job, index) =>
                <JobCard 
                  index={index}
                  onEdit={this.props.onCardEdit} 
                  onDelete={this.props.onCardDelete} 
                  key={job.id} job={job} />
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </section>
    );
  }
}

export default jobList;