import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import Chart from 'chart.js/auto';

interface FoodItem {
  id: number;
  food: string;
  price: number;
  customer: {
    man: number;
    woman: number;
  };
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  standalone: true
})
export class BarChartComponent implements OnInit {
  @ViewChild('barChart') barChart!: ElementRef;
  chart: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getJsonData().subscribe((data: FoodItem[]) => {
      const labels = data.map((item: FoodItem) => item.food);
      const menPopulations = data.map((item: FoodItem) => item.customer.man);
      const womenPopulations = data.map((item: FoodItem) => item.customer.woman);

      if (this.barChart) {
        this.chart = new Chart(this.barChart.nativeElement, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Men',
              data: menPopulations,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
              label: 'Women',
              data: womenPopulations,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    });
  }
}
