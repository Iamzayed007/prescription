import React, { createElement, useState } from 'react'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import useData from '../../hooks/useData'
import InputFeild from '../InputFeild/InputFeild'

const medicineType = [
    { id: '5', name: 'Select', value: '' },
    { id: '1', name: 'Tablet', value: 'Tab' },
    { id: '2', name: 'Capsule', value: 'Cap' },
    { id: '3', name: 'Injection', value: 'Inj' },
    { id: '4', name: 'Sup', value: 'Sup' },
]
const Addmedicine = () => {
    const [value, setValue] = useState([])
    const { setInputData, inputData, closeRightSidePanel, handleChange,createMedicine,
        iserrors, errors
    } = useData()

    const handleAdd = () => {
        // const section = document.getElementById('medicineForm')
        // const generate = document.getElementById('medicine-section')
        // // console.log(section);
        // let div= document.createElement('div')
        // div.innerHTML= section1
        // console.log(div);
        // generate.appendChild(div)
        return generateSection()

    }
    const section1 = `
    <div className="row mx-3">
    <div className="col-md-3">
    <select name="medicineType" className='form-control'>
        {medicineType.map((dt)=>
        <option key={dt.id} value={dt.value}>{dt.name}</option>
    )}
    </select>
    </div>
    <div className="col-md-8">
        <input type="text" className='form-control' />
    </div>
    </div>
    <div className="row mt-3 mx-3">
        <div className="col-md-4"> <input type="text" className='form-control' /></div>
        <div className="col-md-4"> <input type="text" className='form-control' /></div>
        <div className="col-md-4"> <input type="text" className='form-control' /></div>
    </div>
    <div className="row mt-3 mx-3">
        <div className="col-md-4"> <input type="text" className='form-control' /></div>
        <div className="col-md-4"> <input type="checkbox"  name='continue'/> 
        <label className='ms-3'>Continue</label>
        </div>

    </div>`
    let errorsClassName= 'border-danger' 
    const generateSection = () => {
        return (<div id='medicine-section'>
            <div className="row mx-3">
                <div className="col-md-3">
                    <InputFeild inputRecordType={2} type="text" className={`form-control  ${errors?.medicineType && errorsClassName}`} name='medicineType'
                        selectOptions={medicineType}
                    />
                </div>
                <div className="col-md-6">
                    <InputFeild inputRecordType={1} type="text" className={`form-control  ${errors?.medicineName && errorsClassName}`} name='medicineName' placeHolder='Medicine Name' />
                </div>
                <div className="col-md-3">
                    <InputFeild inputRecordType={1} type="text" className={`form-control  ${errors?.medicinePower && errorsClassName}`} name='medicinePower' placeHolder='Mg/L' />
                </div>
            </div>
            <div className="row mt-3 mx-3">
                <div className="col-md-4"> <InputFeild inputRecordType={1} type="number" className='form-control' name='morningMedicine' placeHolder='Morning' /> </div>
                <div className="col-md-4"> <InputFeild inputRecordType={1} type="number" className='form-control' name='noonMedicine' placeHolder='Noon' /></div>
                <div className="col-md-4"> <InputFeild inputRecordType={1} type="number" className='form-control' name='eveningMedicine' placeHolder='Evening' /></div>
            </div>
            <div className="row mt-3 mx-3">
                <div className="col-md-4"> <InputFeild
                    inputRecordType={1}
                    type="number"
                    className='form-control'
                    name='days'
                    placeHolder='Days'
                // isDisable={inputData && inputData.continueMedicine && inputData.continueMedicine === true ? true : false }
                /></div>
                <div className="col-md-4"> <InputFeild
                    inputRecordType={3}
                    type="checkbox"
                    // className='form-control'
                    name='continueMedicine'
                    placeHolder='Continue'
                />
                </div>

            </div>
        </div>)
    }
    return (
        <div>
            <div id='medicineForm'>
                {generateSection()}
            </div>
            <div className='row mt-3 ms-3'>
                {/* <div className="col-md-4">
                    <ButtonComponent size='sm' className='btn-danger' onClick={handleAdd} >+</ButtonComponent>
                </div> */}
                <div className="col-md-6">
                <ButtonComponent className='btn btn-primary' onClick={createMedicine}>Save</ButtonComponent>
                <ButtonComponent className='btn btn-light ms-3' onClick={closeRightSidePanel}>Cancel</ButtonComponent>  
                </div>
            </div>

        </div>
    )
}

export default Addmedicine