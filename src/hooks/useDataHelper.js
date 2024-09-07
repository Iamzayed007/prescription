import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";
import html2canvas from 'html2canvas';

const initialValue={
    name: '',
    continueMedicine: false
}
const useDataHelper=()=>{
    let record =localStorage.getItem('patientList')?JSON.parse(localStorage.getItem('patientList')):[]
    let medicineRecord =localStorage.getItem('medicineList')?JSON.parse(localStorage.getItem('medicineList')):[]
    let ccRecord =localStorage.getItem('ccRecordList')?JSON.parse(localStorage.getItem('ccRecordList')):[]
   
   
    const [patientList,setPatientList]=useState(record)
    const [medicineList,setMedicineList]=useState(medicineRecord)
    const [ccRecordList,setCcRecordList]=useState(ccRecord)
    const [currentPatient,setCurrentPatient]=useState()
    const [inputData,setInputData] =useState({})
    const [errors,setErrors] =useState({})



    const [leftSidePanel,setLeftSidePanel]=useState(false)
    const [rightSidePanel,setRightSidePanel]=useState(false)
    const [isAddPatient, setIsAddPatient] = useState(false)
    const [isPatientSelect, setIsPatientSelect] = useState(false)
    const [isRxShow, setIsRxShow] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [isCcShow, setIsCcShow] = useState(false)
    const [iserrors,setIsErrors] =useState(false)

    const contentRef = useRef()

//     useEffect(()=>{
//    setInputData({...inputData,
//     continueMedicine:  isContinue
// })
//     },[isContinue])

    useEffect(()=>{
        localStorage.setItem('patientList',JSON.stringify(patientList))
        
        localStorage.setItem('medicineList',JSON.stringify(medicineList))
        localStorage.setItem('ccRecordList',JSON.stringify(ccRecordList))
    },[patientList,medicineList,ccRecordList])





   const openRightSidePanel=()=>{
    setRightSidePanel(true)
   }

   const handleChange=(e,inputName)=>{
    setInputData({
        ...inputData,
        [inputName]:  e.target.value
})  
    if (errors[inputName]) {
       setErrors({
        ...errors,
        [inputName]: false
       })
    }
    console.log(errors[inputName]);
   }

   const handleCheck=(e,inputName,check)=>{
     setIsChecked(!isChecked)
        setInputData({
            ...inputData,
            [inputName]:  e.target.value
    }) 
   }
   const handleErrors=(inputName)=>{
    console.log(inputName);
        setErrors({
            ...errors,
            [inputName]:  true
    }) 
    setIsErrors(true)
    console.log(errors);
   }
   const closeRightSidePanel=()=>{
    setRightSidePanel(false)
    setIsAddPatient(false)
    setIsPatientSelect(false)
    setIsRxShow(false)
   }
   const closeLeftSidePanel=()=>{
    setLeftSidePanel(false)
   }
   const createPatient=()=>{
    setPatientList([...patientList,
        inputData
    ])
    setCurrentPatient({
        patientName: inputData.name,
        age: inputData.age
    })
    console.log('ok',patientList);
    localStorage.setItem('patientList',JSON.stringify(patientList))
    setInputData({})
    closeRightSidePanel()
   }
   const createCcDetails=()=>{
    let cc={
        ccDetails: inputData.ccDetails,
        patient: currentPatient
    }
    if(currentPatient == undefined || currentPatient == null){
        alert('Select A Patient First')
    }else{
    setCcRecordList([...ccRecordList,
        cc,
    ])
    localStorage.setItem('ccRecordList',JSON.stringify(ccRecordList))
    setInputData({})
    setIsCcShow(false)
}


   }
   const createMedicine=()=>{
    let medicine={
        continueMedicine: inputData.continueMedicine,
        medicineType: inputData.medicineType,
        medicineName: inputData.medicineName,
        medicinePower: inputData.medicinePower,
        morningMedicine: inputData.morningMedicine,
        noonMedicine: inputData.noonMedicine,
        eveningMedicine: inputData.eveningMedicine,
        days: inputData.days,
        date: new Date(),
        patient: currentPatient
    }
    if(currentPatient == undefined || currentPatient == null){
        alert('Select A Patient First')
    }
    else if (medicine.medicineType == undefined || medicine.medicineName == undefined ||
      medicine.medicinePower == undefined
    ) {
        handleErrors('medicineType')
    }
    else if ( medicine.medicineName == undefined 
    ) {
        handleErrors('medicineName')
    }
    else if ( 
      medicine.medicinePower == undefined
    ) {
        handleErrors('medicinePower')
    }
    else{
    setMedicineList([...medicineList,
        medicine,
    ])
    localStorage.setItem('medicineList',JSON.stringify(medicineList))
    setInputData({})
    setIsChecked(false)
    closeRightSidePanel()
}


   }

   const selectCurrentPatient=(currentPatient)=>{
    // console.log(currentPatient);
    setCurrentPatient({
        patientName: currentPatient.name,
        age: currentPatient.age
    })
    closeRightSidePanel()
   }



//    const generatePDF = async () => {
//     const content = contentRef.current;
//     const canvas = await html2canvas(content);
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF();
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//     const margin = 80
//     const contentWidth = pdfWidth - 20; 
//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`z.pdf`);
//   };

const generatePDF = async () => {
    const content = contentRef.current;
    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 80;
    
    // Define the content width and height
    const contentWidth = pdfWidth - 2 * margin;
    const contentHeight = canvas.height * (contentWidth / canvas.width);
  
    // Calculate image dimensions
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = imgProps.width;
    const imgHeight = imgProps.height;
  
    // Calculate the scaling ratio to fit the content within the margins
    const ratio = contentWidth / imgWidth;
    const imgScaledWidth = imgWidth * ratio;
    const imgScaledHeight = imgHeight * ratio;
  
    // Calculate the position to center the image within the margins
    const x = margin;
    const y = (pdfHeight - imgScaledHeight) / 2;
  
    pdf.addImage(imgData, 'PNG', x, y, imgScaledWidth, imgScaledHeight);
    pdf.save(`s.pdf`);
  };

    return {
        patientList,
        rightSidePanel,
        inputData,
        isAddPatient,
        currentPatient,
        isPatientSelect,
        isRxShow,
        isChecked,
        medicineList,
        isCcShow,
        leftSidePanel,
        ccRecordList,
        errors,
        iserrors,


        contentRef,



        setIsErrors,
        setPatientList,
        setRightSidePanel,
        setInputData,
        setIsAddPatient,
        setCurrentPatient,
        setIsPatientSelect,
        setIsRxShow,
        setIsChecked,
        setMedicineList,
        setIsCcShow,
        setLeftSidePanel,
        setCcRecordList,
        setErrors,

        createPatient,
        openRightSidePanel,
        closeRightSidePanel,
        selectCurrentPatient,
        handleChange,
        handleCheck,
        createMedicine,
        closeLeftSidePanel,
        createCcDetails,
        generatePDF


    }
   
}

export default useDataHelper;