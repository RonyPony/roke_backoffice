import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DndModule } from 'ngx-drag-drop';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PlanningRoutingModule } from './planning-routing.module';
import { NewComponent } from './new/new.component';
import { CalendarComponent } from '../calendar/calendar.component';



@NgModule({
  declarations: [
    ListComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    // CalendarComponent,
    FormsModule,
    ReactiveFormsModule,
    PlanningRoutingModule,
    UIModule,
    NgApexchartsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    CKEditorModule,
    DndModule,
    BsDropdownModule.forRoot()
  ]
})
export class PlanningModule { }
