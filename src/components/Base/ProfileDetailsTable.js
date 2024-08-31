import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ProfileDetails({ userInfo, workInfo, birthDate }) {

  const displayValue = (value) => {
    return value === undefined || value === null || value === '' ? '-' : value;
  };

  return (
    <>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              Basic Details
            </Typography>
            <Typography variant="h5" component="div">
              {displayValue(userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : '')}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
              {displayValue(userInfo ? userInfo.teamName : '')}
            </Typography>

            <Typography variant="body2">
              Birthday
            </Typography>
            <Typography sx={{ color: 'text.secondary', ml: "20px", mb: "2px", fontStyle: "italic" }}>
              {displayValue(birthDate ? birthDate : '')}
            </Typography>

            <Typography variant="body2">
              Gender
            </Typography>
            <Typography sx={{ color: 'text.secondary', ml: "20px", mb: "2px", fontStyle: "italic" }}>
              {displayValue(userInfo ? userInfo.teamRole : '')}
            </Typography>

            <Typography variant="body2">
              Contact Number
            </Typography>
            <Typography sx={{ color: 'text.secondary', ml: "20px", mb: "2px", fontStyle: "italic" }}>
              {displayValue(workInfo ? workInfo.basicPay : '')}
            </Typography>

            <Typography variant="body2">
              Location
            </Typography>
            <Typography sx={{ color: 'text.secondary', ml: "20px", mb: "2px", fontStyle: "italic" }}>
              {displayValue(workInfo ? workInfo.campaignInvovled : '')}
            </Typography>

            <Typography variant="body2">
              About Me
            </Typography>
            <Typography sx={{ color: 'text.secondary', ml: "20px", mb: "2px", fontStyle: "italic" }}>
              {displayValue(workInfo ? workInfo.employmentStatus : '')}
            </Typography>

          </CardContent>
        </Card>
      </Box>

      <br />
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              Work Details
            </Typography>
            <Typography variant="h5" component="div" sx={{ mb: "20px" }}>
              {displayValue(userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : '')}
            </Typography>

            <Typography variant="body2">
              Joined Date
            </Typography>
            <Typography sx={{ color: 'text.secondary', ml: "20px", mb: "2px", fontStyle: "italic" }}>
              {displayValue(workInfo ? workInfo.joinedOn : '')}
            </Typography>

            <Typography variant="body2">
              Team Role
            </Typography>
            <Typography sx={{ color: 'text.secondary', ml: "20px", mb: "2px", fontStyle: "italic" }}>
              {displayValue(userInfo ? userInfo.teamRole : '')}
            </Typography>

            <Typography variant="body2">
              Basic Pay
            </Typography>
            <Typography sx={{ color: 'text.secondary', ml: "20px", mb: "2px", fontStyle: "italic" }}>
              {displayValue(workInfo ? workInfo.basicPay : '')}
            </Typography>

            <Typography variant="body2">
              Campaign
            </Typography>
            <Typography sx={{ color: 'text.secondary', ml: "20px", mb: "2px", fontStyle: "italic" }}>
              {displayValue(workInfo ? workInfo.campaignInvovled : '')}
            </Typography>

            <Typography variant="body2">
              Employment Status
            </Typography>
            <Typography sx={{ color: 'text.secondary', ml: "20px", mb: "2px", fontStyle: "italic" }}>
              {displayValue(workInfo ? workInfo.employmentStatus : '')}
            </Typography>

            <Typography variant="body2">
              Work Setup
            </Typography>
            <Typography sx={{ color: 'text.secondary', ml: "20px", mb: "2px", fontStyle: "italic" }}>
              {displayValue(workInfo ? workInfo.workSetup : '')}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
