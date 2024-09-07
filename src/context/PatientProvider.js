import React, { createContext, useState } from 'react';

export const PatientContext = createContext();
const PatientProvider = ({ children }) => {
    const [patient,setPatient] = useState()
  
    return ( 
        <PatientContext.Provider value={{ patient, setPatient }}>
            {children}
        </PatientContext.Provider>
    );
};

export default PatientProvider;