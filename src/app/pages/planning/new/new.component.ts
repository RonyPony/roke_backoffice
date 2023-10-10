import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Brigade, Planning } from '../new/list.model';
import { PlanningService } from './planning.service';
import { Month } from './list.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService, private planningService: PlanningService) {

  }
  months: Month[]
  planificacion: Planning[]
  brigade: Brigade[]
  PlanningListForm: FormGroup
  isEditing: boolean = false;
  

  ngOnInit(): void {
    this.getAllMonths();
    this.getAllPlanning();
    this.getAllBrigade();
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
  getAllPlanning() {
    this.planningService.GetAllPlannings()
      .subscribe({
        next: (data) => {
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

  savePlanning(idBrigade: any, name: any, idTemplate: any, StartDate: any,finalDate: any ) {
    console.log("linking banches to the new template ", idBrigade.branches)
    this.planningService.savePlanning(name, idBrigade.branches, idTemplate, StartDate, finalDate)
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

