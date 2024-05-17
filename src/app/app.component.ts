import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';
import { PieChartManComponent } from './components/pie-chart-man/pie-chart.component';
import { PieChartWomanComponent } from './components/pie-chart-woman/pie-chart-woman.component';
import { FilterComponent } from './components/filter/filter.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { FilterCheckService } from './services/filter-check.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, PieChartManComponent, PieChartWomanComponent, FilterComponent, BarChartComponent, CommonModule],
  providers: [DataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  data?: Object;
  selectedValue: string = '';

  constructor(private dataService: DataService,private filterService: FilterCheckService) {}

  ngOnInit() {
    this.dataService.getJsonData().subscribe((response) => {
      this.data = response;
    });
    this.filterService.selectedValue$.subscribe(value => {
      this.selectedValue = value;
    });
  }
}
