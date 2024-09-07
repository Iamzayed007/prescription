
import { Col, Row } from 'react-bootstrap';
import './App.css';
import LeftSidebar from './components/LeftSideBar/LeftSidebar';
import DataProvider from './context/DataProvider';
import PatientProvider from './context/PatientProvider';
import Prescription from './views/Prescription/Prescription';

function App() {

  return (
    <DataProvider>
      <div className='container mt-5' >
        <PatientProvider>
          <Row>
            <Col md={2}>
              <LeftSidebar />

            </Col>

            <Col md={9}>
              <Prescription />

            </Col>
            <Col md={1}>


            </Col>
          </Row>
        </PatientProvider>
      </div>
    </DataProvider>
  );
}

export default App;
