import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';

import styles from './PlusButton.module.css';

type PlusButtonProps = {
  onClick?: () => void;
  className: string;
};

function PlusButton({ onClick, className }: PlusButtonProps) {
  return (
    <button className={`${styles['input-submit']} ${className}`} type="submit" {...onClick}>
      <FaPlusCircle className={styles['btn-plus']} />
    </button>
  );
}

export default PlusButton;
