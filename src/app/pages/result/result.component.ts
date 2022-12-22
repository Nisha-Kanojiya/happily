import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  public happyIndexData: Array<any> = [];
  FirstAnswerValue: number;
  averageOfAllMembersFirstAnswersValue: number;
  yourIndexValue: number;
  AllmembersAverageIndexValue: number;
  public imageLoader:boolean = false;
  userID: any;
  NewPinID: any;
  @ViewChild('contentToConvert', {static:true}) el!: ElementRef<HTMLImageElement>;
  // pdfSource = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  constructor(private router: Router,
              private apiService: ApiService) { }
  ngOnInit() {
    try {
      // if (localStorage.getItem('user_pin')) {
      //   this.pinID = JSON.parse(localStorage.getItem('user_pin')).pinCode;
      //   // gethappinessIndex
      // } else {
      //   this.NewPinID = JSON.parse(localStorage.getItem('happily_user')).user.pinCode;
      // }
      if (localStorage.getItem('happily_user')) {
        this.userID = JSON.parse(localStorage.getItem('happily_user')).userId;
      }
    } catch (error) {
      console.log(error);
    }
    this.getGraphData();
    this.getHappiesIndexData();
  }
  async getGraphData() {
    let message = '';
    if (this.userID) {
      try {
        this.imageLoader = true;
        let data = await this.apiService.get('happiness-index/' + this.userID);
        this.imageLoader = false;
        message = data.statusMessage;
        if (data.statusMessage && data.statusMessage === 'Success') {
          const graphData = data.results;
          this.FirstAnswerValue = Math.round(graphData.firstAnswer);
          this.averageOfAllMembersFirstAnswersValue = Math.round(graphData.averageOfAllMembersFirstAnswers);
          this.yourIndexValue = Math.round(graphData.myHappinessIndex);
          this.AllmembersAverageIndexValue = Math.round(graphData.averageOfAllMembersHappinessIndex);
        } else if (data.statusMessage && data.statusMessage !== 'Success') {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: message,
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigateByUrl('/result-emotional');
        }
      } catch (error) {
        console.log(error);
      }
    } else if (!this.userID && !this.NewPinID) {
      try {
        this.imageLoader = true;
        let data = await this.apiService.get('happiness-index');
        this.imageLoader = false;
        message = data.statusMessage;
        if (data.statusMessage && data.statusMessage === 'Success') {
          const graphData = data.results;
          this.FirstAnswerValue = Math.round(graphData.firstAnswer);
          this.averageOfAllMembersFirstAnswersValue = Math.round(graphData.averageOfAllMembersFirstAnswers);
          this.yourIndexValue = Math.round(graphData.myHappinessIndex);
          this.AllmembersAverageIndexValue = Math.round(graphData.averageOfAllMembersHappinessIndex);
        } else if (data.statusMessage && data.statusMessage !== 'Success') {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: message,
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigateByUrl('/result-emotional');
        }
      } catch (error) {
        console.log(error);
      }
    }

  }


  async getHappiesIndexData() {
    let message = '';
    if (this.NewPinID) {
      try {
        this.imageLoader = true;
        let data = await this.apiService.get('get-happiness-index/' + this.NewPinID);
        this.imageLoader = false;
        message = data.statusMessage;
        if (data.statusMessage && data.statusMessage === 'Success') {
          const graphData = data.results;
          this.FirstAnswerValue = Math.round(graphData.firstAnswer);
          this.averageOfAllMembersFirstAnswersValue = Math.round(graphData.averageOfAllMembersFirstAnswers);
          this.yourIndexValue = Math.round(graphData.myHappinessIndex);
          this.AllmembersAverageIndexValue = Math.round(graphData.averageOfAllMembersHappinessIndex);
          localStorage.setItem('temp_pinCode', JSON.stringify(graphData));
        }  else if (data.statusMessage && data.statusMessage !== 'Success') {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: message,
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigateByUrl('/result-emotional');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  public generatePDF() {
    // var data = document.getElementById('contentToConvert');
    console.log(this.el.nativeElement);
    
    html2canvas(this.el.nativeElement).then((canvas) => {
      // var imgWidth = 208;
      // var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/jpeg')
      let pdf = new jsPDF({ orientation: 'portrait'})
      const imageProps = pdf.getImageProperties(contentDataURL)
      const pdfw = pdf.internal.pageSize.getWidth();
      console.log(pdfw);
      
      const pdfh = (imageProps.height*pdfw)/imageProps.width;
      console.log(pdfh);
      
      pdf.addImage( contentDataURL,'PNG', 1, 2, pdfw, pdfh,);
      // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('your_self_test_result_graph.pdf');
    });
  }

  // htmltoPdf() {
  //   this.apiService.generatePDF();
  // }
}
