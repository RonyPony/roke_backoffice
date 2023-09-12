import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Template } from '../list/list.model';
import { TemplateService } from './template.service';
import { Month } from './list.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService, private TemplateService: TemplateService) {

  }
  months: Month[]
  planificacion: Template[]

  ngOnInit(): void {
    this.getAllMonths();
  }

  formatString(s: String) {
    return s.toUpperCase()
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

