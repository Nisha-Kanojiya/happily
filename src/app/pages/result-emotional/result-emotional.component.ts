import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { ChartOptions, ChartType, ChartDataSets, Chart } from "chart.js";
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chart.js';
import { Label } from "ng2-charts";
import { Options } from "ng5-slider";
import { ApiService } from "../../services/api.service";
import Swal from "sweetalert2";
import * as $ from "jquery";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
Chart.plugins.register(ChartDataLabels);
@Component({
  selector: "app-result-emotional",
  templateUrl: "./result-emotional.component.html",
  styleUrls: ["./result-emotional.component.scss"],
})
export class ResultEmotionalComponent implements OnInit {
  emotionGraphData: any;
  status = "";
  userlogin: boolean = false;
  currentIndex = 0;
  questionList: any = [];
  emotionalState: any = [];
  rating = 0;
  userID: any;
  answerDetails: Array<any> = [];
  public imageLoader: boolean = false;
  NewPinID: any;
  questionData: any = [];
  value: number = 0;
  options: Options = {
    floor: -50,
    ceil: 50,
  };
  @ViewChild("contentToConvert", { static: true })
  el!: ElementRef<HTMLImageElement>;
  
  barTopSideValue = [
    // "Anger",
    // "Hatred",
    // "Fear",
    // "Jealousy",
    // "Greed",
    // "Desire",
    // "Discontent",
    // "Egotism",
    // "Sadness",
    // "Fatigue",
  ];

  barBottomSideValue = [
    // "Calm",
    // "Love",
    // "Confidence",
    // "Admiration",
    // "Generosity",
    // "Indifference",
    // "Content",
    // "Humility",
    // "Cheerfulness",
    // "Zestfulness",
  ];
  public barChartType: ChartType = "bubble";
  public barChartOptions: ChartOptions = {};
  public emotionaChartData = [];
  public barChartLabels: Label[] = [
    "Anger",
    "Hatred",
    "Fear",
    "Jealousy",
    "Greed",
    "Desire",
    "Discontent",
    "Egotism",
    "Sadness",
    "Fatigue",
  ];
  
  public barChartPlugins = [];
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [
    {
      data: [],
      hoverBackgroundColor: "",
      barPercentage: 0,
      maxBarThickness: 0,
      fill: false,
      
    },
  ];

  public emotionalStateList: Array<any> = [];
  constructor(private router: Router, private apiService: ApiService) {
  }

