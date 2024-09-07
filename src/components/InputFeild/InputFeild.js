import React from 'react'
import { EnumInputRecordTypes } from '../../enums/enumInputRecordTypes'
import useData from '../../hooks/useData'
import { isDisabled } from '@testing-library/user-event/dist/utils'

const InputFeild = (props) => {
    const {setInputData ,inputData,closeRightSidePanel,handleChange,isChecked ,handleCheck} = useData()

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
            return (
            <input type={dt.type} name={dt.name} className={dt.className} placeholder={dt.placeHolder} onChange={(e)=>handleChange(e,dt.name)}
            disabled={dt.isDisable}
            />)
            break;
          case EnumInputRecordTypes.Checkbox:
            console.log(isChecked);
            return (<>
            <input type={dt.type} name={dt.name} checked={isChecked === true ? true :false } onChange={(e)=>handleCheck(e,dt.name,isChecked)}
            value={isChecked ? false : true}
            />
                    <label className='ms-3'>{dt.placeHolder}</label>
            </>)
            break;
      
        default:
          break;
    }
  }
  return (
    <div>

        {
             getFeild(props)
        }
 
    </div>
  )
    
}

export default InputFeild