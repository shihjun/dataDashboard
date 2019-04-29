import { Component, OnInit } from '@angular/core';
import data from '../../data.json';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  chartType = "pie"
  chartData = []
  chartLabels = []

  chartData1 = []
  chartLabels1 = []


  constructor() { }

  ngOnInit() {

    // FIRST PIE CHART
    let dataset = []
    let tagLikeCount = {}

    for (let image of data) {
      for (let tag of image.tags) {
        if (!tagLikeCount[tag]) {
          tagLikeCount[tag] = 0
        }
        tagLikeCount[tag] += image.likes
      }
    }

    this.chartLabels = Object.keys(tagLikeCount)

    for (let tag of Object.keys(tagLikeCount)) {
      dataset.push(tagLikeCount[tag])
    }
    this.chartData.push({
      data: dataset
    })


    // SECOND PIE CHART
    let dataset1 = []
    let tagImageCount = {}

    for (let image of data) {
      for (let tag of image.tags) {
        if (!tagImageCount[tag]) {
          tagImageCount[tag] = 0
        }
        tagImageCount[tag] += 1
      }
    }

    this.chartLabels1 = Object.keys(tagImageCount)

    for (let tag of Object.keys(tagImageCount)) {
      dataset1.push(tagImageCount[tag])
    }
    this.chartData1.push({
      data: dataset1
    })
  }
}
