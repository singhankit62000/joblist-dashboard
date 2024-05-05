import * as React from 'react';
import Modal from '@mui/material/Modal';

import './JdModal.css'

export default function JdModal({jobDesc, open, handleOpenModal}) {
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
        <h3 className='jdmodal-about'>About Company:</h3>
          {jobDesc}
        </div>
      </Modal>
    </div>
  );
}