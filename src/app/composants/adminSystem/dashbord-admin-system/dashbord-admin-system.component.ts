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
  selector: 'app-dashbord-admin-system',
  templateUrl: './dashbord-admin-system.component.html',
  styleUrls: ['./dashbord-admin-system.component.css']
})
export class DashbordAdminSystemComponent {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {};

  constructor() {
    this.chartOptions = {
      // colors: ['#FCE700', '#F8C4B4', '#f6e1ea'],
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
}


  // public options: any = {
  //   Chart: {
  //     type: 'area',
  //     height: 700
  //   },
  //   title: {
  //     text: 'Evolution de la population'
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   xAxis: {
  //     categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
  //     tickmarkPlacement: 'on',
  //     title: {
  //         enabled: false
  //     }
  //   },
  //   series: 
  //   [{
  //       name: 'Asia',
  //       data: [502, 635, 809, 947, 1402, 3634, 5268] 
  //     }, 
  //     {
  //       name: 'Europe',
  //       data: [163, 203, 276, 408, 547, 729, 628] 
  //     },
  //     {
  //       name: 'America',
  //       data: [18, 31, 54, 156, 339, 818, 1201]
  //     }
  //   ]
  // }


  // public options1: any = {
  //   // Chart: {
  //   //   // type: 'donut',
  //   //   height: 200
  //   // },

  //   title: {
  //     text: '',
  //     align: 'center',
  //   },

  //   hoverOffset: 4, 
  //   legend: {
  //     enabled: true
  //   },

  //   colors: ['#FCE700', '#F8C4B4', '#f6e1ea'],

  //   series: [
  //     {
  //         type: 'pie',
  //         names: ["Ligne statistique", "ehehhe"],
  //         data: [450, 600],
  //     }
  // ]
    


  // }

  // constructor() { }
  // ngOnInit(): void {
  //   // Highcharts.chart('containerChart', this.options);
  //   Highcharts.chart('containerChart1', this.options1);
  // }
  

  

  
// }
