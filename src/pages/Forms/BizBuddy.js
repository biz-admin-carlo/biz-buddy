import React from 'react';
import { Helmet } from 'react-helmet';
import BizBuddyLayout from '../../components/Layout/BizBuddyLayout';
import useAuthRedirect from '../../hooks/useAuthRedirect'; 

function BizBuddy() {
  useAuthRedirect();

  return (
    <div>
        <Helmet>
            <title>BizBuddy | BizBuddy</title>
        </Helmet>
        
        <main>
          <BizBuddyLayout />
        </main>

    </div>
  );
}

export default BizBuddy;
