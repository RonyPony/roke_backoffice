import { Component } from '@angular/core';
import { Planning } from './list.model';
import { PlanningService } from './planning.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  modalRef?: BsModalRef;
  PlanningListForm!: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;
  currentPage: any;
  constructor(public service: PlanningService, private modalService: BsModalService) {

  }
  planning: Planning[];
  pl: Planning = {
    id: ''
  };
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.planning.push(this.pl)
    this.getAll();
  }

  openViewModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }

  openModal(content: any) {
    this.submitted = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
  }

  /**
  * Form data get
  */
  get form() {
    return this.PlanningListForm.controls;
  }

  /**
  * Save user
  */
  saveUser() {
    if (this.PlanningListForm.valid) {
      this.service.savePlanning(this.PlanningListForm.value)
        .subscribe({
          next: (data) => {
            this.getAll();
            this.modalService.hide();
          }
        })
    }

    setTimeout(() => {
      this.PlanningListForm.reset();
    }, 2000);

    this.submitted = true;
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
  }

  editDataGet(content: any, index: number) {
    this.submitted = false;
    this.isEditing = true;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
    this.setDataToEdit(index);
  }

  setDataToEdit(index: number) {
    this.PlanningListForm.get('id').setValue(this.planning[index].id);
  }
  getAll() {
    console.log("getting Planning");
    this.service.GetAll()
      .subscribe({
        next: (data) => {
          this.planning = data;
        }
      })
  }
}
