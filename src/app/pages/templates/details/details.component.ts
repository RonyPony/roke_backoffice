import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationRoke } from '../new/new.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TemplateService } from "./template.service";
import { ActivatedRoute, Router } from '@angular/router'
import { Template } from './details.model';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  /**
   *
   */
  constructor(private modalService: BsModalService, private TemplateService: TemplateService, private fb: FormBuilder, private route: ActivatedRoute) {

  }



  templateForm!: FormGroup;
  locations: LocationRoke[]
  id: string;
  template: Template;
  async ngOnInit(): Promise<void> {
    this.getTemplateInfo();
    this.loadForm();
  }

  getTemplateInfo() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.TemplateService.GetById(this.id).subscribe({ next: (data) => { this.template = data; console.log(this.template) } })
    });
  }

  loadForm() {
    this.templateForm = this.fb.group({
      name: ['', [Validators.required]],
      branches: ['']
      // status: ['Active', [Validators.required]]
    });
  }
  get form() {
    return this.templateForm.controls;
  }
  saveTemplate() { }

}
