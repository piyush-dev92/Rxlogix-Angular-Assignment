import { Component, OnInit } from '@angular/core';
import { employeeDetails, rolesList } from './constants/employee-details.constants';
import { FormGroup } from '@angular/forms';
import { EmployeeFormControlsValidation } from './form-controls/employee-form-controls';
import { EmployeeDetails } from './interfaces/employee-details.interfaces';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
  public actionType!: string;
  public viewEmployeeDetails!: EmployeeDetails;
  public searchForm!: FormGroup;
  public employeeList!: EmployeeDetails[];
  public rolesList = rolesList;

  private _employeeList = employeeDetails;
  private _isOpen = false;

  get isOpen(): boolean {
    return this._isOpen;
  }

  constructor(){
    this.searchForm = new EmployeeFormControlsValidation().searchEmployeeControls;
  }
  ngOnInit() {
    this.employeeList = this._employeeList;
  }
  public opneActionEmployeeModal(type: string, index?: number): void {
    this._isOpen = true;
    this.actionType = type;
    if (type === 'edit') {
      this.viewEmployeeDetails = {
        ...this.employeeList[index || 0],
        i: index,
      };
    }
  }
  public getEmployeeDetails(event: EmployeeDetails): void {
    if (this.actionType === 'add') {
      this._employeeList.push(event);
    } else {
      const index = event.i || 0;
      this._employeeList.splice(index, 1, event);
    }
    this._isOpen = false;
  }

  public getCloseModalValue(event: boolean) {
    this._isOpen = event;
  }

  public getIndex(i: number): number {
    return i + 1;
  }

  public deleteEmployeeDetails(i: number): void {
    this.employeeList.splice(i, 1);
  }

  public getRoleName(value: number) {
    return this.rolesList.find((resp) => resp.value === Number(value))?.label;
  }

  public searchFilter() {
    const { name, roles, age, startDate, endDate } = this.searchForm.controls;
    this.employeeList = this._employeeList.filter((resp: EmployeeDetails) =>
      (name.value === '' || resp.name?.toLowerCase()?.includes(name.value?.toLowerCase())) &&
      (roles.value === '' || resp.role == roles.value) &&
      (age.value === '' || resp.age == age.value) &&
      (startDate.value === '' || resp.startDate == startDate.value) &&
      (endDate.value === '' || resp.endDate == endDate.value)
    );
  }

  public clearSearcFilter(){
    this.searchForm.reset();
    this.employeeList = this._employeeList;
  }
}
