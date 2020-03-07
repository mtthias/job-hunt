import React from 'react';

const jobCard = ({ job, onDelete, onEdit }) => {
  return (
    <article className="job-card">
      <h3>{ job.title }</h3>
      <button onClick={() => onEdit(job)}>edit</button>
      <button onClick={() => onDelete(job.id)}>delete</button>
    </article>
  );
}

export default jobCard;