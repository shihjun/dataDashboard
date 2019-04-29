import { Component, OnInit } from '@angular/core';
import data from '../../data.json';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  chartType = "line"
  chartData = []
  chartLabels = []

  constructor() { }

  ngOnInit() {
    let dataset = []
    let monthlyImages = {}
    // {
    //   month: imageCount,
    //   month: imageCount,
    // }


    var sortedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    data.sort((a, b) => sortedMonths.indexOf(a.dateAdded.substr(4, 3)) - sortedMonths.indexOf(b.dateAdded.substr(4, 3)));


    for (let image of data) {
      if (!monthlyImages[image.dateAdded.substr(4, 3)]) {
        monthlyImages[image.dateAdded.substr(4, 3)] = 0
      }
      monthlyImages[image.dateAdded.substr(4, 3)] += 1
    }

    console.log(monthlyImages)

    this.chartLabels = Object.keys(monthlyImages)

    for (let month in monthlyImages) {
      dataset.push({
        data: monthlyImages[month],
        label: "Number of image"
      })
    }


    this.chartData = dataset
  }
}
