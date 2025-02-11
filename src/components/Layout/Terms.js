import * as React from 'react';
import { Typography, Container, Breadcrumbs, Link } from '@mui/material';
import '../../assets/fonts/roboto.css';
import '../../assets/fonts/color.css';
import '../../assets/styles/LoginForm.css';
import '../../assets/styles/HomeForm.css';

function Terms() {
  return (
    <div className="privacy-container">
      <Container maxWidth="md" sx={{ marginTop: '80px', marginBottom: '100px' }}>
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '30px' }}>
          <Link underline="hover" color="inherit" href="/login">
            Login
          </Link>
          <Typography sx={{ color: 'text.primary' }}>Terms of Use</Typography>
        </Breadcrumbs>

        <Typography variant="h3" component="h1" align="left" gutterBottom sx={{ fontWeight: 'bold' }}>
            Terms of Use
        </Typography>
        <Typography variant="h5" component="h5" align="left" gutterBottom sx={{ fontWeight: 'bold' }}>
            BizBuddy - Timekeeping Mobile Application
        </Typography>
        <Typography 
          variant="p" 
          component="p" 
          align="left" 
          color="textSecondary" 
          paragraph 
          sx={{ marginBottom: '80px', fontFamily: 'Roboto' }}>
            Last Updated: February 01, 2025
        </Typography>

        <Typography variant="h5" gutterBottom>
          1. Introduction
        </Typography>
        <Typography variant="body1" paragraph>
          At BizBuddy, operated by BizSolutions LLC (referred to as "we," "our," or "us"), we value your privacy and are committed to protecting the personal information you share with us through the BizBuddy Timekeeping Mobile Application (referred to as the "Application"). This Terms of Use outlines the terms and conditions that govern your use of the Application. By using the Application, you agree to be bound by the practices described in this document.
        </Typography>

        <Typography variant="h5" gutterBottom>
          2. Software Subscription
        </Typography>
        <Typography variant="body1" paragraph>
          2.1 Use. Subject to and conditioned on your payment of applicable fees and full compliance with this Agreement, BizBuddy grants you a non-exclusive, non-sublicensable, non-transferable license to access and use the Application ("Software Subscription") during the term of your subscription, as described in the Documentation.
        </Typography>
        <Typography variant="body1" paragraph>
          2.2 Installation. Use of the Application may require you to install BizBuddy mobile software on compatible devices. You are granted a non-exclusive, non-sublicensable, non-transferable license to install and use the Application for personal use.
        </Typography>

        <Typography variant="h5" gutterBottom>
          3. Customer Responsibilities
        </Typography>
        <Typography variant="body1" paragraph>
          3.1 Compliance with Agreement. You agree to comply with all terms outlined in this Agreement and cooperate with BizBuddy in the performance of this Agreement.
        </Typography>
        <Typography variant="body1" paragraph>
          3.2 Customer Data. You are solely responsible for the content or data that you submit while using the Application ("Customer Data"). BizBuddy will not claim ownership of your data but reserves the right to use, store, and process your data as necessary to provide the service.
        </Typography>

        <Typography variant="h5" gutterBottom>
          4. Restrictions
        </Typography>
        <Typography variant="body1" paragraph>
          4.1 Unauthorized Use. You shall not reverse engineer, decompile, disassemble, or attempt to discover the source code of the Application. Unauthorized commercial use or distribution of the Application is strictly prohibited.
        </Typography>

        <Typography variant="h5" gutterBottom>
          5. Payment of Fees
        </Typography>
        <Typography variant="body1" paragraph>
          5.1 Fees. You agree to pay all fees specified for your subscription as outlined in the applicable Order Form. All fees are due within 30 days and are non-refundable.
        </Typography>

        <Typography variant="h5" gutterBottom>
          6. Confidentiality
        </Typography>
        <Typography variant="body1" paragraph>
          6.1 Confidential Information. Each party acknowledges that it may receive confidential information from the other. This information must be kept confidential and only used in accordance with this Agreement.
        </Typography>

        <Typography variant="h5" gutterBottom>
          7. Data Protection and Security
        </Typography>
        <Typography variant="body1" paragraph>
          7.1 Customer Data. We take reasonable measures to protect your personal data. By using the Application, you agree to the processing of your data in accordance with applicable data protection laws.
        </Typography>

        <Typography variant="h5" gutterBottom>
          8. Indemnification
        </Typography>
        <Typography variant="body1" paragraph>
          8.1 By BizBuddy. BizBuddy agrees to indemnify and defend you against third-party claims arising from our use of the Application.
        </Typography>
        <Typography variant="body1" paragraph>
          8.2 By You. You agree to indemnify BizBuddy for any claims or losses arising from your use of the Application or violation of this Agreement.
        </Typography>

        <Typography variant="h5" gutterBottom>
          9. Termination
        </Typography>
        <Typography variant="body1" paragraph>
          9.1 Term. This Agreement will remain in effect until terminated by either party as outlined herein. Either party may terminate this Agreement for any reason with 30 days' notice.
        </Typography>

        <Typography variant="h5" gutterBottom>
          10. Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          10.1 Limitation. BizBuddy's liability for any damages arising from this Agreement will not exceed the total amount you paid for your subscription during the 12-month period prior to the event giving rise to the claim.
        </Typography>

        <Typography variant="h5" gutterBottom>
          11. Governing Law and Dispute Resolution
        </Typography>
        <Typography variant="body1" paragraph>
          11.1 Governing Law. This Agreement is governed by the laws of the State of California, U.S.A. Any disputes will be resolved through binding arbitration in Santa Clara County, California.
        </Typography>

        <Typography variant="h5" gutterBottom>
          12. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions or concerns about this Agreement, please contact us at:
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>BizSolutions LLC</strong><br />
          Address: 20289 Stevens Creek Boulevard, #1039, Cupertino, CA 95014<br />
          Email: bizsolutionssupport@bizsolutions.us
        </Typography>
      </Container>
    </div>
  );
}

export default Terms;
