import { Component } from '@angular/core';
import { FilterCheckService } from '../../services/filter-check.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  constructor(private filterService: FilterCheckService) { }

  onChange(event: any) {
    const selectedValue = event.target.value;
    this.filterService.setSelectedValue(selectedValue);
  }
}
