import React, { useState } from 'react';
import './index.css';
import TrashcanIcon from '../../assets/trashcan-icon.svg';
import CheckmarkIcon from '../../assets/checkmark-icon.svg';
import QuestionmarkIcon from '../../assets/questionmark-icon.svg';

const DeleteButton: React.FC<{ onDelete: () => void }> = ({ onDelete }) => {
  const [state, setState] = useState<'default' | 'confirm' | 'done'>('default');

  const handleClick = () => {
    if (state === 'confirm') {
      setState('done');
      onDelete();
    } else {
      setState('confirm');
    }
  };

  const handleMouseOut = () => {
    if (state === 'confirm' || state === 'done') {
      setTimeout(() => {
        setState('default');
      }, 3000);
    }
  };

  return (
    <button
      className={`delete-button ${state}`}
      onClick={handleClick}
      onMouseOut={handleMouseOut}
    >
      <div className="icon">
        {state === 'done' ? (
          <img className="checkmark" src={CheckmarkIcon} alt="Checkmark" />
        ) : state === 'confirm' ? (
          <img className="questionmark" src={QuestionmarkIcon} alt="Questionmark" />
        ) : (
          <img className="trashcan" src={TrashcanIcon} alt="Trashcan" />
        )}
      </div>
      <div className="text">
        <span>
          {state === 'done' ? 'Deleted' : state === 'confirm' ? 'Are you sure?' : 'Delete'}
        </span>
      </div>
    </button>
  );
};

export default DeleteButton;
