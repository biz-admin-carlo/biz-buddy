import React from 'react';
import { Helmet } from 'react-helmet';
import BizSolutionsLayout from '../../components/Layout/BizSolutionsLayout';
import useAuthRedirect from '../../hooks/useAuthRedirect'; 

function BizSolutions() {
  useAuthRedirect();

  return (
    <div>
        <Helmet>
            <title>BizBuddy | BizSolutions</title>
        </Helmet>
        
        <main>
          <BizSolutionsLayout />
        </main>

    </div>
  );
}

export default BizSolutions;
