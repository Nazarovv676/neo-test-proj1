import type { Camper } from '@/shared/types';
import React from 'react';
import styles from './CamperDetailsTable.module.css';

interface CamperDetailsTableProps {
  camper: Camper;
}

export const CamperDetailsTable: React.FC<CamperDetailsTableProps> = ({
  camper,
}) => {
  const details = [
    { label: 'Form', value: camper.details.form },
    { label: 'Length', value: camper.details.length },
    { label: 'Width', value: camper.details.width },
    { label: 'Height', value: camper.details.height },
    { label: 'Tank', value: camper.details.tank },
    { label: 'Consumption', value: camper.details.consumption },
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Vehicle details</h3>
      <div className={styles.table}>
        {details.map((detail) => (
          <div key={detail.label} className={styles.row}>
            <div className={styles.label}>{detail.label}</div>
            <div className={styles.value}>{detail.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
