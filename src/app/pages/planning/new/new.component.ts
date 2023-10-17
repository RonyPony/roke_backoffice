import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Brigade, Planning, branch } from '../new/list.model';
import { PlanningService } from './planning.service';
import { Month } from './list.model';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Branch } from '../../branches/list/list.model';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService, private planningService: PlanningService, private formBuilder: UntypedFormBuilder) {

  }
  months: Month[]
  planificacion: Planning[]
  brigade: Brigade[]
  PlanningListForm: FormGroup
  SelectedTemplateBranches: any[];
  isEditing: boolean = false;


  ngOnInit(): void {
    this.loadForm();
    this.getAllMonths();
    this.getAllPlanning();
    this.getAllBrigade();
  }

  loadForm() {
    this.PlanningListForm = this.formBuilder.group({
      id: ['']
      // name: ['', [Validators.required]]
    });
  }

  formatString(s: String) {
    return s.toUpperCase()
  }

  getAllMonths() {
    this.planningService.GetAllMonths()
      .subscribe({
        next: (data) => {
          this.months = data;
        }
      })
  }
  getBranches(id: any) {
    // var tmpl = this.PlanningListForm.get('selectedTemplate').value;
    console.log("getting branches of ", id);
    this.planningService.GetAllBranchesByTemplateId(id).subscribe({
      next: (data) => {
        this.SelectedTemplateBranches = data;
        this.SelectedTemplateBranches.forEach(element => {
          console.log("jajaja ");
        });

      }
    });

  }
  getAllPlanning() {
    this.planningService.GetAllPlannings()
      .subscribe({
        next: (data) => {
          console.log("yyy", data)
          this.planificacion = data;
        }
      })
  }

  getAllBrigade() {
    console.log("getting brigade");
    this.planningService.GetAllBrigade()
      .subscribe({
        next: (data) => {
          this.brigade = data;
        }
      })
  }

  savePlanning(idBrigade: any, name: any, idTemplate: any, StartDate: any, finalDate: any, idMonth: any) {
    console.log("linking banches to the new template ", idBrigade.branches)
    this.planningService.savePlanning(name, idBrigade.branches, idTemplate, StartDate, finalDate, idMonth)
      .subscribe({
        next: (data) => {
          console.log("success ", data)
        }
      });
  }

  getTemplateById(id: any) {

    this.planningService.GetAllPlanningsById(id)
      .subscribe({
        next: (data) => {
          console.log("success ", data)
        }
      });
  }



  /**
 * Open modal
 * @param content modal content

 */
  openModal(content: any) {
    // this.submitted = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
    console.log(this.modalRef)
  }


}

