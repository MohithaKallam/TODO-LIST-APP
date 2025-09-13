import React from 'react';

function TaskItem({ task, onDelete }) {
  return (
    <li>
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</span>
      <button onClick={() => onDelete(task._id)} style={{ marginLeft: 8 }}>❌</button>
    </li>
  );
}

export default TaskItem;
