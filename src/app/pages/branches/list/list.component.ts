import { Component } from '@angular/core';
import { Branch } from './list.model';
import { BranchService } from './branch.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  modalRef?: BsModalRef;
  branchListForm!:FormGroup;
  submitted: boolean = false;
  currentPage: any;
  constructor(public service: BranchService,private modalService: BsModalService){

  }
branches:Branch[];

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
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
    return this.branchListForm.controls;
  }

  /**
  * Save user
  */
  saveUser() {
    if (this.branchListForm.valid) {
      this.service.saveBranch(this.branchListForm.value)
        .subscribe({
          next: (data) => {
            this.getAll();
            this.modalService.hide();
          }
        })
    }

    setTimeout(() => {
      this.branchListForm.reset();
    }, 2000);

    this.submitted = true;
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
  }

  getAll() {
    this.service.GetAll()
      .subscribe({
        next: (data) => {
          this.branches = data;
        }
      })
  }
}
