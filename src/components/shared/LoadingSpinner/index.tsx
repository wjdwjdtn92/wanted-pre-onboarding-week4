import React from 'react';
import { FaSpinner } from 'react-icons/fa';

import styles from './LoadingSpinner.module.css';

function LoadingSpinner() {
  return <FaSpinner className={styles.spinner} />;
}

export default LoadingSpinner;
