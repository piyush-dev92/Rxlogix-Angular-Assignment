import { FormControl, FormGroup, Validators } from '@angular/forms';

export class EmployeeFormControlsValidation {
  actionEmployeeControls;
  searchEmployeeControls;

  constructor() {
    //Modal Popup Controls
    this.actionEmployeeControls = new FormGroup({
      name: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      age: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl(''),
    });

    // Search Controls
    this.searchEmployeeControls = new FormGroup({
      name: new FormControl(''),
      roles: new FormControl(''),
      age: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });
  }
}
