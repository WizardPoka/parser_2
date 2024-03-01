import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Testapp.css';
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

// =================================================================================================

const fetchGroupSchedule = async (groupName) => {
  try {
    const response = await axios.post('http://localhost:5000/get_schedule', { group_name: groupName });
    console.log('Response data:', response.data);
    setGroupSchedule(response.data || []);
  } catch (error) {
    console.error('Error fetching schedule:', error);
  }
};



  
// =================================================================================================



  return (
    <div>

{/* <section>
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
      </section> */}

      <h1>Groups:</h1>
      <ul>
        {groups.slice(0, 3).map((group, index) => (
          <li key={index} onClick={() => { setSelectedGroup(group); fetchGroupSchedule(group); }}>
            {group}
          </li>
        ))}
      </ul>

     
  <div>
    <table>
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

    {/* <h2>Schedule for {selectedGroup}:</h2>
        <ul>
          {groupSchedule.map((scheduleItem, index) => (
            <li key={index} >
              <strong>Dictionary {index + 1}:</strong>
              <ul>
              {Object.entries(scheduleItem).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
            </li>
          ))}
        </ul> */}



    </div>
  );
}

export default Testapp;


