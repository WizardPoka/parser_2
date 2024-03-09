// Testapp.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Testapp.module.css';

function Testapp() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupSchedule, setGroupSchedule] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_groups');
        setGroups(response.data);
        // Выберем первые три группы (если они есть)
        if (response.data.length > 2) {
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
  
      const processedData = processScheduleData(response.data);
  
      setGroupSchedule(processedData || []);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };
  
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
  
  

  // const fetchGroupSchedule = async (groupName) => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/get_schedule', { group_name: groupName });
  //     console.log('Response data:', response.data);
  //     setGroupSchedule(response.data || []);
  //   } catch (error) {
  //     console.error('Error fetching schedule:', error);
  //   }
  // };

  return (
    <div className={styles.container}>
      <div className={styles.groupList}>
        <h1>Groups:</h1>
        <ul>
          {groups.slice(0, 13).map((group, index) => (
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
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>День</th>
                  <th>Урок</th>
                  <th>{selectedGroup}</th>
                </tr>
              </thead>
              <tbody>
                {groupSchedule.map((scheduleItem, index) => (
                  <tr key={index}>
                    <td>{scheduleItem['День'] || 'No data'}</td>
                    <td>{scheduleItem['Урок'] || 'No data'}</td>
                    <td>{scheduleItem[selectedGroup] || 'No data'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Testapp;