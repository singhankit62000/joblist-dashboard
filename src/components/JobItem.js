import React from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import JdModal from './JdModal';

import './JobItem.css';

function JobItem({jobItem, open, handleOpenModal}) {

  const handleEasyApply = () => {
    window.location.href = jobItem.jdLink;
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345 }} className='job-item-card'>
      <div className='job-duration' variant='extended' size='small'>
        ⌛Posted 10 days ago
      </div>
      <div className='header-container'>
        <Avatar
            alt="company logo"
            src={jobItem.logoUrl}
            sx={{ width: 30, height: 30 }}
            variant="square"
        />
        <div className='header-details'>
          <h3 className='header-company-name'>{jobItem.companyName}</h3>
          <h4 className='header-role'>{jobItem.jobRole}</h4>
          <p className='header-location'>{jobItem.location}</p>
        </div>
      </div>
      <p className='job-salary'>Estimated Salary: {jobItem.salaryCurrencyCode} {jobItem.minJdSalary? jobItem.minJdSalary: "0"} - {jobItem.maxJdSalary? jobItem.maxJdSalary: "0"} LPA ✅</p>
      <div className='job-content'>
        <h3 className='job-about'>About Company:</h3>
        <p className='job-details'>{jobItem.jobDetailsFromCompany}</p>
        <JdModal jobItem={jobItem} open={open} handleOpenModal={handleOpenModal}/>
      </div>
      <div className='job-card-footer'>
        <p className='footer-head'>Minimum Experience</p> 
        <p className='footer-text'>{jobItem.minExp? ((jobItem.minExp > 1) ? jobItem.minExp + ' years' : 0 + ' year') : 0 + ' year'}</p>
      </div>
      <button className='easy-apply-btn' onClick={handleEasyApply}>⚡Easy Apply</button>
      <div className='referral-btn' onClick={handleEasyApply}>
        <div className='referral-avatar'>
        <Avatar
            alt="referrer avatar"
            src='ava-1.png'
            sx={{ width: 30, height: 30 }}
        />
        <Avatar
            alt="referrer avatar"
            src='ava-2.png'
            sx={{ width: 30, height: 30 }}
        />
        </div>
        <p className='referral-text'>Unlock referral asks</p>
      </div>
    </Card>
    </div>
  )
}

export default JobItem