import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BrigadeService } from '../brigade.service';
import { Brigade, BrigadeUser } from './list.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  modalRef?: BsModalRef;
  submitted: boolean = false;
  brigadeForm!: FormGroup;
  technichian: BrigadeUser[];
  isEditing: boolean = false;
  currentPage: any;
  constructor(public service: BrigadeService, private modalService: BsModalService, private formBuilder: UntypedFormBuilder) {

  }
  brigade: Brigade[];


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadForm();
    this.getAll();
    this.loadTech();
   
   
  }

  loadTech() {
    console.log("tech")
    this.service.GetAllTech().subscribe({
      next:(data)=>{
        this.technichian = data;
      }
    })
  }

  loadForm() {
    this.brigadeForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      technichian: ['']
    });
  }

  openModal(content: any) {
    this.brigadeForm.reset();
    this.loadForm();
    this.submitted = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
  }

  /**
  * Form data get
  */
  get form() {
    return this.brigadeForm.controls;
  }

  /**
  * Save user
  */
  saveBrigades() {

    if (this.brigadeForm.valid) {
      if (this.isEditing) {
        console.log("updating... ", this.brigadeForm.controls.id.value)
        this.service.updateBrigade(this.brigadeForm.value, this.brigadeForm.controls.id.value)
          .subscribe({
            next: (data) => {
              console.log(data)
              this.getAll();
              this.asignTech(this.brigadeForm.value, data.id)
              this.modalService.hide();
            }
          })
      } else {
        console.log("saving... ", this.brigadeForm.controls.id.value)
        this.service.saveBrigade(this.brigadeForm.value)
          .subscribe({
            next: (data) => {
              console.log(data)
              this.getAll();
              this.asignTech(this.brigadeForm.value, data.id)
              this.modalService.hide();
            }
          })
      }
    }
    // setTimeout(() => {
    //   this.brigadeForm.reset();
    // }, 2000);

    this.submitted = true;
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
  }

  deleteBrigade(id: any) {
    console.log("deleting brigade ", id)
    if (true) {//TODO ask here if can delete
      this.service.deleteBrigade(id)
        .subscribe({
          next: (data) => {
            console.log(data)
            this.getAll();
            this.modalService.hide();
          }
        })
    }
  }

  getStatusLabel(statusId: number) {
    switch (statusId) {
      case 0:
        return 'Activa'
        break;
      case 1:
        return 'Desactivada'
      case 2:
        return 'Borrada'
      default:
        return 'Desconocido'
        break;
    }
  }

  editDataGet(content: any, index: any) {
    this.submitted = false;
    this.isEditing = true;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
    this.setDataToEdit(index);
  }
  
  shoModal(){
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success"
    });
  }

  asignTech(data: any, brigadeId: any) {
    console.log("linking banches to the new template ", data.technichian)
    this.service.asinTech(brigadeId, data.technichian)
      .subscribe({
        next: (data) => {
          console.log("success ", data)
        }
      });
  }

  


  setDataToEdit(index: any) {
    var brigade = this.brigade.find((e) => e.id === index)
    this.brigadeForm.get('id').setValue(brigade.id);
    this.brigadeForm.get('name').setValue(brigade.name);
  }
  getAll() {
    console.log("getting brigade");
    this.service.GetAll()
      .subscribe({
        next: (data) => {
          this.brigade = data;
        }
      })
  }

}


