// Testapp.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Testapp.module.css';
import WeekSchedule from './WeekSchedule/WeekSchedule'; // Импорт компонента WeekSchedule

function Testapp() {
  // Состояния компонента
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupSchedule, setGroupSchedule] = useState([]);

  // Загрузка списка групп при монтировании компонента
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_groups');
        setGroups(response.data);
        // Выбор первой группы (если она есть) и загрузка ее расписания
        if (response.data.length > 0) {
          setSelectedGroup(response.data[0]);
          fetchGroupSchedule(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  // Загрузка расписания для выбранной группы
  const fetchGroupSchedule = async (groupName) => {
    try {
      const response = await axios.post('http://localhost:5000/get_schedule', { group_name: groupName });
      console.log('Response data:', response.data);
  
      // Обработка данных расписания
      const processedData = processScheduleData(response.data);
  
      setGroupSchedule(processedData || []); // Установка обработанных данных в состояние
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };
  
  // Обработка данных расписания
  const processScheduleData = (data) => {
    let currentDay = null;
  
    return data.map(item => {
      if (item.День) {
        currentDay = item.День;
      } else if (currentDay) {
        item.День = currentDay;
      }
      return item;
    });
  };

  // Функция для разделения расписания по неделям
const separateByWeeks = (schedule) => {
  const weeks = [];
  let currentWeek = [];

  schedule.forEach((item, index) => {
    // Если текущий день - понедельник и это не первая пара в расписании
    if (item['День'] === 'Пн' && index > 0 && schedule[index - 1]['День'] !== 'Пн') {
      // Начинается новая неделя, добавляем предыдущую
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(item);
  });

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
};


  // Разделение расписания на недели
  const weeks = separateByWeeks(groupSchedule);

  return (
    <div className={styles.container}>
      <div className={styles.groupList}>
        <h1>Группы:</h1>
        <ul>
          {/* Отображение списка групп */}
          {groups.map((group, index) => (
            <li key={index} onClick={() => { setSelectedGroup(group); fetchGroupSchedule(group); }} className={styles.listItem}>
              {group}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.scheduleTable}>
        {/* Отображение расписания для выбранной группы */}
        {selectedGroup && (
          <div>
            <h2>Расписание для {selectedGroup}:</h2>
            <div>
              {/* Отображение каждой недели из списка */}
              {weeks.map((week, index) => (
                <WeekSchedule key={index} weekNumber={index + 1} schedule={week} selectedGroup={selectedGroup} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Testapp;
