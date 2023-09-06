import { Component } from '@angular/core';
import { Inventory } from './list.model';
import { InventoryService } from './inventory.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  modalRef?: BsModalRef;
  InventoryListForm!: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;
  currentPage: any;
  constructor(public service: InventoryService, private modalService: BsModalService) {

  }
  Inventory: Inventory[];

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
    return this.InventoryListForm.controls;
  }

  /**
  * Save user
  */
  saveUser() {
    if (this.InventoryListForm.valid) {
      this.service.saveInventory(this.InventoryListForm.value)
        .subscribe({
          next: (data) => {
            this.getAll();
            this.modalService.hide();
          }
        })
    }

    setTimeout(() => {
      this.InventoryListForm.reset();
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
    this.InventoryListForm.get('id').setValue(this.Inventory[index].id);
  }
  getAll() {
    console.log("getting Inventory");
    this.service.GetAll()
      .subscribe({
        next: (data) => {
          this.Inventory = data;
        }
      })
  }
}
