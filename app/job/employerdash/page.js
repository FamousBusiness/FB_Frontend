"use client"
import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import useSWR from 'swr';
import Cookies from 'js-cookie';
import UpdateJobStatus from './Components/UpdateJobStatus';
import AppliedCandidate from './Components/AppliedCandidate';

const fetcher = async (url) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${Cookies.get('accessToken')}`
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch job data');
  }

  const data = await res.json();
  // Consider displaying the message in a different way based on your design
  console.log(data.msg);
  return data.results;
};

const CompanyPostedJobs = () => {
  const { data: jobs, error } = useSWR('https://api.famousbusiness.in/job-api/company-posted-jobs/', fetcher);
  const [open, setOpen] = useState(false);

  if (error) return <div>Error loading jobs</div>;
  if (!jobs) return (
    <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', alignItems: 'center' }}>
      <CircularProgress size={40} />
    </div>
  );

  return (
    <Grid container spacing={3}>
      {jobs.map((job) => (
        <Grid item xs={12} sm={6} md={4} key={job.id}>
          <Card style={{ borderRadius: '20px', boxShadow: ' rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} onClick={() => setOpen(true)}>
            <CardContent>
              <Typography variant="h6" component="div">
                {job.position}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {job.description}
              </Typography>
              <Typography variant="body1" color="text.primary" style={{ marginTop: 8 }}>
                Location: {job.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Posted: {job.created_date}
              </Typography>
              <UpdateJobStatus jobs={job} onclose={() => setOpen(false)} open={open} />
              <AppliedCandidate job={job} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CompanyPostedJobs;