  ngOnInit() {
    try {
      if (localStorage.getItem("happily_user")) {
        this.userlogin = true;
        this.userID = JSON.parse(localStorage.getItem("happily_user")).userId;
      }
    } catch (error) {
      console.log(error);
    }
    this.getEmotionalGraphData();

    this.barChartOptions = {
      responsive: true,
      legend: {
        display: false,
        position: "top",
        labels: {
          fontSize: 20,
          fontColor: 'blue'
        },
      },
      elements: {
        point: {
          radius: 0,
        },
        line: {
          borderWidth: 8
        }
      },
      tooltips: {
        enabled: true,
        backgroundColor: "rgba(255,255,255,0.9)",
        bodyFontColor: "#333",
        borderColor: "#999",
        borderWidth: 1,
        caretPadding: 15,
        displayColors: false,
        intersect: true,
        mode: "index",
        titleFontColor: "#000",
        titleMarginBottom: 10,
        xPadding: 15,
        yPadding: 15,
        titleFontSize: 20,
        bodyFontSize: 20,
      },
      scales: {
        xAxes: [
          {
            display: true,
            ticks: {
              fontSize: 0,
              fontColor: "white",
            },
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: true,
          },
          },
          {
            display: true,
            ticks: {
              fontSize: -5,
              fontColor: "white"
            },
            gridLines: {
              display: false,
              color: "rgba(255,99,132,0.2)",
            },
            position: "top",
          },
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              max: 100,
              min: -100,
              fontSize: 16,
            },
            gridLines:{
              display: true,
              // zeroLineColor:'lightblue',
              color:'lightgrey',drawBorder:true,borderDash:[2,2,2,2]
            },
          },
          {
            display: true,
            ticks: {
              max: 100,
              min: -100,
              fontSize: -5,
              fontColor: "white"
            },
            position: "right",
            gridLines:{
              display: false
            },
            scaleLabel: {
              display: true,
          },
          },
        ]
      },
      
      plugins: {
        datalabels:{
          color:'white',
          // borderRadius: 20,
          // borderWidth: 5,
          font: {
            size: 18
          },
        },
        },

      
    };
  }


  async getEmotionalGraphData() {
    if (this.userID) {
      try {
        this.imageLoader = true;
        let data = await this.apiService.get("emotional-state/" + this.userID);
        console.log("DATA::::", data)
        this.imageLoader = false;
        if (data.statusMessage && data.statusMessage === "Success") {
          this.emotionGraphData = data.results;
          console.log("Emotion Graph results:::", this.emotionGraphData)

          this.emotionGraphData.categories.forEach((obj, index) => {
            console.log("categorisedID ", obj)
            console.log("Index obj", index)
            let s1 = Object.assign(obj.emotionalStateValue, {x:index} ,{r:18})
            this.barChartData[0].data.push(s1);
            console.log("Checking --->", obj.emotionalState)
            this.emotionalState.push(obj);
            this.barChartLabels.push(obj.emotionalState);
          });
          // this.emotionGraphData.categories = [];
          this.emotionGraphData.categories.forEach((ele) => {
            ele.questionAnswers.forEach((item: any) => {
              this.answerDetails.push(
                Object.assign(
                  {},
                  {
                    categoriesId: ele.categoriesId,
                    emotionalState: ele.allEmotionalState.join("/"),
                    emotionalStateValue: ele.emotionalStateValue,
                    answer: item.answer * 2,
                    positiveLabel: item.positiveLabel,
                    negativeLabel: item.negativeLabel,
                    questionId: item.id,
                  }
                )
              );
            });
          });
          console.log(this.answerDetails);

          this.answerDetails.sort(function (a, b) {
            return a.questionId - b.questionId;
          });

          let colors = [];
          colors = (this.barChartData[0].data as any[]).map(
            (a: any) => {
              console.log(a, "a------");
              
              return a < 0 ? "red" : "green";
            }
          );
          let colors1 = [];
          colors1 = (this.barChartData[0].data as any[]).map(
            (a: any) => {
              console.log(a, "a------");
              
              return a < 0 ? "red" : "green";
            }
          );
          let Hovercolors = [];
          Hovercolors = (this.barChartData[0].data as any[]).map(
            (a: any) => {

              console.log(a, "a------sfds");
              return a < 0 ? "red" : "green";
            }
          );


          this.barChartData[0].backgroundColor = colors;
         
          this.barChartData[0].hoverBackgroundColor = Hovercolors;
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Something went wrong server not working!",
            showConfirmButton: true,
            // timer: 2000
          });
          this.router.navigateByUrl("/privacy-protected-test");
        }
      } catch (error) {
        console.log(error);
      }
    } else if (!this.userID && !this.NewPinID) {
      try {
        this.imageLoader = true;
        let data = await this.apiService.get("emotional-state");
        this.imageLoader = false;
        if (data.statusMessage && data.statusMessage === "Success") {
          this.emotionGraphData = data.results;
          this.emotionGraphData.categories.forEach((obj) => {
            this.barChartData[0].data.push(obj.emotionalStateValue);
            this.emotionalState.push(obj);
          });

          this.emotionGraphData.categories.forEach((ele) => {
            ele.questionAnswers.forEach((item: any) => {
              this.answerDetails.push(
                Object.assign(
                  {},
                  {
                    categoriesId: ele.categoriesId,
                    emotionalState: ele.emotionalState,
                    emotionalStateValue: ele.emotionalStateValue,
                    answer: item.answer * 2,
                    positiveLabel: item.positiveLabel,
                    negativeLabel: item.negativeLabel,
                    questionId: item.id,
                  }
                )
              );
            });
          });
          this.answerDetails.sort(function (a, b) {
            return a.questionId - b.questionId;
          });

          let colors = [];
          colors = (this.barChartData[0].data as any[]).map(
            (a: number | string) => {
              return a < 0 ? "red" : "green";
            }
          );
          let Hovercolors = [];
          Hovercolors = (this.barChartData[0].data as any[]).map(
            (a: number | string) => {
              return a < 0 ? "red" : "green";
            }
          );
          this.barChartData[0].backgroundColor = colors;
          this.barChartData[0].hoverBackgroundColor = Hovercolors;
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Something went wrong server not working!",
            showConfirmButton: true,
            // timer: 2000
          });
          this.router.navigateByUrl("/privacy-protected-test");
        }
      } catch (error) {
        console.log(error);
      }
    } else if (!this.userID) {
      try {
        this.imageLoader = true;
        let data = await this.apiService.get(
          "emotional-state/" + this.NewPinID
        );
        console.log("DATA:-->", data)
        this.imageLoader = false;
        if (data.statusMessage && data.statusMessage === "Success") {
          this.emotionGraphData = data.results;
          this.emotionGraphData.categories.forEach((obj) => {
            this.barChartData[0].data.push(obj.emotionalStateValue);
            this.emotionalState.push(obj);
            this.barChartLabels.push(obj.emotionalState);
          });

          this.emotionGraphData.categories.forEach((ele) => {
            ele.questionAnswers.forEach((item: any) => {
              this.answerDetails.push(
                Object.assign(
                  {},
                  {
                    categoriesId: ele.categoriesId,
                    emotionalState: ele.emotionalState,
                    emotionalStateValue: ele.emotionalStateValue,
                    answer: item.answer * 2,
                    positiveLabel: item.positiveLabel,
                    negativeLabel: item.negativeLabel,
                    questionId: item.id,
                  }
                )
              );
            });
          });
          this.answerDetails.sort(function (a, b) {
            return a.questionId - b.questionId;
          });

          let colors = [];
          colors = (this.barChartData[0].data as any[]).map(
            (a: number | string) => {
              return a < 0 ? "red" : "green";
            }
          );
          let Hovercolors = [];
          Hovercolors = (this.barChartData[0].data as any[]).map(
            (a: number | string) => {
              return a < 0 ? "red" : "green";
            }
          );
          this.barChartData[0].backgroundColor = colors;
          this.barChartData[0].hoverBackgroundColor = Hovercolors;
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Something went wrong server not working!",
            showConfirmButton: true,
            // timer: 2000
          });
          this.router.navigateByUrl("/privacy-protected-test");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  getVal(evt: any) {
    this.rating = evt;
  }

  generateHtmltoPDF() {
    // var data = document.getElementById('contentToConvert');
    console.log(this.el.nativeElement);

    html2canvas(this.el.nativeElement).then((canvas) => {
      const contentDataURL = canvas.toDataURL("image/jpeg");
      let pdf = new jsPDF({ orientation: "portrait" });
      const imageProps = pdf.getImageProperties(contentDataURL);
      const pdfw = pdf.internal.pageSize.getWidth();
      console.log(pdfw);

      const pdfh = (imageProps.height * pdfw) / imageProps.width;
      console.log(pdfh);

      pdf.addImage(contentDataURL, "PNG", 1, 2, pdfw, pdfh);
      // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save("your_self_test_result_graph.pdf");
    });
  }

  htmltoPdfDetails() {
    this.apiService.generateHtmltoPDF();
  }

    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }
  
    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }

}
