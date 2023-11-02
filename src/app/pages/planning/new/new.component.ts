import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Brigade, LocalPlanning, Planning, branch } from '../new/list.model';
import { PlanningService } from './planning.service';
import { Month } from './list.model';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Branch } from '../../branches/list/list.model';
import { LocationRoke, TemplateDetails } from '../../templates/model';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  modalRef?: BsModalRef;
  isAnyTemplateSelected: boolean = false;
  constructor(private modalService: BsModalService, private planningService: PlanningService, private formBuilder: UntypedFormBuilder) {

  }
  months: Month[]
  planificacion: Planning[]
  brigade: Brigade[]
  PlanningListForm: FormGroup
  SelectedTemplateBranches: LocationRoke[];
  isEditing: boolean = false;
  ListArray: string[];
  monthDays: number[] = [];
  selectedMonth: Month;
  planningToSave: LocalPlanning[]=[];
  idTemplate: string;
  
  currentTmpSelectedBranchId:string;
  currentTmpSelectedFromDay:number;
  currentTmpSelectedToDay:number;


  ngOnInit(): void {
    this.loadForm();
    this.getAllMonths();
    this.getAllPlanning();
    this.getAllBrigade();
    this.generateDays();
  }
  generateDays() {
    for (let index = 0; index < 30; index++) {
      this.monthDays.push(index + 1)
    }

    console.log(this.monthDays)

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
    this.idTemplate = id;
    if (id === 0) {
      this.isAnyTemplateSelected = false;
    } else {
      this.isAnyTemplateSelected = true;
    }

    // var tmpl = this.PlanningListForm.get('selectedTemplate').value;
    console.log("getting branches of ", id);
    this.planningService.GetAllBranchesByTemplateId(id).subscribe({
      next: (data: TemplateDetails[]) => {
        this.SelectedTemplateBranches = data["location"];
        console.log(this.SelectedTemplateBranches)
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

  selectBrigade() {
    console.log("selecting brigade ")
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

  savePlanning() {
    console.log("saving ",this.planningToSave)
    this.planningService.savePlanning(this.idTemplate, 'plantilla', this.selectedMonth.id, this.planningToSave)
      .subscribe({
        next: (data) => {
          console.log("success ", data)
        }
      });
  }


  onfromDaySelected(id:any, mmg: number){
    console.log(id, mmg)
    this.currentTmpSelectedBranchId = id;
    this.currentTmpSelectedFromDay = mmg;
  }
  onToDaySelected(toDayValue:number){
    this.currentTmpSelectedToDay = toDayValue;
  }

  onBrigadeSelected(brigadeId:string){
    console.log(this.currentTmpSelectedFromDay,this.currentTmpSelectedBranchId,this.currentTmpSelectedToDay)

    this.planningToSave.push({
      idLocation:this.currentTmpSelectedBranchId,
      idBrigade:this.currentTmpSelectedBranchId,
      StartDate:new Date(new Date().getFullYear(),this.getMonthFromString(this.selectedMonth.month.toString()),this.currentTmpSelectedToDay),
      finalDate:new Date(new Date().getFullYear(),this.getMonthFromString(this.selectedMonth.month.toString()),this.currentTmpSelectedFromDay)
    })
  }

  getMonthFromString(mex:string){
    var months = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]
    return months.indexOf(mex.toLowerCase());
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
  openModal(content: any, mes: Month) {
    // this.submitted = false;
    this.selectedMonth = mes;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
    console.log(this.modalRef)
  }


}

