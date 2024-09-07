import React, { useState, useEffect } from 'react';
import { formatDateAndTime } from '../../utils/FormatUtils';
import { clockOutQuotes, getRandomQuote } from '../../utils/QuotesUtils';
import { clockInClockOut, startLunchBreak, startCoffeeBreak } from '../../utils/TimeUtils';
import { checkExistingTransactions } from '../../utils/UserUtils';

import ActionButtons from '../Base/ActionButtons';
import ClockDisplay from '../Base/ClockDisplay';
import CustomSnackbar from '../Base/CustomSnackbar';
import CustomButton from '../Base/Button';
import Header from '../Base/Header';

import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import ClipLoader from "react-spinners/ClipLoader";

import '../../assets/fonts/roboto.css';
import '../../assets/fonts/color.css';
import '../../assets/styles/LoginForm.css';
import '../../assets/styles/HomeForm.css';

function Home() {

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [timeZone, setTimeZone] = useState('');
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [recordedTimeIn, setRecordedTimeIn] = useState(''); 
  const [recordedTimeOut, setRecordedTimeOut] = useState('');
  const [showTimeClocks, setShowTimeClocks] = useState(true);
  const [quote, setQuote] = useState(getRandomQuote(clockOutQuotes));
  const [showQuote, setShowQuote] = useState(true); 
  const [exists, setExists] = useState(null);
  const [clockedTime, setClockedTime] = useState('');
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    Transition: SlideTransition
  });

  const [snackLunchOpen, setSnackLunchOpen] = useState(false); // Set to false initially
  const [snackCoffeeOpen, setSnackCoffeeOpen] = useState(false); // Set to false initially
  const [lunchDetails, setLunchDetails] = useState({ isLunchBreakStarted: false });
  const [lunchBreakClicks, setLunchBreakClicks] = useState(0); // Track lunch break clicks
  const [coffeeBreakClicks, setCoffeeBreakClicks] = useState(0); // Track coffee break clicks
  const [coffeeDetails, setCoffeeDetails] = useState({ isCoffeeBreakStarted: false });

  const [lunchMessage, setLunchMessage] = useState('');
  const [coffeeMessage, setCoffeeMessage] = useState('');

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
    setLoading(true);
    const result = await clockInClockOut();
    setRecordedTimeIn(formatDateAndTime(result.data.timeIn));
    setRecordedTimeOut(formatDateAndTime(result.data.timeOut));
    setLoading(false);
    setIsClockedIn(!isClockedIn);
    setTimeout(() => setShowQuote(false), 15000);
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
        setIsClockedIn(true); // User is clocked in
        setClockedTime(result.timeIn);
  
        // Handle coffee break state initialization
        if (result.isCoffeeBreakStarted) {
          setCoffeeDetails({ isCoffeeBreakStarted: true });
          setSnackCoffeeOpen(true); // If coffee break is already started, show the Snackbar
        } else {
          setCoffeeDetails({ isCoffeeBreakStarted: false });
          setSnackCoffeeOpen(false);
        }
      }
    }

    fetchTransactions();

    return () => clearInterval(timer);
  }, [isClockedIn]);

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

  const handleLunchBreak = async () => {
    if (lunchBreakClicks < 2) {
      try {
        setLoading(true);
        const result = await startLunchBreak();
        setLunchDetails(result.data);
        setLunchBreakClicks((prev) => prev + 1);
        
        // Update the message based on the action (start/end)
        if (result.data.isLunchBreakStarted) {
          setLunchMessage("You are still in Lunch Break!");
        } else {
          setLunchMessage("Lunch Break ended successfully!");
        }
        
        setSnackLunchOpen(true); // Always open the Snackbar when action occurs
      } catch (error) {
        console.error('Error handling lunch break:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleCoffeeBreak = async () => {
    if (coffeeBreakClicks < 2) {
      try {
        setLoading(true);
        const result = await startCoffeeBreak();
        setCoffeeDetails(result.data);
        setCoffeeBreakClicks((prev) => prev + 1);
        
        // Update the message based on the action (start/end)
        if (result.data.isCoffeeBreakStarted) {
          setCoffeeMessage("Coffee Break ended successfully");
        } else {
          setCoffeeMessage("You are still in Coffee Break!!");
        }
        
        setSnackCoffeeOpen(true); // Always open the Snackbar when action occurs
      } catch (error) {
        console.error('Error handling coffee break:', error);
      } finally {
        setLoading(false);
      }
    }
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
            {isClockedIn && (
              <ActionButtons
                onLunchBreak={handleLunchBreak}
                onCoffeeBreak={handleCoffeeBreak}
                lunchLabel={lunchDetails.isLunchBreakStarted ? "Want to end your Lunch?" : "Want to have your Lunch?"}
                breakLabel={coffeeDetails.isCoffeeBreakStarted ? "Done with your Coffee?" : "Want to have your Coffee?"}
                lunchBreakClicks={lunchBreakClicks}
                coffeeBreakClicks={coffeeBreakClicks}
              />

            )}
            </div>
            )}  

            {/* Snackbar for Lunch Break */}
            {isClockedIn && (
              <>
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  open={snackLunchOpen}
                  onClose={() => setSnackLunchOpen(false)}
                  message={lunchMessage}  // Dynamic message
                  key="topleft-lunch"
                />
              </>
            )}
            {isClockedIn && (
              <>    
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  open={snackCoffeeOpen}
                  onClose={() => setSnackCoffeeOpen(false)}
                  message={coffeeMessage}  // Dynamic message
                  key="topleft-coffee"
                />
              </>
            )}
        </div>
    </div>
  );
}

export default Home;
