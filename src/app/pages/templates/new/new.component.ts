import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Template } from '../list/list.model';
import { TemplateService } from './template.service';
import { LocationRoke, Month } from './new.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService, private TemplateService: TemplateService, private fb: FormBuilder) {

  }
  months: Month[]
  planificacion: Template[]
  searchingLocations = true
  templateForm!: FormGroup;
  locations: LocationRoke[]
  isEditing: boolean = false;
  submitted: boolean = false;

  ngOnInit(): void {
    this.getAllMonths();
    this.getAllLocations();
    this.loadForm();
  }

  loadForm() {
    this.templateForm = this.fb.group({
      id: [0],
      sucursal: ['', [Validators.required]],
      status: ['Active', [Validators.required]]
    });
  }

  formatString(s: String) {
    return s.toUpperCase()
  }

  getAllLocations() {
    this.TemplateService.GetAllLocations().subscribe({ next: (data) => { this.locations = data; this.searchingLocations = false } })
  }

  get form() {
    return this.templateForm.controls;
  }

  saveTemplate() {
    console.log("saving template ...")
    if (this.templateForm.valid) {
      if (!this.isEditing) {
        this.TemplateService.saveTemplate(this.templateForm.value)
          .subscribe({
            next: (data) => {
              console.log("success")
            }
          });
      } else {
        this.TemplateService.saveTemplate(this.templateForm.value)
          .subscribe({
            next: (data) => {
              console.log("success")
            }
          });
      }
    }

    this.submitted = true;
  }

  getAllMonths() {
    this.TemplateService.GetAllMonths()
      .subscribe({
        next: (data) => {
          this.months = data;
        }
      })
  }

  /**
 * Open modal
 * @param content modal content
 */
  openModal(content: any) {
    // this.submitted = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
  }

}

