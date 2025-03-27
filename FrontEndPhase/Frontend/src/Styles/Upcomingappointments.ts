import axios from 'axios';

interface Appointment {
  doctorname: string;
  patientname: string;
  appointmentDate: string;
  reason: string;
}

interface MedicalRecord {
  doctorname: string;
  patientname: string;
  reason: string;
  prescription: string;
}

interface DashboardData {
  upcomingAppointments: Appointment[] | null;
  pastAppointments: Appointment[] | null;
  reports: MedicalRecord[] | null;
}

class Upcomingappointments {
  private data: DashboardData;
  private loading: boolean;
  private error: string | null;

  constructor() {
    this.data = {
      upcomingAppointments: null,
      pastAppointments: null,
      reports: null,
    };
    this.loading = true;
    this.error = null;
  }

  public async fetchDashboardData() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'No token found';
      this.loading = false;
      return;
    }

    try {
      const response = await axios.get('https://localhost:7003/api/Dashboard/userdashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });

      this.data.upcomingAppointments = response.data.upcomingAppointments || null;
      this.data.pastAppointments = response.data.pastAppointments || null;
      this.data.reports = response.data.reports || null;
      this.loading = false;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      this.error = 'Error fetching data';
      this.loading = false;
    }
  }

  public getDashboardData() {
    return this.data;
  }

  public getLoadingStatus() {
    return this.loading;
  }

  public getErrorMessage() {
    return this.error;
  }
}

export default Upcomingappointments;
