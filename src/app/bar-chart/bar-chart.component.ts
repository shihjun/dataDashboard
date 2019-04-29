import { Component, OnInit } from '@angular/core';
import data from '../../data.json';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  chartType = "bar"
  chartData = []
  // [
  //   { data: [],  label: "tag"}
  // ]
  chartLabels = []

  constructor() { }

  ngOnInit() {
    let dataset = []
    let monthlyLikes = {}
    // {
    //   month: {
    //     tag1: like,
    //     tag2: like,
    //     tag3: like,
    //   }
    // }

    var sortedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    data.sort((a, b) => sortedMonths.indexOf(a.dateAdded.substr(4, 3)) - sortedMonths.indexOf(b.dateAdded.substr(4, 3)));

    for (let image of data) {
      if (!monthlyLikes[image.dateAdded.substr(4, 3)]) {
        monthlyLikes[image.dateAdded.substr(4, 3)] = {}
      }

      for (let tag of image.tags) {
        if (!monthlyLikes[image.dateAdded.substr(4, 3)][tag]) {
          monthlyLikes[image.dateAdded.substr(4, 3)][tag] = 0
        }
        monthlyLikes[image.dateAdded.substr(4, 3)][tag] += image.likes
      }
    }

    console.log(monthlyLikes)

    this.chartLabels = Object.keys(monthlyLikes)

    let aggregateTagLikes = {}

    for (let month of Object.keys(monthlyLikes)) {
      for (let tag in monthlyLikes[month]) {
        if (!aggregateTagLikes[tag]) {
          aggregateTagLikes[tag] = []
        }
        aggregateTagLikes[tag].push(monthlyLikes[month][tag])
      }
    }

    for (let tag in aggregateTagLikes) {
      dataset.push({
        data: aggregateTagLikes[tag],
        label: tag
      })
    }

    this.chartData = dataset
  }
}
