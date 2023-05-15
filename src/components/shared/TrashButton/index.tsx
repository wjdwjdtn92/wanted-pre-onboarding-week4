import React from 'react';
import { FaTrash } from 'react-icons/fa';

import styles from './TrashButton.module.css';

type TrashButtonProps = {
  onClick: () => void;
};

function TrashButton({ onClick }: TrashButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      <FaTrash className={styles['btn-trash']} />
    </button>
  );
}

export default TrashButton;
