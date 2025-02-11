import React from 'react';
import { Helmet } from 'react-helmet';
import Terms from '../../components/Layout/Terms.js'

function TermsUsePage() {
  
  return (
    <div>
        <Helmet>
            <title>BizBuddy | Terms of Use</title>
        </Helmet>
        
        <main>
          <Terms />
        </main>

    </div>
  );
}

export default TermsUsePage;
