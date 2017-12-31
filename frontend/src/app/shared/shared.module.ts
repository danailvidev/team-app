import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import {MatSnackBarModule} from '@angular/material/snack-bar';

import 'hammerjs';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,

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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

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
  declarations: []
})
export class SharedModule { }
