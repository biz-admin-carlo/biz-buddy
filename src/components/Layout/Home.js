import React, { useState, useEffect } from 'react';
import CustomButton from '../../components/Base/Button';
import { clockInClockOut } from '../../utils/TimeUtils';

import '../../assets/fonts/roboto.css';
import '../../assets/fonts/color.css';
import '../../assets/styles/LoginForm.css';

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";


function HomeForm() {

  const [ currentTime, setCurrentTime ] = useState(new Date().toLocaleTimeString());
  const [ timeZone, setTimeZone ] = useState('');
  const [ isClockedIn, setIsClockedIn ] = useState(false);
  const [ isBreakIn, setIsBreakIn ] = useState(false);
  const [ startTime, setStartTime ] = useState(null);
  const [ elapsedTime, setElapsedTime ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ recordedTimeIn, setRecordedTimeIn ] = useState(''); 
  const [ recordedTimeOut, setRecordedTimeOut ] = useState('');
  const [showTimeClocks, setShowTimeClocks] = useState(true);


const formatDateAndTime = (isoString) => {
    if (!isoString) return null;
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return null;  // Check if the date is valid
    return date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        timeZoneName: 'short'
    });
};

  const toggleClock = async () => {
    setLoading(true);
    const result = await clockInClockOut();
    setRecordedTimeIn(formatDateAndTime(result.data.timeIn));
    setRecordedTimeOut(formatDateAndTime(result.data.timeOut));
    setLoading(false);
    setIsClockedIn(!isClockedIn);
};

const toggleBreak = () => {
    setIsBreakIn(!isBreakIn); 
};

useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    }, 1000);

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
        }, 300000);

        return () => clearTimeout(timer); 
    }
}, [recordedTimeIn, recordedTimeOut]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10vh' }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
      }}>
        <h1 className='roboto-medium'>Biz Buddy</h1>
        <h3 className='roboto-home-timezone'>{timeZone}</h3>
        <h2 className='roboto-home'>{currentTime}</h2>
        {loading ? (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <ClipLoader color="#36D7B7" size={50} />
        </div>
        ) : (
          <div>
            <h3 className='roboto-home-question'>
              {isClockedIn ? 'You wish to clock out already?' : 'You wish to clock in already?'}
            </h3>
            <div style={{ textAlign: 'right' }}>
              <CustomButton onClick={toggleClock}>
                {isClockedIn ? 'Clock-Out' : 'Clock-In'}
              </CustomButton>
            </div>
            {recordedTimeIn && showTimeClocks && (
                <>
                    <p className='roboto-thin-italic biz-text'>This is the logged-in time clock: {recordedTimeIn}</p>
                    {recordedTimeOut && <p className='roboto-thin-italic biz-text'>This is the logged-out time clock: {recordedTimeOut}</p>}
                </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeForm;
