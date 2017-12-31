import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Material
import {
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatSelectModule,
  MatTabsModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
  MatTooltipModule,
  MatSlideToggleModule
} from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import 'hammerjs';

// components
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    // Material
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    
    // components
    LoadingSpinnerComponent,

    // Material
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatSlideToggleModule
  ],
  declarations: [
    LoadingSpinnerComponent
  ]
})
export class SharedModule { }
