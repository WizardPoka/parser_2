// =================================================================================================
// Обыкновенные импорты
import React, { useState, useEffect } from 'react';
import axios from 'axios';


// =================================================================================================
// 
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
    const ways = response.data
    setGroupSchedule(Array.isArray(ways) ? ways : []);
    console.log(ways); // Строка для отладки
  } 
  catch (error){
    console.error('Error fetching schedule:', error);
  }
};

// =================================================================================================

  return (
    <div>
      
      <section>
      <h1>Group Schedule</h1>
      
      
        <h2>Groups:</h2>
        <ul>
          <li>
            <p>
              {groups.map((group, index) => (
                <li key={index} onClick={() => { setSelectedGroup(group); fetchGroupSchedule(group); }}>
                  {group}
                </li>
              ))}
            </p>
          </li>
        </ul>
      </section>


      <section>

      {selectedGroup && (
        <ul>
        <h2>Schedule for {selectedGroup}:</h2>
          <li>
            <p>
              {groupSchedule.map((scheduleItem, index) => (
                <li key={index}>
                  <strong>Day:</strong> {isNaN(scheduleItem.День) ? 'No day' : scheduleItem.День}, {' '}
                  <strong>Lesson:</strong> {scheduleItem.Урок}, {' '}
                  <strong>Subject:</strong> {String(scheduleItem[selectedGroup]) || 'No lesson'}
                </li>
              ))}
            </p>
          </li>
        </ul>
      
        )}
                
      </section>
    </div>
  );
}

// =================================================================================================

export default App;

// =================================================================================================