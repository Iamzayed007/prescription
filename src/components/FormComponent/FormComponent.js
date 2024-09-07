import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import useData from '../../hooks/useData'
import { EnumInputRecordTypes } from '../../enums/enumInputRecordTypes'

const FormComponent = (props) => {
    const {formData ,handleSubmit} = props
    const {setInputData ,inputData,closeRightSidePanel,handleChange } = useData()

    // const handleChange =(e,name)=>{
    //  switch (name) {
    //     case 'name':
    //         setInputData({
    //             ...inputData,
    //             name: e.target.value
    //           })
    //         break;
    //     case 'age':
    //         setInputData({
    //             ...inputData,
    //             age: e.target.value
    //           })
    //         break;
     
    //     default:
    //         break;
    //  }
    //  console.log(inputData);
    // }
    const handleClose =()=>{
            setInputData({})
            closeRightSidePanel()
    }
    const getFeild =(dt)=>{
      switch (dt.inputRecordType) {
        case EnumInputRecordTypes.Select:
             return (
              <select name={dt.name} className={dt.className}
              onChange={(e)=>handleChange(e,dt.name)}
              >
                  {dt.selectOptions.map((dt)=>
                  <option key={dt.id} value={dt.value}>{dt.name}</option>
              )}
              </select>
             )
          break;
          case EnumInputRecordTypes.Input:
            return (<input type={dt.type} name={dt.name} className={dt.className} placeholder={dt.placeHolder} onChange={(e)=>handleChange(e,dt.name)} />)
            break;
      
        default:
          break;
    }
  }
  return (
    <div>

        {
            formData && formData.length >0 && formData.map((dt)=> getFeild(dt))
        }
        <div className='d-flex mt-5'>
        <button className='btn btn-primary' onClick={handleSubmit}>Save</button>
        <button className='btn btn-light ms-3' onClick={handleClose}>Cancel</button>
        </div>
    </div>
  )
    }

export default FormComponent;