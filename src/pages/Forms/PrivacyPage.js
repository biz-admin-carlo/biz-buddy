import React from 'react';
import { Helmet } from 'react-helmet';
import Privacy from '../../components/Layout/Privacy.js'

function PrivacyPage() {
  
  return (
    <div>
        <Helmet>
            <title>BizBuddy | Privacy Policy</title>
        </Helmet>
        
        <main>
          <Privacy />
        </main>

    </div>
  );
}

export default PrivacyPage;
