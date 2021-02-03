



import { inject,NewInstance } from 'aurelia-framework';
import { ValidationController, ValidationRules,validateTrigger} from 'aurelia-validation';
import { BootstrapFormRenderer } from 'core/services/bootstrap-form-renderer';

  @inject(NewInstance.of(ValidationController),BootstrapFormRenderer)
export class ApplicantValidation
{
    public applicant:any; 
    public applicantValidationController:any;
   constructor(ValidationController){
    this.applicant={};
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
}