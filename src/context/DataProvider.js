import React, { createContext } from 'react';
import useDataHelper from '../hooks/useDataHelper';

export const DataContext = createContext();
const DataProvider = ({ children }) => {
    const allData = useDataHelper()
  
    return ( 
        <DataContext.Provider value={allData}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;