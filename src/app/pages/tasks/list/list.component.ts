import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UntypedFormGroup, Validators, FormBuilder } from '@angular/forms';

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
  jobListForm!: UntypedFormGroup;
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
    this.breadCrumbItems = [{ label: 'Jobs' }, { label: 'Jobs List', active: true }];

    this.jobListForm = this.fb.group({
      description: ['', [Validators.required]],
      ticketTypeId: ['3fa85f64-5717-4562-b3fc-2c963f66afa6', [Validators.required]],
      contactName: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      contactHasWhatsapp: ['', [Validators.required]]
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
      if (this.jobListForm.get('ids')?.value) {
        // this.service.products = JobListdata.map((data: { id: any; }) => data.id === this.jobListForm.get('ids')?.value ? { ...data, ...this.jobListForm.value } : data)
      } else {
        const title = this.jobListForm.get('title')?.value;
        const name = this.jobListForm.get('name')?.value;
        const location = this.jobListForm.get('location')?.value;
        const experience = this.jobListForm.get('experience')?.value;
        const position = this.jobListForm.get('position')?.value;
        const type = this.jobListForm.get('type')?.value;
        const posted_date = "02 June 2021";
        const last_date = "25 June 2021";
        const status = this.jobListForm.get('status')?.value;
        // JobListdata.push({
        //   id: this.lists.length + 1,
        //   title,
        //   name,
        //   location,
        //   experience,
        //   position,
        //   type,
        //   type_color: "success",
        //   posted_date,
        //   last_date,
        //   status,
        //   status_color: "success"
        // });
      }
    }
    this.modalService.hide();
    setTimeout(() => {
      this.jobListForm.reset();
    }, 2000);
    this.submitted = true
  }

  /**
   * Open Edit modal
   * @param content modal content
   */
  // editDataGet(id: any, content: any) {
  //   this.submitted = false;
  //   this.modalRef = this.modalService.show(content, { class: 'modal-md' });
  //   var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
  //   modelTitle.innerHTML = 'Edit Order';
  //   var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
  //   updateBtn.innerHTML = "Update";
  //   var listData = this.lists.filter((data: { id: any; }) => data.id === id);
  //   this.jobListForm.controls['title'].setValue(listData[0].title);
  //   this.jobListForm.controls['name'].setValue(listData[0].name);
  //   this.jobListForm.controls['location'].setValue(listData[0].location);
  //   this.jobListForm.controls['experience'].setValue(listData[0].experience);
  //   this.jobListForm.controls['position'].setValue(listData[0].position);
  //   this.jobListForm.controls['type'].setValue(listData[0].type);
  //   this.jobListForm.controls['status'].setValue(listData[0].status);
  //   this.jobListForm.controls['ids'].setValue(listData[0].id);
  // }

  pageChanged(event: any) {
    this.currentPage = event.page;
  }

}
