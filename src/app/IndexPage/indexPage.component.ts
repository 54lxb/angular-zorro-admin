import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { Http, HttpModule, RequestOptions, Headers } from '@angular/http';

import { geoCoordMap } from '../../utils/geoCoordMap';
import { dateFormat } from '../../utils/dateFormat';
import * as Apis from '../../utils/Apis';

console.log(Apis, ">>>");

@Component({
    selector: 'indexPage',
    templateUrl: './indexpage.component.html',
    styleUrls: ['./indexpage.component.scss'],
    animations: [routerTransition()]
})

export class IndexPageComponent implements OnInit {
    showloading: boolean = true;
    topLineDataUrl: string = Apis.indexPageUrl.GET_TOPLINE_DATA;

    xAxisData: string[] = [];
    seriesData: string[] = [];

    constructor(public router: Router, private http: Http) {
        setTimeout(() => {
            this.showloading = false;
        }, 3000);
    }
    
    ngOnInit () {
        /**
         * 当Angular组件初始化完成数据绑定的输入属性后，用来初始化指令或者组件。
         */
        let me = this;
        let body = JSON.stringify({
               
        });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        me.http.post(me.topLineDataUrl, body, options).toPromise().then((res) => {
            me.xAxisData = me.dateFormatFun(res.json().xAxis);
            me.seriesData = res.json().amounts;
        })
    }

    dateFormatFun(arr){
        let arrays = [];
        arr.map((val) => {
            arrays.push(dateFormat(val*1000, 'hh:ii'));
        })
        return arrays;
    }
    
    datamapvalue = [
        {name: '海门', value: [121.15,31.89,9]},
        {name: '鄂尔多斯', value: [109.781327,39.608266,12]},
        {name: '招远', value: [120.38,37.35,12]},
        {name: '舟山', value: [122.207216,29.985295,12]},
        {name: '齐齐哈尔', value: [123.97,47.33,14]},
        {name: '盐城', value: [120.13,33.38,15]},
        {name: '赤峰', value: [118.87,42.28,16]},
        {name: '青岛', value: [120.33,36.07,18]},
        {name: '乳山', value: [121.52,36.89,18]},
        {name: '金昌', value: [102.188043,38.520089,19]}
    ];

    mapOption = {
        backgroundColor: '#fff',
        title: {
            text: '全国主要城市空气质量',
            subtext: 'data from PM25.in',
            sublink: 'http://www.pm25.in',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
            data: ['pm2.5'],
            textStyle: {
                color: '#fff'
            }
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#111'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        series: [
            {
                name: 'pm2.5',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: this.datamapvalue,
                symbolSize: function(val) {
                    return val[2] / 10;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        showl: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'ddb926'
                    }
                }
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: this.datamapvalue,
                symbolSize: function(val) {
                    return val[2] / 10;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f4e925',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            }
        ]
    }



}