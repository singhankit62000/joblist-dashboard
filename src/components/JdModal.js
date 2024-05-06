import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';

import './JdModal.css'
import './JobItem.css'

export default function JdModal({jobItem, open, handleOpenModal}) {
  const handleEasyApply = () => {
    window.location.href = jobItem.jdLink;
  };

  return (
    <div>
      <button onClick={handleOpenModal} className='job-view-btn'>View job</button> 
      <Modal
        open={open}
        onClose={handleOpenModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='jdmodal'
      >
        <div className='jdmodal-desc'>
        <div className='header-container'>
        <Avatar
            alt="company logo"
            src={jobItem.logoUrl}
            sx={{ width: 50, height: 50 }}
            variant="square"
        />
        <div className='header-details'>
            <h3 className='header-company-name'>{jobItem.companyName}</h3>
            <h4 className='header-role'>{jobItem.jobRole}</h4>
            <p className='header-location'>{jobItem.location}</p>
          </div>
        </div>
        <h3 className='jdmodal-about'>About Company:</h3>
          <div className='jodmodal-details'>{jobItem.jobDetailsFromCompany}</div>
          <button className='easy-apply-btn' onClick={handleEasyApply}>⚡Easy Apply</button>
        </div>
      </Modal>
    </div>
  );
}