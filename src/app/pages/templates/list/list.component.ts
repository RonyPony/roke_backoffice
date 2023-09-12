import { Component } from '@angular/core';
import { Template } from './list.model';
import { TemplateService } from './template.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  modalRef?: BsModalRef;
  TemplateListForm!: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;
  currentPage: any;
  constructor(public service: TemplateService, private modalService: BsModalService) {

  }
  Template: Template[];
  pl: Template = {
    id: ''
  };
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.Template.push(this.pl)
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
    return this.TemplateListForm.controls;
  }

  /**
  * Save user
  */
  saveUser() {
    if (this.TemplateListForm.valid) {
      this.service.saveTemplate(this.TemplateListForm.value)
        .subscribe({
          next: (data) => {
            this.getAll();
            this.modalService.hide();
          }
        })
    }

    setTimeout(() => {
      this.TemplateListForm.reset();
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
    this.TemplateListForm.get('id').setValue(this.Template[index].id);
  }
  getAll() {
    console.log("getting Template");
    this.service.GetAll()
      .subscribe({
        next: (data) => {
          this.Template = data;
        }
      })
  }
}
