// Testapp.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Testapp.module.css';
import DaySchedule from './DaySchedule/DaySchedule'; // Импорт компонента DaySchedule

function Testapp() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupSchedule, setGroupSchedule] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_groups');
        setGroups(response.data);
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

  const fetchGroupSchedule = async (groupName) => {
    try {
      const response = await axios.post('http://localhost:5000/get_schedule', { group_name: groupName });
      console.log('Response data:', response.data);
      setGroupSchedule(response.data || []);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.groupList}>
        <h1>Groups:</h1>
        <ul>
          {groups.map((group, index) => (
            <li key={index} onClick={() => { setSelectedGroup(group); fetchGroupSchedule(group); }} className={styles.listItem}>
              {group}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.scheduleTable}>
        {selectedGroup && (
          <div>
            <h2>Schedule for {selectedGroup}:</h2>
            <div>
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map((day) => (
                <DaySchedule key={day} day={day} schedule={groupSchedule.filter(item => item['День'] === day)} selectedGroup={selectedGroup} />

              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Testapp;
