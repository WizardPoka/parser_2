import React, { useState } from 'react';
import axios from 'axios';

function GroupSearch({ groups, onGroupSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    try {
      const response = await axios.get(`http://localhost:5000/search_groups?term=${term}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSelectGroup = (group) => {
    onGroupSelect(group);
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search groups..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <ul>
        {searchResults.map((group, index) => (
          <li key={index} onClick={() => handleSelectGroup(group)}>
            {group}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupSearch;
