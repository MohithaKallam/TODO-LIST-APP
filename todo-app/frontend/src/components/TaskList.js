import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete }) {
  if (!tasks || tasks.length === 0) return <p>No tasks yet.</p>;
  return (
    <ul>
      {tasks.map(t => <TaskItem key={t._id} task={t} onDelete={onDelete} />)}
    </ul>
  );
}

export default TaskList;
