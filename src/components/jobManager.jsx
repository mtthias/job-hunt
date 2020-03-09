import React from 'react';
import JobList from './jobList'
import { DragDropContext } from 'react-beautiful-dnd'

const jobManager = ({ statuses, onCardDelete, onCardEdit, onNewJob, jobs, onDragCard, statusOrder}) => {
  return (
    <DragDropContext onDragEnd={onDragCard}>
      <React.Fragment>
        <button onClick={onNewJob}>Add new Job
      </button>
        <div className="job-manager">
          {statusOrder.map((status, index) =>{
            let filteredJobs = statuses[status].map(id => jobs[id])
            return <JobList
              key={index}
              status={status}
              onCardEdit={onCardEdit}
              onCardDelete={onCardDelete}
              jobs={filteredJobs}
            />
          }
          )}

        </div>
      </React.Fragment>
    </DragDropContext>
  );
}

export default jobManager;