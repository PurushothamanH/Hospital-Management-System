

import axios from 'axios';

interface Appointment {
  doctorId: number;
  userid: number;
  doctorname: string;
  patientname: string;
  reason: string;
  prescription: string;
}

interface MedicalData {
  reports: Appointment[];
}

class MedicalRecords {
  private data: MedicalData;
  private loading: boolean = true;
  private error: string | null = null;

  constructor() {
    this.data = {
      reports: [],
    };
  }

  public async fetchMedicalRecords() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'No token found';
      this.loading = false;
      return;
    }

    try {
      const response = await axios.get('https://localhost:7003/api/Report/getreport', {
        headers: { Authorization: `Bearer ${token}` },
      });

      this.data.reports = response.data;
      this.loading = false;
    } catch (error) {
      console.error('Error fetching medical records:', error);
      this.error = 'Error fetching medical records';
      this.loading = false;
    }
  }

  public getMedicalRecords() {
    return this.data.reports;
  }

  public getLoadingStatus() {
    return this.loading;
  }

  public getErrorMessage() {
    return this.error;
  }
}

export default MedicalRecords;
