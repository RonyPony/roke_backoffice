import { Component } from '@angular/core';
import { RawPlanning } from './list.model';
import { PlanningService } from './planning.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup } from '@angular/forms';
import { switchMapTo } from 'rxjs';

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
  planning: RawPlanning[][] = [];
  hasPlanning:boolean=false;
  ngOnInit(): void {
    this.getAll();
  }


  openViewModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }

  getStatus(sts){
    switch (sts) {
      case 0:
        return "Activa";
        break;

      default:
        break;
    }
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
    // this.PlanningListForm.get('id').setValue(this.planning[index].id);
  }
  getAll() {
    this.service.GetAll()
      .subscribe({
        next: (data) => {
          for(var index in data)
            {
                this.planning.push(data[index]);
                console.log("planning ",this.planning);  // output: Apple Orange Banana
            }
          // this.planning = data;
          this.hasPlanning = data.length>=1;
        }
      })
  }
}
