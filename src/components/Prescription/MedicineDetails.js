import React from 'react'
import useData from '../../hooks/useData'
import RightSidePanel from '../RightSidePanel/RightSidePanel'
import Addmedicine from '../AddMedice/Addmedicine'
import InputFeild from '../InputFeild/InputFeild'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const MedicineDetails = () => {
    const{openRightSidePanel, setIsRxShow,isRxShow,setIsAddPatient,setIsPatientSelect,
        medicineList,currentPatient,isCcShow,setIsCcShow,closeRightSidePanel,
        createCcDetails, ccRecordList
    }=useData()
    const handleRx=()=>{
        setIsRxShow(true)
        setIsAddPatient(false)
        setIsPatientSelect(false)
        openRightSidePanel()
    }
    const handleCc=()=>{
        setIsCcShow(!isCcShow)
    }
    const handleClose=()=>{
        setIsCcShow(false)
    }
    // console.log(medicineList);
    let med = currentPatient && currentPatient.patientName && medicineList && medicineList.length >0 ? medicineList.filter((dt)=>currentPatient.patientName == dt?.patient?.patientName) : [];
    let cc = currentPatient && currentPatient.patientName && ccRecordList && ccRecordList.length >0 ? ccRecordList.filter((dt)=>currentPatient.patientName == dt?.patient?.patientName) : [];
    console.log(cc);

    const getCcField =()=>{
        return(
            <div className=''>
            <InputFeild
                    inputRecordType={1}
                    type="text"
                    className='form-control'
                    name='ccDetails'
                    placeHolder=''
                />
                            <div className='row mt-3 ms-3'>
            
                <div className="col-md-12">
                <ButtonComponent className='btn btn-primary' size='sm' onClick={createCcDetails}>Save</ButtonComponent>
                <ButtonComponent className='btn btn-light ms-3' size='sm' onClick={handleClose}>Cancel</ButtonComponent>  
                </div>
            </div>
            </div>
        )
    }
  return (
    <>
    <div className='border row medicineContainer'>
        <div className="col-md-5">
            <div className='border mt-3 minHeight60vh mb-3'>
                <div className="mt-3 ms-3">
                    <h6 className='cursorPointer' onClick={handleCc}>CC</h6>

                    <div className="row mt-3">
                        {cc && cc.length >0 && cc.map((dt)=>
                        <>
                         <div className="col-md-10">
                           {dt.ccDetails}
                         </div>
                        </>
                    )}
                    </div>
                    {
                      isCcShow &&  <div className="row mt-3">
                        <div className="col-md-10">

                       { getCcField()}
                        </div>
                        </div>
                    }
                </div>
            </div>
        </div>
        <div className="col-md-7">
            <div className='border mt-3 minHeight60vh mb-3 pb-3'>
            <div className="mt-3 ms-3">
            <h6 className='cursorPointer' onClick={handleRx} >RX+</h6>
   {   med && med.length > 0  &&  med.map((dt)=> <div>
            <div className="mt-3 row">
                <div className="col-md-1"></div>
                <div className="col-md-2">{dt.medicineType && dt.medicineType }.</div>
                <div className="col-md-4">{dt.medicineName && dt.medicineName}</div>
                <div className="col-md-3">{dt.medicinePower && dt.medicinePower}</div>
            </div>
            <div className="mt-1 row">
                <div className="col-md-3"></div>
                <div className="col-md-4">
                    <div className="row">
                    <div className="col-md-2">{dt.morningMedicine ? dt.morningMedicine :0} </div>
                    <div className="col-md-1"> + </div>
                    <div className="col-md-2">{dt.noonMedicine ? dt.noonMedicine : 0} </div>
                    <div className="col-md-1">+</div>
                    <div className="col-md-2">{dt.eveningMedicine ? dt.eveningMedicine :0} </div>
                    </div>
                </div>
                <div className="col-md-3">{dt.continueMedicine && dt.continueMedicine == 'true' ? 'Continue': dt.days && `${dt.days} days`} </div>
            </div>
            </div>
        )}
            </div>
            </div>
        </div>
    </div>
    {isRxShow && 
    <RightSidePanel title='Add Medicine'>
      <Addmedicine/>
    </RightSidePanel>
    }
    </>
  )
}

export default MedicineDetails