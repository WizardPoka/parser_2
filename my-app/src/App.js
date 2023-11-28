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
            {groupSchedule.map(({ День, Урок, [selectedGroup]: selectedGroupValue = '' }, index) => (
              <li key={index}>{`${День} - ${Урок}: ${selectedGroupValue || 'No lesson'}`}</li>
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