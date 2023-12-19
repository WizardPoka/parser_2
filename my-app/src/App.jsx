// =================================================================================================

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// =================================================================================================
function App() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupSchedule, setGroupSchedule] = useState([]);

// =================================================================================================

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_groups');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

// =================================================================================================

const fetchGroupSchedule = async (groupName) => {
  try {
    const response = await axios.post('http://localhost:5000/get_schedule', { group_name: groupName });
    console.log(response.data); // Оставьте эту строку для отладки
    setGroupSchedule(Array.isArray(response.data) ? response.data : []);

    // console.log(groupSchedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
  }
};

// =================================================================================================

  return (
    <div>
      <h1>Group Schedule</h1>
      <div>
        <h2>Groups:</h2>
        <ul>
          {groups.map((group, index) => (
            <li key={index} onClick={() => { setSelectedGroup(group); fetchGroupSchedule(group); }}>
              {group}
            </li>
          ))}
        </ul>
      </div>
      {selectedGroup && (
        <div>
        <h2>Schedule for {selectedGroup}:</h2>
        <ul>
          {groupSchedule.map((scheduleItem, index) => (
            <li key={index}>
              <strong>Day:</strong> {isNaN(scheduleItem.День) ? 'No day' : scheduleItem.День}, {' '}
              <strong>Lesson:</strong> {scheduleItem.Урок}, {' '}
              <strong>Subject:</strong> {String(scheduleItem[selectedGroup]) || 'No lesson'}
            </li>
          ))}
        </ul>
      </div>
        )}

    </div>
  );
}

// =================================================================================================

export default App;

// =================================================================================================