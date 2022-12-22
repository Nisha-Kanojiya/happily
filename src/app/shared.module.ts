import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './directives/header/header.component';
import { FooterComponent } from './directives/footer/footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RepeatedTextComponent } from './directives/repeated-text/repeated-text.component';
import { DateFormatPipe } from './pipes/date.filter.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    RepeatedTextComponent,
    DateFormatPipe
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    DateFormatPipe,
    RouterModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    RepeatedTextComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
