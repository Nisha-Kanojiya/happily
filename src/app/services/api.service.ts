
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable()
export class ApiService {
    //public endpoint = 'https://api.my-happy-mind.com/'
    // public endpoint = 'https://api.emotionalhealthtest.com/';
    // public endpoint = 'http://ec2-34-198-132-147.compute-1.amazonaws.com:8081/';
    // public endpoint="http://192.168.1.215:8080/"
    public endpoint="https://kspdvsd.elb.cisinlive.com/"
   
  public httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    }),
    body: {}
    };

  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  get(url): Promise<any> {
    return this.http.get(this.endpoint + url, this.getHeaders()).toPromise();
  }
  post(url, body): Promise<any> {
    return this.http
      .post<any>(this.endpoint + url, body, this.getHeaders())
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      )
      .toPromise();
  }
  put(url, body): Observable<any> {
    return this.http
      .put(this.endpoint + url, body, this.getHeaders())
      .pipe(map(this.extractData));
  }

  handleError(error) {

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(error.error);
  }
  delete(url, deleteBody?): Promise<any> {
    return this.http.delete(this.endpoint + url, this.getHeaders(deleteBody)).toPromise();
  }


    // this.http.delete('http://localhost:8080/user', options).subscribe(s => {
    // console.log(s);
    // })

  getHeaders(deleteBody?) {
    if (localStorage.getItem('happily_user')) {
      const user = JSON.parse(localStorage.getItem('happily_user'));
      if (deleteBody) {
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token
          }),
          body: deleteBody
        };
      } else {
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token
          }),
          body: deleteBody ? deleteBody : null
        };
      }
    }
    return this.httpOptions;
  }

//  getHeaders() {
//     if (localStorage.getItem('happily_user')) {
//       const user = JSON.parse(localStorage.getItem('happily_user'));
//       console.log(user);
//       this.httpOptions = {
//           headers: new HttpHeaders({
//             'Content-Type': 'application/json',
//             Authorization: 'Bearer ' + user.token
//           }),
//       };
//     }
//     return this.httpOptions;
//   }

public generateHtmltoPDF() {
  var data = document.getElementById('contentToConvertPDF');
  html2canvas(data).then(canvas => {
    var imgWidth = 208;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jsPDF('p', 'mm', 'a4');
    var position = 0;
    pdf.addImage({ imageData: canvas.toDataURL('image/png', 1),format: 'PNG', x: 1, y: 20, width: imgWidth, height: imgHeight});
    pdf.save('your_self_test_graph_result.pdf');
  });
}
}
