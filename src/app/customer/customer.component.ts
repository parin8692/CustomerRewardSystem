import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { CustomerService } from './customer.service';
declare var $: any;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private spinner: NgxSpinnerService,
  ) { }

  customerList: any;
  customerRewardList: any;
  customerName: string = "";
  totalRewardPoint: number = 0;

  ngOnInit(): void {
    this.fillCustomer();
  }

  fillCustomer() {
    this.spinner.show();

    this.customerService.getCustomers().subscribe(response => {
      this.spinner.hide();
      
      if (response.length > 0) {
        this.customerList = response;
      }
    }, (err: HttpErrorResponse) => {
      this.spinner.hide();
    });
  }

  getCustomeRewardHistory(custId: number, custName: string) {
    this.spinner.show();

    this.customerService.getCustomerRewardHistory(custId).subscribe(response => {
      this.spinner.hide();
      
      if (response.length > 0) {
        this.customerRewardList = response;
        this.customerName = custName;
        $('#customerRewardHistoryModal').modal('show');
      } else {
        console.log("Transaction Not Available");
      }
    }, (err: HttpErrorResponse) => {
      this.spinner.hide();
    });
  }

  getCustomeMonthlyReward(custId: number, custName: string) {
    this.spinner.show();

    this.customerService.getCustomerMonthlyReward(custId).subscribe(response => {
      this.spinner.hide();
      
      if (response.length > 0) {
        this.customerRewardList = response;
        this.customerName = custName;
        this.getTotalRewardPoint(custId);
        $('#customerMonthlyRewardModal').modal('show');
      } else {
        console.log("Reward Not Available");
      }
    }, (err: HttpErrorResponse) => {
      this.spinner.hide();
    });
  }

  getTotalRewardPoint(custId: number) {
    this.spinner.show();

    this.customerService.getTotalRewardPoint(custId).subscribe(response => {
      this.spinner.hide();
      
      if (response.totalRewardPoint > 0) {
        this.totalRewardPoint = response.totalRewardPoint;
      } else {
        console.log("Total Not Available");
      }
    }, (err: HttpErrorResponse) => {
      this.spinner.hide();
    });
  }
}
