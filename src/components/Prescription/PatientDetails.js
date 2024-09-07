import React from 'react'
import useData from '../../hooks/useData'

const PatientDetails = () => {
    const {currentPatient}=useData()
    // console.log(currentPatient);
    let date=  new Date().toString().slice(0, 16)
  return (
    <>
  <div className='py-2 row border'>
        <div className='col-md-5 ms-2'>Name: <span className='ms-3'>{currentPatient && currentPatient.patientName} </span></div>
        <div className='col-md-3'>Age:<span className='ms-3'>{currentPatient && currentPatient.age}</span> </div>
        <div className='col-md-3'>Date:<span className='ms-3'>{ date}</span> </div>
    </div>
    </>
  )
}

export default PatientDetails