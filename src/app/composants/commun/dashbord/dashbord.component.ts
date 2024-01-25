import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';

import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: any;
};
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit{
  // Déclaration des variables 
  // Si l'utilisateur connecté est un administrateur systeme ou réseau 
  isAdminSystem: boolean = false;
  isAdminReseau: boolean = false;
  userConnect:any;

  // Chart pour administrateur system 
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {};

  constructor() {
    this.chartOptions = {
      series: [600, 450],
      chart: {
        type: "donut",
      },
      labels: ["AFTU", "DDD"],
      colors: ['#F2743B', '#2CCED2'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
    // On récupère les infos de l'utilisateur qui s'est connecté 
    // localStorage.setItem("userConnect", JSON.stringify(userConnect));
    this.userConnect = JSON.parse(localStorage.getItem("userConnect")) || "";
    
    if(this.userConnect.type == "admin"){
      this.isAdminSystem = true;
      this.isAdminReseau = false;
    } else if(this.userConnect.type == "utilisateur"){
        this.isAdminSystem = false;
        this.isAdminReseau = true;
    }
  }


}
