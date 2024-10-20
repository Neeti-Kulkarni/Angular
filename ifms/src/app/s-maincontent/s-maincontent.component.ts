import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-s-maincontent',
  templateUrl: './s-maincontent.component.html',
  styleUrl: './s-maincontent.component.css'
})
export class SMaincontentComponent {
  attendanceDate: any;
  attendanceStatus: any;

  constructor(private http: HttpClient) {}

  saveAttendance() {
    // Collect data from the form
    const dateInput = <HTMLInputElement>document.getElementById('attendance-date');
    const presentInput = <HTMLInputElement>document.getElementById('present');
    const absentInput = <HTMLInputElement>document.getElementById('absent');

    this.attendanceDate = dateInput.value;
    this.attendanceStatus = presentInput.checked ? 'present' : absentInput.checked ? 'absent' : '';

    // Create attendance object
    const attendanceData = {
      date: this.attendanceDate,
      status: this.attendanceStatus
    };

    // Send data to the backend
    this.http.post('http://your-api-endpoint/attendance', attendanceData)
      .subscribe(response => {
        console.log('Attendance saved successfully:', response);
        // Optionally reset the form here
      }, error => {
        console.error('Error saving attendance:', error);
      });
  }
}
