import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Planning } from '../list/list.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService) {

  }
  months: String[]
  planificacion: Planning[]
  ngOnInit(): void {
    this.months = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre"
    ];
    this.planificacion.push(

    )
  }
  formatString(s: String) {
    return s.toUpperCase()
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

