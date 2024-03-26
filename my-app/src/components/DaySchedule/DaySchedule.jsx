// DaySchedule.jsx
import React from 'react';
import styles from './DaySchedule.module.css';

const DaySchedule = ({ day, schedule, selectedGroup }) => {
  return (
    <div className={`${styles.dayContainer} ${styles.roundedBlock}`}>
      <h3>{day}</h3>
      <table className={styles.table}>
        <tbody>
          {schedule.map((scheduleItem, index) => (
            <tr key={index}>
              <td>{scheduleItem['Урок'] || 'No data'}</td>
              <td>{scheduleItem[selectedGroup] || 'No data'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DaySchedule;
