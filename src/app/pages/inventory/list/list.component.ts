import { Component } from '@angular/core';
import { Inventory, LocationRoke } from './list.model';
import { InventoryService } from './inventory.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  modalRef?: BsModalRef;
  InventoryListForm!: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;
  currentPage: any;
  constructor(public service: InventoryService, private modalService: BsModalService, private formBuilder: UntypedFormBuilder) {

  }
  Inventory: Inventory[];
  locations: LocationRoke[];
  searchingLocations = true

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadForm();
    this.getAll();
    this.getAllLocations();
  }
  loadForm() {
    this.InventoryListForm = this.formBuilder.group({
      sucursal: ['', [Validators.required]],
      ItemCode: [''],
      equipo: [''],
      UbicacionInterna: [''],
      Capacidad: [''],
      Marca: [''],
      refrigerante: ['']
    });
  }

  openViewModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }
  shoModal(){
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success"
    });
  }

  openModal(content: any) {
    this.submitted = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
  }
  getAllLocations() {
    this.service.GetAllLocations().subscribe({ next: (data) => { this.locations = data; this.searchingLocations = false } })
  }

  /**
  * Form data get
  */
  get form() {
    return this.InventoryListForm.controls;
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

  /**
  * Save user
  */
  saveInventory() {
    if (this.InventoryListForm.valid) {
      this.service.saveInventory(this.InventoryListForm.value)
        .subscribe({
          next: (data) => {
            this.getAll();
           
            this.modalService.hide();
          }
        })
      
    }
    else{
      console.log(":v")
    }

    setTimeout(() => {
      this.InventoryListForm.reset();
    }, 2000);

    this.submitted = true;
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
  }

  editDataGet(content: any, index: number) {
    this.submitted = false;
    this.isEditing = true;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
    this.setDataToEdit(index);
  }

  setDataToEdit(index: number) {
    this.InventoryListForm.get('id').setValue(this.Inventory[index].id);
  }
  getAll() {
    console.log("getting Inventory");
    this.service.GetAll()
      .subscribe({
        next: (data) => {
          this.Inventory = data;
        }
      })
  }
}
