import React from 'react'
import DoctorDetails from '../../components/Prescription/DoctorDetails'
import './Prescription.css'
import PatientDetails from '../../components/Prescription/PatientDetails'
import MedicineDetails from '../../components/Prescription/MedicineDetails'
import useData from '../../hooks/useData'
const  Prescription = () => {
  const {contentRef}= useData()
  return (
    <div className='prescriptionTemplate' ref={contentRef}>
        <DoctorDetails/>
        <PatientDetails/>
        <MedicineDetails/>
    </div>
  )
}

export default Prescription