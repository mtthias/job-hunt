import React from 'react';
import JobList from './jobList'
import { DragDropContext } from 'react-beautiful-dnd'

const jobManager = ({ statuses, onCardDelete, onCardEdit, onNewJob, jobs, onDragCard }) => {
  return (
    <DragDropContext onDragEnd={onDragCard}>
      <React.Fragment>
        <button onClick={onNewJob}>Add new Job
      </button>
        <div className="job-manager">
          {statuses.map((status, index) =>
            <JobList
              key={index}
              status={status}
              onCardEdit={onCardEdit}
              onCardDelete={onCardDelete}
              jobs={jobs.filter(job => job.status === status)}
            />
          )}

        </div>
      </React.Fragment>
    </DragDropContext>
  );
}

export default jobManager;