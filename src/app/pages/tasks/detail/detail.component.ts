import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';
import { TicketDetail } from '../list/list.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

/**
 * Invoices Detail component
 */
export class DetailComponent implements OnInit {

 // bread crumb items
 breadCrumbItems: Array<{}>;
  parameterId: string;
  taskId:string;
  ticket_info:TicketDetail[];

 constructor(private service:TicketService,private route: ActivatedRoute) { }


 ngOnInit() {
  this.route.params.subscribe(params => {
  this.taskId = params['id'];
});
  console.log("id>> ",this.taskId)
    this.breadCrumbItems = [{ label: 'Invoices' }, { label: 'Detail', active: true }];
    this.loadInfo(this.taskId);
  }

 loadInfo(id:string){
  this.service.getById(this.parameterId)
        .subscribe({
          next: (data) => {
            this.ticket_info=data;
            console.log("response> ",)
          }
        })
 }
}
