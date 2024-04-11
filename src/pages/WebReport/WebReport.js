import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import StatsTable from '../../components/StatsTable/StatsTable';
import LastUserCard from '../../components/LastUserCard/LastUserCard';
import Snackbar from '@mui/material/Snackbar';
import Loader from 'react-loaders';
import CsvButton from '../../components/CsvButton/CsvButton';
import { TEN_SECONDS, FIVE_MINUTES, LOCAL_STATISTICS_URL, LOCAL_NEW_STATISTICS_URL } from '../../shared/constants';
import './WebReport.scss';

const WebReport = () => {
  const [stats, setStats] = useState([]);
  const [newStats, setNewStats] = useState({});
  const [openNotification, setOpenNotification] = useState(false);

  const generateNewStats = async () => {
    try {
      const response = await axios.get(LOCAL_NEW_STATISTICS_URL);
      setNewStats(response.data);
      setOpenNotification(true);
    } catch (error) {
      alert('Error generating new stats:', error);
    }
  };

  const fetchStats = useCallback(async () => {
    try {
      const response = await axios
                                   .get(LOCAL_STATISTICS_URL);
      const sortedStats = response?.data
                                   .sort((a, b) => b.score - a.score)
                                   .slice(0, 10);
      setStats(sortedStats);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const statsIntervalId = setInterval(() => {
      fetchStats();
    }, TEN_SECONDS);
    const newStatsIntervalId = setInterval(() => {
      generateNewStats();
    }, FIVE_MINUTES);
    
    return () => {
      clearInterval(statsIntervalId);
      clearInterval(newStatsIntervalId);
    };
  }, [fetchStats]);

  useEffect(() => {
    generateNewStats();
    fetchStats();
  }, [fetchStats]);

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNotification(false);
  };    
  
  return (
    <section className='main-section'>
      <Snackbar
        open={openNotification}
        autoHideDuration={5000}
        onClose={handleClose}        
        message="New Stack of User stats Added."
        key={{ vertical: 'top', horizontal: 'right' }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
      <h2 className='main-tittle'>Top 10 Best Scores</h2>      
      {stats.length ? 
        <div>
          <CsvButton stats={stats}/>
          <StatsTable activeStats={stats}/>
          {newStats.lastUser && (
            <LastUserCard newStats={newStats}/>
          )}
        </div>
       : <Loader type="pacman" />}      
      
    </section>
  );
};

export default WebReport;
