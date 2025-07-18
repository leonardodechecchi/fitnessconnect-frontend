import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.html',
  imports: [InputTextModule, MultiSelectModule, ButtonModule, CardModule],
})
export class FilterMenu {}
