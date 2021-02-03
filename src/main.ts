import {Aurelia} from 'aurelia-framework';
import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'ti-icons/css/themify-icons.css';
import 'jquery';
import  'toastr/build/toastr.min.css';
import 'bootstrap/js/dist';
import {GlobalValidationConfiguration, validateTrigger} from 'aurelia-validation';
import { BootstrapFormRenderer } from 'core/services/bootstrap-form-renderer';
export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('aurelia-dialog'), (configuration) => {
      configuration.useResource('attach-focus');
    })
    .instance('apiRoot','https://localhost:5001/')
    .plugin('aurelia-validation', (config: GlobalValidationConfiguration) => {
      config.defaultValidationTrigger(validateTrigger.manual)})
    .feature(PLATFORM.moduleName('resources/index'));
    aurelia.container.registerHandler(
      "applicant-renderer",
      container => container.get(BootstrapFormRenderer));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
