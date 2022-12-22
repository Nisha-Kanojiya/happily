import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsService } from './services/form-service';
import { ApiService } from './services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService } from './services/authguard.service';
import {ToastrModule} from 'ngx-toastr';
import { ToasterService } from './services/toaster.service';
import { HttpErrorInterceptor } from './services/http-error.service';
import { CustomvalidationService } from './services/custom-validation.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { IgxProgressBarModule } from "igniteui-angular";
import { PdfViewerModule } from 'ng2-pdf-viewer'; // <- import PdfViewerModule

@NgModule({
  declarations: [
    AppComponent,
    
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    IgxProgressBarModule,
    BrowserAnimationsModule,
    PdfViewerModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  // tslint:disable-next-line:max-line-length
  providers: [FormsService, ApiService, Md5, AuthGuardService , ToasterService, CustomvalidationService,   {provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
