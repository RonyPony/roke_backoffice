import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import Swal from 'sweetalert2';
import { NgbdJobListSortableHeader } from './list-sortable.directive';
import { Ticket } from './list.model';
import { TicketService } from './ticket.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

/**
 * Tasks-list component
 */
export class ListComponent implements OnInit {
  modalRef?: BsModalRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  jobListForm!: FormGroup;
  submitted: boolean = false;

  // Table data
  content?: any;
  lists?: Ticket[];
  jobList!: Observable<Ticket[]>;
  total: Observable<number>;
  @ViewChildren(NgbdJobListSortableHeader) headers!: QueryList<NgbdJobListSortableHeader>;
  currentPage: any;

  constructor(private modalService: BsModalService, public service: TicketService, private fb: FormBuilder) {
    // this.jobList = service.jobList$;
    // this.total = service.total$;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Tareas' }, { label: 'Lista de Tareas', active: true }];

    this.jobListForm = this.fb.group({
      description: ['', [Validators.required]],
      ticketTypeId: ['', [Validators.required]],
      contactName: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      contactHasWhatsapp: [false, [Validators.required]]
    });

    this.getAll();
  }

  getAll() {
    this.service.GetAll()
        .subscribe({
          next: (data) => {
            this.lists = data;
          }
        })
  }

  /**
  * Open modal
  * @param content modal content
  */
  openViewModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }

  // Delete Data
  delete(event: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
          event.target.closest('tr')?.remove();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          );
        }
      });
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.submitted = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
  }

  /**
   * Form data get
   */
  get form() {
    return this.jobListForm.controls;
  }

  /**
  * Save user
  */
  saveUser() {
    if (this.jobListForm.valid) {
      this.service.saveTicket(this.jobListForm.value)
          .subscribe({
            next: (data) => {
              this.getAll();
              this.modalService.hide();
            }
          })
    }

    setTimeout(() => {
      this.jobListForm.reset();
    }, 2000);

    this.submitted = true;
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
  }

}
