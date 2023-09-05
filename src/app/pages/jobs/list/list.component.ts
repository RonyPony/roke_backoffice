import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import Swal from 'sweetalert2';

import { UserService } from './list.service';
import { NgbdJobListSortableHeader } from './list-sortable.directive';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [UserService, DecimalPipe]
})

/**
 * List Component
 */
export class ListComponent implements OnInit {
  modalRef?: BsModalRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  userForm!: FormGroup;
  submitted: boolean = false;

  // Table data
  content?: any;
  lists?: User[];
  jobList!: Observable<User[]>;
  total: Observable<number>;
  @ViewChildren(NgbdJobListSortableHeader) headers!: QueryList<NgbdJobListSortableHeader>;
  currentPage: any;
  isEditing: boolean = false;

  constructor(private modalService: BsModalService, public service: UserService, private fb: FormBuilder) {
    // this.jobList = service.jobList$;
    // this.total = service.total$;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Trabajadores' }, { label: 'Lista de Trabajadores', active: true }];

    this.userForm = this.fb.group({
      id: [0],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      contacto: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      status: ['Active', [Validators.required]]
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
  deleteUser(index: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Estas seguro que desea eliminar este registro?',
        text: 'Esto no se podra revertir',
        icon: 'warning',
        confirmButtonText: 'Si, Eliminar!',
        cancelButtonText: 'No, Cancelar!',
        showCancelButton: true
      })
      .then(result => {
        this.service.deleteUser(this.lists[index].id)
        .subscribe({
          next: () => { }
        })
        if (result.value) {
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Registro ha sido eliminado.',
            'success'
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
    this.isEditing = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
  }

  editDataGet(content: any, index: number) {
    this.submitted = false;
    this.isEditing = true;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
    this.setDataToEdit(index);
  }

  setDataToEdit(index: number) {
    this.userForm.get('id').setValue(this.lists[index].id);
    this.userForm.get('nombre').setValue(this.lists[index].nombre);
    this.userForm.get('apellido').setValue(this.lists[index].apellido);
    this.userForm.get('username').setValue(this.lists[index].username);
    this.userForm.get('password').setValue(this.lists[index].password);
    this.userForm.get('cedula').setValue(this.lists[1].cedula);
    this.userForm.get('contacto').setValue(this.lists[index].contacto);
    this.userForm.get('rol').setValue(this.lists[index].rol);
  }

  /**
   * Form data get
   */
  get form() {
    return this.userForm.controls;
  }

  /**
  * Save user
  */
  saveUser() {
    if (this.userForm.valid) {
      if (!this.isEditing) {
        this.service.saveUser(this.userForm.value)
          .subscribe({
            next: (data) => {
              this.getAll();
              this.modalService.hide();
            }
          });
      } else {
        this.service.editUser(1, this.userForm.value)
          .subscribe({
            next: (data) => {
              this.getAll();
              this.modalService.hide();
            }
          });
      }
    }

    this.submitted = true;
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
  }

}
