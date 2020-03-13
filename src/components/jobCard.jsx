import React from 'react';
import { Draggable } from 'react-beautiful-dnd'

const jobCard = ({ job, onDelete, onEdit, index, status }) => {
  return (
    <Draggable
      draggableId={job.id}
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
          <a href={job.ad}>ad</a>
          <button onClick={() => onEdit(job, status)}>edit</button>
          <button onClick={() => onDelete(job.id, status)}>delete</button>
        </article>
      )}
    </Draggable>
  );
}

export default jobCard;