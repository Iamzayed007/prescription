import React from 'react'
import useData from '../../hooks/useData'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const TableComponent = () => {
    const {patientList, selectCurrentPatient} =useData()
  return (
    <table className='table table-striped'>
        <thead>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
        </thead>
        <tbody>
            {
                patientList && patientList.length>0 && patientList.map((dt)=>
                <tr>
                    <td>{dt.name} </td>
                    <td>{dt.age} </td>
                    <td> <ButtonComponent size='sm' className='btn-success' onClick={()=>selectCurrentPatient(dt)}>Select</ButtonComponent> </td>
                </tr>
            )
            }
        </tbody>

    </table>
  )
}

export default TableComponent