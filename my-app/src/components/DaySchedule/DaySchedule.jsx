// DaySchedule.jsx
import React from 'react';
import styles from './DaySchedule.module.css';

const DaySchedule = ({ day, schedule, selectedGroup }) => {
  return (
    <div className={styles.dayContainer}>
      <h3 className={styles.dayHeading}>{day}</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Lesson</th>
            <th>{selectedGroup}</th>
          </tr>
        </thead>
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
}

export default DaySchedule;
