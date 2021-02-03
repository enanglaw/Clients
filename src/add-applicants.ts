

import { ApplicantService} from './core/services/helpers/http.helper.service';
import { inject,NewInstance} from 'aurelia-framework';
import { Router } from 'aurelia-router';
  import {EventAggregator} from 'aurelia-event-aggregator';
  import {ApplicantAdded} from './messages';
import { ValidationController, ValidationRules,validateTrigger, } from 'aurelia-validation';
import { BootstrapFormRenderer } from 'core/services/bootstrap-form-renderer';
import *as toastr from 'toastr';




@inject(ApplicantService,EventAggregator, Router, 
  NewInstance.of(ValidationController),BootstrapFormRenderer,toastr )
export class AddApplicant {
    url:any;
    originalApplicant:any;
    route:any;
    applicantRules:any;
    validator:any;
    applicantValidationController:any;
    routeConfig:any;
    applicant:any; 
    ol:any;
     ea:any;
        private _applicantService: ApplicantService;
        constructor(applicantService, ea, Router, ValidationController,ObserverLocator,toastr ){
        this._applicantService = applicantService;
        this.route=Router;
        this.applicant={};
        toastr=toastr;
        this.ea = ea;
        this.ol=ObserverLocator;
        this.applicantValidationController=ValidationController;
        //this.applicantValidationController=ValidationControllerFactory.createForCurrentScope();
        this.applicantValidationController.addRenderer(new BootstrapFormRenderer());
       
        this.applicantValidationController.validateTrigger = validateTrigger.manual;
      }
    bind(){
      ValidationRules
      .ensure('name').displayName('First Name').required()
      .withMessage(`\${$displayName} cannot be blank.`)
      .minLength(5).withMessage(`\${$displayName}  must be at least 5 Character long.`)
      .ensure('familyName').displayName('Family Name').required()
      .withMessage(`\${$displayName} cannot be blank.`)
      .minLength(5).withMessage(`\${$displayName} must be at least 5 Character long.`)
      .ensure('address').displayName('Address').required().withMessage(`\${$displayName} cannot be blank.`)
      .minLength(10).withMessage(`\${$displayName} length must be at least 10 Character long.`)
      .ensure('countryofOrigin').displayName('Country of Origin').required().withMessage(`\${$displayName} cannot be blank.`)
      .ensure('emailAddress').displayName('Email Address').required().email().withMessage(`\${$displayName} cannot be blank.`)
      .ensure('age').displayName('Age').required().between(20,60).withMessage(`\${$displayName} range must be between 20 and 60.`)
      .ensure('hired').displayName('Hired Status').required().withMessage(`\${$displayName} cannot be blank.`)
     
     
        .on(this.applicant);
        
    }
      activate(params, routeConfig) {
        this.routeConfig = routeConfig;
    
      }
      save()
      { 
       this.applicantValidationController.validate()
       .then((results) => {
         if(results.valid) 
         {
           this._applicantService.addApplicant(this.applicant)
           .then(applicant => {
           this.applicant = applicant;
           toastr.success(this.applicant.name+' Added successfully!');
           this.routeConfig.navModel.setTitle(this.applicant.name);
           this.ea.publish(new ApplicantAdded(this.applicant));
           this.url=this.route.generate("applicants")
           this.route.navigate(this.url);
           
           });
          
         }
        else 
        {
           console.log("Validation failed!", results);
         }
       });
      }
  
}
