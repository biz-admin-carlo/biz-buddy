import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ShiftLayout from '../../components/Layout/Shift';
import useAuthRedirect from '../../hooks/useAuthRedirect'; 

function ShiftPage() {
  useAuthRedirect();

  return (
    <div>
        <Helmet>
            <title>BizBuddy | Shifts</title>
        </Helmet>
        
        <main>
          <ShiftLayout />
        </main>

    </div>
  );
}

export default ShiftPage;
