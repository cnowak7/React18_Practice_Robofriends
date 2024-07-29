import React, { useState, useEffect, useRef } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

function App() {
  const [robots, setRobots] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [shouldRefreshRobots, setShouldRefreshRobots] = useState(false);

  const didFetchRobots = useRef(false);

  useEffect(() => {
    if (!didFetchRobots.current || shouldRefreshRobots) {
      fetchRobots();
    }

    return () => {
      didFetchRobots.current = true;
      setShouldRefreshRobots(false);
    };
  }, [shouldRefreshRobots]);

  const fetchRobots = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        setRobots(users);
      });
  };

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  if (robots.length === 0) {
    return <h1 className='tc'>Loading...</h1>;
  }

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });

  return (
    <div className='tc'>
      <h1 className='f1'>RoboFriends</h1>
      <button
        onClick={() => {
          setShouldRefreshRobots(true);
        }}
      >
        Refresh Robots!
      </button>
      <SearchBox onSearchChange={onSearchChange} />
      <Scroll>
        <CardList robots={filteredRobots} />
      </Scroll>
    </div>
  );
}

export default App;
