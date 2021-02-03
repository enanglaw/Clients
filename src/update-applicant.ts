

  import { ApplicantService} from './core/services/helpers/http.helper.service';
  import { inject,NewInstance } from 'aurelia-framework';
  import { Router } from 'aurelia-router';
  import {EventAggregator} from 'aurelia-event-aggregator';
  import {ApplicantUpdated,ApplicantViewed} from './messages';
  import { ValidationController, ValidationRules,validateTrigger} from 'aurelia-validation';
  import { BootstrapFormRenderer } from 'core/services/bootstrap-form-renderer';
  import *as toastr from 'toastr';
  import {DialogController} from 'aurelia-dialog';
  

@inject(ApplicantService,EventAggregator, 
  Router,DialogController,toastr,
  NewInstance.of(ValidationController),BootstrapFormRenderer)
export class UpdateApplicant {
     url:any;
     originalApplicant:any;
     applicantId:any;
     route:any;
     applicantValidationController:any;
     applicant:any; 
     ea:any;
     applicantValidation:any;
     dialogController:any;
        private _applicantService: ApplicantService;
        constructor(applicantService, ea, Router,DialogController,toastr,ValidationController,){
        this._applicantService = applicantService;
        this.dialogController=DialogController
        this.applicant={};
        this.route=Router;
        this.ea = ea;
        toastr=toastr;
        this.applicantValidationController=ValidationController;
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
      activate(id) 
      {
        this.applicantId=id;
        return this._applicantService.getApplicant(this.applicantId)
        .then(applicant => 
          {
          this.applicant = applicant;
          this.originalApplicant = JSON.parse(JSON.stringify(applicant));
          this.ea.publish(new ApplicantViewed(this.applicant));
         });
      }
     
      save() 
      {
        this.dialogController.ok()
        .then(()=>{ 
          this.applicantValidationController.validate().then((result)=>{
           if(result.valid)
           {
            this._applicantService.updateApplicant(this.applicant.id,this.applicant)
            .then(applicant => { this.applicant = applicant;});
            toastr.success(this.applicant.name+' updated successfully!');
            this.ea.publish(new ApplicantUpdated(this.applicant));
		        window.location.reload(true); 
           } 
          
          });
            

       });
      }
      cancel(){
        this.dialogController.cancel().then(()=>{
        toastr.success(' Cancelled successfully!');
        this.url=this.route.generate("applicants");
        this.route.navigate(this.url);
    
        });
       
      }
     
    }