

import { ApplicantService} from './core/services/helpers/http.helper.service';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
  import {EventAggregator} from 'aurelia-event-aggregator';
  import {ApplicantViewed} from './messages';
  

@inject(ApplicantService,EventAggregator, Router )
export class ApplicantDetail {
  url:any;
    originalApplicant:any;
    route:any;
    routeConfig:any;
    applicant:any; 
     ea:any;
     controller:any;
    private _applicantService: ApplicantService;
      constructor(applicantService, ea, Router){
        this._applicantService = applicantService;
      this.route=Router;
        this.ea = ea;
      }

      activate(params, routeConfig) {
          this.routeConfig = routeConfig;
          return this._applicantService.getApplicant(params.id).then(applicant => {
          this.applicant = applicant;
          this.routeConfig.navModel.setTitle(applicant.name);
          this.originalApplicant = JSON.parse(JSON.stringify(applicant));
          this.ea.publish(new ApplicantViewed(this.applicant));
        });
      }
    }