  import { ApplicantService } from './core/services/helpers/http.helper.service';
  import { inject } from 'aurelia-framework';
  import {DialogService} from 'aurelia-dialog';
  import { Applicant } from 'core/models/applicants';
  import { DeleteDialogPrompt } from './delete-dialog';
import { UpdateApplicant } from 'update-applicant';

@inject(ApplicantService,DialogService)
export class ApplicantList {
  dialogService:any;
  routeConfig:any;
  url:any;
  message:any;
  applicant:any;
   id:any;
   ea:any;
  applicants: Applicant[] = this.getMockApplicantsList();
  private _applicantService: ApplicantService;
  constructor(applicantService,DialogService,){
    this.dialogService=DialogService;
    this._applicantService = applicantService;
  }
  activate(params){
    this.id=params.id;
  
    
  }
 
  bind(bindingContext, overrideContext) {
    this._applicantService.getApplicants().then(
      (response) => {
        this.applicants = response;
      },
      (error) => {
        console.log(`Error occued while fetching applicants -> `, error);
      }
    );
  }

  openDelete() {
    this.dialogService.open( {viewModel: DeleteDialogPrompt, model: this.id}).then(response => {

    this.applicant=response;
   
    });
 } 
 openUpdate()
 {
  this.dialogService.open( {viewModel: UpdateApplicant, model: this.id}).then(response => {

    this.applicant=response;
   
    });
 }
  private getMockApplicantsList(): Applicant[] {
    return [
      {
        id: 1,
        name: 'Simon',
        familyName: 'Bassey',
        emailAddress: 'simon.dev.bassey@gmail.com',
        age: 27,
        hired: false,
        countryOfOrigin: 'Nigeria', address:'Cross River Calabar'
      },
      {
        id: 1,
        name: 'Lawrence',
        familyName: 'Enang',
        emailAddress: 'enanglaw@gmail.com',
        age: 34,
        hired: false,
        countryOfOrigin: 'Nigeria',address:'Cross River Calabar'


      }
    ]
  }
}
