
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MedicalRecords from '../Styles/MedicalRecords';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const Heading = styled.h2`
  text-align: center;
  color: #333;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  width: 280px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h4`
  font-size: 18px;
  color: #007bff;
  margin-bottom: 10px;
`;

const CardContent = styled.div`
  font-size: 14px;
  color: #333;
`;

const MedicalRecordsComponent: React.FC = () => {
  const [medicalrecords, setMedicalRecords] = useState<MedicalRecords | null>(null);
  const [selectedData, setSelectedData] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  
  const medicalRecordsInstance = new MedicalRecords();
  useEffect(() => {
    const fetchData = async () => {
      try{
      await medicalRecordsInstance.fetchMedicalRecords();
      setMedicalRecords(medicalRecordsInstance);
      setSelectedData(medicalRecordsInstance.getMedicalRecords());
      }
      catch(error){
        console.error("Error fetching records:", error);
        setError("Failed to fetch records");
      }
    };

    fetchData();
  }, []);
  
  return (
    <Container>
      <Heading>Medical Records</Heading>

      {selectedData && selectedData.length > 0 ? (
        <CardContainer>
          {selectedData.map((record, index) => (
            <Card key={index}>
              <CardTitle>{record.doctorname}</CardTitle>
              <CardContent>
                <strong>Patient:</strong> {record.patientname} <br />
                <strong>Reason:</strong> {record.reason} <br />
                <strong>Prescription:</strong> {record.prescription}
              </CardContent>
            </Card>
          ))}
        </CardContainer>
      ) : (
        <p>No records available.</p>
      )}
    </Container>
  );
};

export default MedicalRecordsComponent;