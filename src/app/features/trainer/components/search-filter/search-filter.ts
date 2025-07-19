import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.html',
  imports: [InputTextModule, ButtonModule, MultiSelectModule],
})
export class SearchFilter {}
