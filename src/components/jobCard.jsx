import React from 'react';
import { Draggable } from 'react-beautiful-dnd'

const jobCard = ({ job, onDelete, onEdit, index }) => {
  return (
    <Draggable
      draggableId={job.id.toString()}
      index={index}
    >
      {provided => (
        <article 
          className="job-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3>{job.title}</h3>
          <button onClick={() => onEdit(job)}>edit</button>
          <button onClick={() => onDelete(job.id)}>delete</button>
        </article>
      )}
    </Draggable>
  );
}

export default jobCard;