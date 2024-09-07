import React, { useState, useEffect } from 'react';
import { formatDateAndTime } from '../../utils/FormatUtils';
import { clockInQuotes, clockOutQuotes, getRandomQuote } from '../../utils/QuotesUtils';
import { clockInClockOut, startLunchBreak, startCoffeeBreak } from '../../utils/TimeUtils';
import { checkExistingTransactions } from '../../utils/UserUtils';

import ActionButtons from '../Base/ActionButtons';
import ClockDisplay from '../Base/ClockDisplay';
import CustomSnackbar from '../Base/CustomSnackbar';
import CustomButton from '../Base/Button';
import Header from '../Base/Header';

import Slide from '@mui/material/Slide';
import ClipLoader from "react-spinners/ClipLoader";

import '../../assets/fonts/roboto.css';
import '../../assets/fonts/color.css';
import '../../assets/styles/LoginForm.css';
import '../../assets/styles/HomeForm.css';

function Home() {

  const [ currentTime, setCurrentTime ] = useState(new Date().toLocaleTimeString());
  const [ timeZone, setTimeZone ] = useState('');
  const [ isClockedIn, setIsClockedIn ] = useState(false);
  const [ startTime, setStartTime ] = useState(null);
  const [ elapsedTime, setElapsedTime ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ recordedTimeIn, setRecordedTimeIn ] = useState(''); 
  const [ recordedTimeOut, setRecordedTimeOut ] = useState('');
  const [ showTimeClocks, setShowTimeClocks ] = useState(true);
  const [ quote, setQuote ] = useState(getRandomQuote(clockOutQuotes));
  const [ showQuote, setShowQuote ] = useState(true); 
  const [ exists, setExists ] = useState(null);
  const [ clockedTime, setClockedTime ] = useState('');
  const [ snackbarState, setSnackbarState ] = useState({
    open: false,
    message: '',
    Transition: SlideTransition
  });

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }
  
  const handleClose = () => {
    setSnackbarState({
      ...snackbarState,
      open: false,
    });
  };

  const toggleClock = async () => {
    if (!isClockedIn) {
      setQuote(getRandomQuote(clockInQuotes)); 
    } else {
      setQuote(getRandomQuote(clockOutQuotes)); 
    }
    setShowQuote(true);
  
    setLoading(true);
    const result = await clockInClockOut();
    
    setRecordedTimeIn(formatDateAndTime(result.data.timeIn));
    setRecordedTimeOut(formatDateAndTime(result.data.timeOut));
    setLoading(false);
    setIsClockedIn(!isClockedIn);
  
    setTimeout(() => {
      setShowQuote(false);
    }, 15000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    }, 1000);

    async function fetchTransactions() {
      const result = await checkExistingTransactions();
      setExists(result);
      if (result && typeof result === 'object') {
        setIsClockedIn(true);
        setClockedTime(result.timeIn);
      }
    }

    fetchTransactions();

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let timer = null;
    if (isClockedIn) {
      timer = setInterval(() => {
        const now = new Date();
        const diff = now - startTime;
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor(((diff % 360000) % 60000) / 1000);
        setElapsedTime(`${hours}:${minutes}:${seconds}`);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isClockedIn, startTime]);

  useEffect(() => {
    if (recordedTimeIn && recordedTimeOut) {
        const timer = setTimeout(() => {
            setShowTimeClocks(false); 
        }, 120000);

        return () => clearTimeout(timer); 
    }
  }, [recordedTimeIn, recordedTimeOut]);

    useEffect(() => {
    let timer;
    if (isClockedIn && clockedTime) {
      const updateElapsedTime = () => {
        const startTime = new Date(clockedTime);
        const now = new Date();
        const diff = now - startTime;
  
        const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((diff / (1000 * 60)) % 60).toString().padStart(2, '0');
        const seconds = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
  
        setElapsedTime(`${hours}:${minutes}:${seconds}`);
      };
  
      timer = setInterval(updateElapsedTime, 1000);
    } else {
      setElapsedTime('');
    }
      return () => clearInterval(timer);
  }, [isClockedIn, clockedTime]);

  useEffect(() => {
    if (recordedTimeIn) {
      setSnackbarState({
        open: true,
        Transition: SlideTransition,
        message: 'Successful Clock-In!',
      });
    }
  }, [recordedTimeIn]);

  useEffect(() => {
    if (recordedTimeOut) {
      setSnackbarState({
        open: true,
        Transition: SlideTransition,
        message: 'Successful Clock-Out!',
      });
    }
  }, [recordedTimeOut]);

  const handleLunchBreak = async () => {
    // Logic to handle lunch break
    setLoading(true);
    const result = await startLunchBreak();
    setLoading(false);
    setSnackbarState({
      open: true,
      message: 'Lunch Break Started!',
      Transition: SlideTransition
    });
  };

  const handleCoffeeBreak = async () => {
    // Logic to handle coffee break
    setLoading(true);
    const result = await startCoffeeBreak();
    setLoading(false);
    setSnackbarState({
      open: true,
      message: 'Coffee Break Started!',
      Transition: SlideTransition
    });
  };

  return (
    <div className="homeform-container">
      <div className="homeform-wrapper">
        <Header />
        <h3 className="homeform-subtitle">{timeZone}</h3>
        <ClockDisplay isClockedIn={isClockedIn} currentTime={currentTime} elapsedTime={elapsedTime} />
        {loading ? (
        <div className="homeform-loader-container">
            <ClipLoader color="#36D7B7" size={50} />
        </div>
        ) : (
          <div>
            <h3 className="homeform-question">
              {isClockedIn ? 'Ready to clock out?' : 'Ready to clock in?'}
            </h3>
            <div className="homeform-button-container">
              <CustomButton onClick={toggleClock}>
                {isClockedIn ? 'Clock-Out' : 'Clock-In'}
              </CustomButton>
            </div>

            {showQuote && (
              <h4 className="homeform-question-quotes gray-text">
                {quote}
              </h4>
            )}
            <CustomSnackbar open={snackbarState.open} message={snackbarState.message} onClose={() => setSnackbarState({ ...snackbarState, open: false })} />
            <ActionButtons onLunchBreak={handleLunchBreak} onCoffeeBreak={handleCoffeeBreak} />
          </div>
          )}    
        </div>
    </div>
  );
}

export default Home;
