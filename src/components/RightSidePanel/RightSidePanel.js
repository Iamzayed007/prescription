import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './RightSidePanel.css'
import useData from '../../hooks/useData';
const RightSidePanel = ({ children, title }) => {
  const {rightSidePanel ,closeRightSidePanel} =useData()
  return (<>
       {rightSidePanel && 
       <div className="rightSidePanel">
        <div className='mt-3 d-flex justify-content-between'>
          <div> {title && <h2 className='ms-3'>{title}</h2>}</div>
          <div> <span className='me-3 cursorPointer' onClick={closeRightSidePanel}>X</span></div>
        </div>
          <div className='mt-3 ms-3'>

          {children}
          </div>
      
    </div>
    }
    </>
  );
};

export default RightSidePanel;
