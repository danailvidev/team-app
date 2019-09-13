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
    MatSlideToggleModule,
    MatRadioModule
} from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import 'hammerjs';

// components
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NgSubscribeDirective } from './directives';
import { CapsDirective } from './directives';
import { CanAccessDirective } from './directives/can-access.directive';
import { ShowInfoDirective } from './directives/show-info.directive';

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
        MatSnackBarModule,
        MatRadioModule,
        MatDialogModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,

        // components
        LoadingSpinnerComponent,
        CapsDirective,
        CanAccessDirective,

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
        MatRadioModule,
        MatDialogModule
    ],
    declarations: [
        LoadingSpinnerComponent,
        NgSubscribeDirective,
        CapsDirective,
        CanAccessDirective,
        ShowInfoDirective
    ]
})
export class SharedModule { }
