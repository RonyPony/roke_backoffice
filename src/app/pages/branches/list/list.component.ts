import { Component } from '@angular/core';
import { Branch } from './list.model';
import { BranchService } from './branch.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  modalRef?: BsModalRef;
  submitted: boolean = false;
  templateForm!: FormGroup;
  isEditing: boolean = false;
  currentPage: any;
  constructor(public service: BranchService, private modalService: BsModalService, private formBuilder: UntypedFormBuilder) {

  }
  branches: Branch[];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadForm();
    this.getAll();

  }

  loadForm() {
    this.templateForm = this.formBuilder.group({
      id: '',
      sucursal: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      contactName: ['', [Validators.required]],
      status: '0',
      contactNumber: ['', [Validators.required]]
    });
  }

  openModal(content: any) {
    this.templateForm.reset();
    this.loadForm();
    this.submitted = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
  }

  /**
  * Form data get
  */
  get form() {
    return this.templateForm.controls;
  }

  /**
  * Save user
  */
  saveUser() {

    console.log(this.templateForm)

    if (this.templateForm.valid) {
      this.service.saveBranch(this.templateForm.value)
        .subscribe({
          next: (data) => {
            console.log(data)
            this.getAll();
            this.modalService.hide();
          }
        })
    }

    // setTimeout(() => {
    //   this.templateForm.reset();
    // }, 2000);

    this.submitted = true;
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
  }

  editDataGet(content: any, index: any) {
    console.log(index)
    this.submitted = false;
    this.isEditing = true;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
    this.setDataToEdit(index);
  }

  setDataToEdit(index: any) {
    var branch = this.branches.find((e) => e.id === index)
    this.templateForm.get('id').setValue(branch.id);
    this.templateForm.get('sucursal').setValue(branch.sucursal);
    this.templateForm.get('longitude').setValue(branch.longitude);
    this.templateForm.get('contactName').setValue(branch.contactName);
    this.templateForm.get('contactNumber').setValue(branch.contactNumber);
    this.templateForm.get('latitude').setValue(branch.latitude);
    this.templateForm.get('longitude').setValue(branch.longitude);
    this.templateForm.get('status').setValue(branch.status);
  }
  getAll() {
    console.log("getting branches");
    this.service.GetAll()
      .subscribe({
        next: (data) => {
          this.branches = data;
        }
      })
  }
}
