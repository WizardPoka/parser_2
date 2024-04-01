// WeekSchedule.jsx
import React from 'react';
import DaySchedule from '../DaySchedule/DaySchedule';
import styles from './WeekSchedule.module.css';

function WeekSchedule({ weekNumber, schedule, selectedGroup }) {
  return (
    <div className={styles.weekContainer}>
      <h3>Неделя {weekNumber}</h3>
      {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map((day) => (
        <DaySchedule key={day} day={day} schedule={schedule.filter(item => item['День'] === day)} selectedGroup={selectedGroup} />
      ))}
    </div>
  );
}

export default WeekSchedule;
