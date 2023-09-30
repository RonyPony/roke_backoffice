import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Planning } from '../new/list.model';
import { PlanningService } from './planning.service';
import { Month } from './list.model';

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

  ngOnInit(): void {
    this.getAllMonths();
    this.getAllPlanning();
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

