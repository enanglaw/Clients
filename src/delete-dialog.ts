import {inject, bindable} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import { ApplicantService} from './core/services/helpers/http.helper.service';
import {  Router} from 'aurelia-router';
import *as toastr from 'toastr';


@inject(DialogController,ApplicantService,Router,toastr)
export class DeleteDialogPrompt {
	route:any;
	url:any;
	applicant:any;
	applicantId:any;
	controller:any;
	_applicantService:any;
   constructor(controller,ApplicantService, Router, toastr) {
      this.controller = controller;
	  this.route=Router;
	  toastr=toastr;
	 this._applicantService=ApplicantService;
	  controller.settings.centerHorizontalOnly = true;
   }
   
   activate(id) {
	this.applicantId=id;
	return this._applicantService.getApplicant( this.applicantId).then(applicant => {
	  this.applicant = applicant;
	});
   }

   delete(){
	this.controller.ok().then(()=>{
		   return this._applicantService.deleteApplicant(this.applicant.id)
		   .then(applicant => {
			this.applicant = applicant;
		    
		
			toastr.success(' Deleted successfully!');
			this.route.navigateToRoute('applicants');
			  window.location.reload(true);
			});
	      });
  } 
  cancel(){
	  this.controller.cancel().then(()=>{
		this.applicant.success(' Cancelled successfully!');
		this.url=this.route.generate("applicants");
		this.route.navigate(this.url);

	  });
	 
  }
   
}

