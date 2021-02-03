


import { ApplicantService} from './core/services/helpers/http.helper.service';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
  import {EventAggregator} from 'aurelia-event-aggregator';
  import {ApplicantViewed} from './messages';

@inject(ApplicantService,EventAggregator, Router )
export class DeleteApplicant {
    originalApplicant:any;
    routeConfig:any;
    dialogController:any;
    applicant:any; 
    url:any;
    route:any
     ea:any;
    private _applicantService: ApplicantService;
      constructor(applicantService, ea,Router){
        this._applicantService = applicantService;
       this.route=Router;
        this.ea = ea;
      
      
      }

      activate(params, routeConfig) {
        console.log('this id from query str '+params.id)
        this.routeConfig = routeConfig;
        return this._applicantService.getApplicant(params.id).then(applicant => {
          this.applicant = applicant;
          this.ea.publish(new ApplicantViewed(this.applicant));
        });
    
      
      }
      delete(){
        return this._applicantService.deleteApplicant(this.applicant.id).then(applicant => {
          this.applicant = applicant;
          this.url=this.route.generate("applicants");
          this.route.navigate(this.url);
        });
      }
    
      
}