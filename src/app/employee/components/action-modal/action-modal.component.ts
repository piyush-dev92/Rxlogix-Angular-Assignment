import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { rolesList } from '../../constants/employee-details.constants';
import { EmployeeFormControlsValidation } from '../../form-controls/employee-form-controls';
import { EmployeeDetails } from '../../interfaces/employee-details.interfaces';

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss'],
})
export class ActionModalComponent implements OnInit {
  @Input()
  public actionType!: string;
  @Input()
  public viewEmployeeDetails!: EmployeeDetails;
  @Output()
  public emitEmployeeDetails = new EventEmitter();
  @Output()
  public emitCloseModal = new EventEmitter();
  public actionUserDetails!: FormGroup;
  public rolesList = rolesList;

  constructor(){
    this.actionUserDetails = new EmployeeFormControlsValidation().actionEmployeeControls;
  }

  ngOnInit(): void {
    if (this.actionType === 'edit') {
      this.actionUserDetails.patchValue(this.viewEmployeeDetails);
    }
  }
  public closeModal(): void {
    this.emitCloseModal.emit(false);
  }
  public actionDetails(index: number) {
    const { name, role, age, startDate, endDate } =
      this.actionUserDetails.controls;
    let employeeDetail = {
      i: index,
      name: name.value,
      role: role.value,
      age: age.value,
      startDate: startDate.value,
      endDate: endDate.value,
    };
    this.emitEmployeeDetails.emit(employeeDetail);
  }
}
