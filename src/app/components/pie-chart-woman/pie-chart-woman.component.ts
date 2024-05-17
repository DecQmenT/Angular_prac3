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
  selector: 'app-pie-chart-woman',
  templateUrl: './pie-chart-woman.component.html',
  styleUrls: ['./pie-chart-woman.component.css'],
  standalone: true
})
export class PieChartWomanComponent implements OnInit {
  @ViewChild('pieChart') pieChart!: ElementRef;
  chart: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getJsonData().subscribe((data: FoodItem[]) => {
      const labels = data.map((item: FoodItem) => item.food);
      const populations = data.map((item: FoodItem) => item.customer.woman);

      const totalPopulation = populations.reduce((acc, curr) => acc + curr, 0);

      this.chart = new Chart(this.pieChart.nativeElement, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Population of Women',
            data: populations,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context: any) {
                  let label = context.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed) {
                    const percentage = ((context.parsed / totalPopulation) * 100).toFixed(2);
                    label += context.parsed.toLocaleString() + ' (' + percentage + '%)';
                  }
                  return label;
                }
              }
            }
          }
        }
      });
    });
  }
}
