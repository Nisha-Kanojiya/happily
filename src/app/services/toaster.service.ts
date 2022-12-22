import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  config: any = {};

  constructor(private toastrService: ToastrService) {
    this.config.position = 'top-right';
    this.config.duration = 6000;
    this.config.enableHtml = true;
  }

  error(message, title, position?: any): void {
    this.config.duration = 3000;
    this.config.position = (position || this.config.position);
    this.config.enableHtml = true;
    this.toastrService.error(message, title, this.config);
  }

  success(message, title, position?: any): void {
    this.config.position = (position || this.config.position);
    this.config.enableHtml = true;
    this.toastrService.success(message, title, this.config);
  }

  warning(message, title, position?: any): void {
    this.config.position = (position || this.config.position);
    this.config.enableHtml = true;
    this.toastrService.warning(message, title, this.config);
  }

  info(message, title, position?: any): void {
    this.config.position = (position || this.config.position);
    this.config.enableHtml = true;
    this.toastrService.info(message, title, this.config);
  }
}
