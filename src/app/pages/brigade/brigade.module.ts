import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BranchsRoutingModule } from '../branches/branches-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DndModule } from 'ngx-drag-drop';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { BrigadeRoutingModule } from './brigade-routing.module';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrigadeRoutingModule,
    UIModule,
    NgApexchartsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    CKEditorModule,
    DndModule,
    BsDropdownModule.forRoot()
  ]
})
export class BrigadeModule { }
