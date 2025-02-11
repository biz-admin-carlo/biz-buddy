import * as React from 'react';
import { Typography, Container, Breadcrumbs, Link } from '@mui/material';
import '../../assets/fonts/roboto.css';
import '../../assets/fonts/color.css';
import '../../assets/styles/LoginForm.css';
import '../../assets/styles/HomeForm.css';

function Privacy() {
  return (
    <div className="privacy-container">
        
      <Container maxWidth="md" sx={{ marginTop: '80px', marginBottom: '100px' }}>
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '30px' }}>
          <Link underline="hover" color="inherit" href="/login">
            Login
          </Link>
          <Typography sx={{ color: 'text.primary' }}>Privacy Policy</Typography>
        </Breadcrumbs>

        <Typography variant="h3" component="h1" align="left" gutterBottom sx={{ fontWeight: 'bold' }}>
            Privacy Policy
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
        At BizBuddy, operated by BizSolutions LLC (referred to as "we," "our," or "us"), we value your privacy and are committed to protecting the personal information you share with us through the BizBuddy Timekeeping Mobile Application (referred to as the "Application"). This Privacy Policy outlines the types of information we collect, how we use it, and your rights concerning your data. By using the Application, you agree to the practices described in this Privacy Policy.
        </Typography>

        <Typography variant="h5" gutterBottom>
        2. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
        We collect both personal and non-personal information to provide and improve our services. Below are the types of information we collect:
        </Typography>

        <Typography variant="h6" gutterBottom>
        A. Information You Provide to Us
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>Account Information:</strong> When you create an account with BizBuddy, we collect information such as your name, email address, phone number, and company details.
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>Communication:</strong> If you contact us, we collect information you provide in your message, including any attachments or feedback.
        </Typography>

        <Typography variant="h6" gutterBottom>
        B. Information We Collect Automatically
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>Usage Data:</strong> We collect information about how you interact with the Application, including time tracking data, tasks, projects, hours worked, and any other data you input while using the app.
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>Device Information:</strong> We collect information about the devices you use to access the Application, such as device model, IP address, operating system version, and other device-specific identifiers.
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>Location Data:</strong> With your permission, we may collect your device’s location to enable specific features of the Application (e.g., location-based tracking).
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>Cookies & Analytics:</strong> We use cookies and similar technologies to analyze how the Application is used and to improve your experience. You can manage your cookie preferences through your device settings.
        </Typography>

        <Typography variant="h6" gutterBottom>
        C. Information From Third Parties
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>Third-Party Services:</strong> We may collect information from third-party services like payment processors or authentication providers to enable account registration and payment processing.
        </Typography>

        <Typography variant="h5" gutterBottom>
        3. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
        We use your information for the following purposes:
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>To Provide Services:</strong> To deliver and improve the functionality of the Application, including time tracking, task management, and reporting.
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>For Customer Support:</strong> To assist with any issues or inquiries you may have about using the Application.
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>To Communicate:</strong> To send notifications related to your account, service updates, and marketing materials (if applicable).
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>For Security:</strong> To verify your identity, detect fraud, and maintain the security of the Application.
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>To Improve Our Services:</strong> To analyze data and enhance user experience, including conducting research and testing.
        </Typography>

        <Typography variant="h5" gutterBottom>
        4. Legal Basis for Processing Your Data
        </Typography>
        <Typography variant="body1" paragraph>
        We process your data in compliance with the applicable privacy laws. For users in the European Union (EU) or the United Kingdom (UK), we rely on the following legal bases for processing personal data:
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>Consent:</strong> We may ask for your explicit consent to process your data (e.g., for marketing purposes).
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>Contractual Necessity:</strong> We process data when it is necessary for the performance of the contract you have with us.
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>Legitimate Interests:</strong> We process data to improve our services, prevent fraud, and ensure security.
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>Legal Obligation:</strong> We may need to process your data to comply with legal requirements.
        </Typography>

        <Typography variant="h5" gutterBottom>
        5. How We Share Your Information
        </Typography>
        <Typography variant="body1" paragraph>
        We do not sell your personal information. However, we may share your information in the following ways:
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>With Third-Party Service Providers:</strong> We may share your information with trusted third parties for business operations, such as payment processors and marketing providers. These parties are only allowed to use your information for the purposes we have defined.
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>With Your Employer:</strong> If you are using the Application through your employer, your timekeeping data may be shared with your employer to facilitate monitoring and reporting.
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>For Legal Reasons:</strong> We may disclose your data if required by law, in response to legal requests, or to protect the rights and safety of BizBuddy, our users, or the public.
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.
        </Typography>

        <Typography variant="h5" gutterBottom>
        6. Data Retention
        </Typography>
        <Typography variant="body1" paragraph>
        We retain your data for as long as necessary to provide the Application and fulfill our legal and business obligations. If you delete your account, we will retain some information for record-keeping or legal purposes as required by applicable law.
        </Typography>

        <Typography variant="h5" gutterBottom>
        7. Security of Your Data
        </Typography>
        <Typography variant="body1" paragraph>
        We take reasonable measures to protect your data, including encryption of data in transit, two-factor authentication, and secure server storage. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee complete security.
        </Typography>

        <Typography variant="h5" gutterBottom>
        8. Your Rights and Choices
        </Typography>
        <Typography variant="body1" paragraph>
        Depending on your location, you may have certain rights related to your personal data:
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>Access and Correction:</strong> You have the right to request access to your data and correct any inaccuracies.
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>Deletion:</strong> You may request that we delete your data, subject to certain legal exceptions.
        </Typography>
        <Typography variant="body1" paragraph>
        <strong>Opt-Out:</strong> You can opt out of marketing communications by following the unsubscribe instructions in those communications.
        </Typography>
        <Typography variant="body1" paragraph>
        For users in the EU/UK, you have additional rights under the GDPR, including the right to data portability and the right to object to processing based on legitimate interests.
        </Typography>

        <Typography variant="h5" gutterBottom>
        9. International Data Transfers
        </Typography>
        <Typography variant="body1" paragraph>
        As BizBuddy operates globally, we may transfer your data to other countries, including the United States, for processing. We ensure that appropriate safeguards are in place to protect your data when transferred across borders.
        </Typography>

        <Typography variant="h5" gutterBottom>
        10. Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
        We may update this Privacy Policy from time to time to reflect changes in our services or legal obligations. Any changes will be posted on this page, and if the changes are significant, we will notify you through the Application or via email.
        </Typography>

        <Typography variant="h5" gutterBottom>
        11. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
        If you have any questions or concerns about your privacy or this Privacy Policy, please contact us at:
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

export default Privacy;
