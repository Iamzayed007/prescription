import React, { useState } from 'react'
import './LeftSidebar.css'

import RightSidePanel from '../RightSidePanel/RightSidePanel'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import useData from '../../hooks/useData'
import { FormControl } from 'react-bootstrap'
import FormComponent from '../FormComponent/FormComponent'
import TableComponent from '../TableComponent/TableComponent'
import InputFeild from '../InputFeild/InputFeild'
import LeftSidePanel from '../LeftSidePanel/LeftSidePanel'
import ReactToPrint from 'react-to-print'
import generatePDF,{Margin} from 'react-to-pdf';
import ReactToPdf from 'react-to-pdf';

const formData = [
  { name: "name", inputRecordType: 1, type: 'text', className: 'form-control', placeHolder: 'Name' },
  { name: "age", inputRecordType: 1, type: 'number', className: 'form-control mt-3', placeHolder: 'Age' },
]
const LeftSidebar = () => {
  const { createPatient, openRightSidePanel, isAddPatient, setIsAddPatient, patientList, isPatientSelect,
    setIsPatientSelect, handleClose, setIsRxShow,
    leftSidePanel, setLeftSidePanel,
    currentPatient,
    contentRef

  } = useData()
  
  const handleAddPatient = () => {
    setIsAddPatient(true)
    setIsPatientSelect(false)
    setIsRxShow(false)
    openRightSidePanel()
  }
  const handlePatientSelect = () => {
    setIsPatientSelect(true)
    setIsAddPatient(false)
    setIsRxShow(false)
    openRightSidePanel()
  }
  const handleMenu = () => {
    setLeftSidePanel(true)
  }
  const options ={
    filename:`${currentPatient && currentPatient.patientName ? `${currentPatient.patientName}.pdf`: 'prescription.pdf'}`,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.SMALL,
      // unit: 'px',
      // margin: '10',
      // format: [90,100],
 
   },
   
  }
  return (
    <>
      <div className='leftSidebarContainer'>
        <div className='mb-3'>
          <ButtonComponent size='sm' variant="outline-success" onClick={handleMenu}>{'Menu'} </ButtonComponent>
          {/* <ButtonComponent size='sm' className="btn btn-success" onClick={handlePatientSelect}>Patient List</ButtonComponent> */}

        </div>
        <div>

          {/* <ButtonComponent size='sm' onClick={handleAddPatient}>Add Patient</ButtonComponent> */}
        </div>
      </div>
      {isAddPatient && <RightSidePanel title="Add Patient">
        <div className='me-3'>

          {/* <FormComponent formData={formData} handleSubmit={createPatient} /> */}
          <InputFeild name="name" inputRecordType={1} type='text' className='form-control' placeHolder='Name' />
          <InputFeild name="age" inputRecordType={1} type='number' className='form-control mt-3' placeHolder='Age' />
          <div className='d-flex mt-5'>
            <ButtonComponent className='btn btn-primary' onClick={createPatient}>Save</ButtonComponent>
            <ButtonComponent className='btn btn-light ms-3' onClick={handleClose}>Cancel</ButtonComponent>
          </div>
        </div>
      </RightSidePanel>
      }
      {isPatientSelect && <RightSidePanel title="Select Patient">
        <div className='me-3'>
          <TableComponent />
        </div>
      </RightSidePanel>
      }

      {
        leftSidePanel && <LeftSidePanel>
          <div className="ms-5">
          <div className='mb-3'>
            <ButtonComponent size='sm' className="btn btn-success minWidth100" onClick={handlePatientSelect}>Patient List</ButtonComponent>

          </div>
          <div className='mb-3'>

            <ButtonComponent size='sm' className="minWidth100" onClick={handleAddPatient}>Add Patient</ButtonComponent>
          </div>
          <div>
            <ReactToPrint
        trigger={() => <ButtonComponent size='sm' variant='warning' className='minWidth100'>Print</ButtonComponent>}
        content={() => contentRef.current}
      />
          </div>
           {/* <div className="mt-3">
           <ButtonComponent size='sm' variant='outline-info' className='minWidth100' onClick={() => generatePDF(contentRef, options)}>Save</ButtonComponent>
           </div> */}
          </div>
        </LeftSidePanel>
      }
    </>
  )
}

export default LeftSidebar