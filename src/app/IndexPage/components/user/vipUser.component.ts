import { Component, OnInit, Input } from '@angular/core';
import { Http, HttpModule, RequestOptions, Headers } from '@angular/http';

import { AlarmNum } from './alarmNum.component';

@Component({
    selector: 'vip-user',
    templateUrl: './vipUser.component.html',
    styleUrls: ['./vipUser.component.scss']
})

export class VipUserComponent implements OnInit {
    constructor(private http: Http) {

    }

    ngOnInit() {

    }

    
}