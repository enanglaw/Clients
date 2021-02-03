import {bindable,observable} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';

export class App 
{
  router:any;
  controller = null;
  
    constructor() 
    {
    
    }
    configureRouter(config, router){
      config.title = 'Hahn Applicant Application Process';
      this.router = router;
      config.options.pushState = true;
      config.options.root = '/';
      config.map([
        
       { route: ['','/','/applicants/'],  moduleId: PLATFORM.moduleName('applicants-list'), name:'applicants'},
       { route: 'applicants/:id',  moduleId: PLATFORM.moduleName('applicants-list'), name:'del'},
       { route: 'applicants/detail/:id',  moduleId: PLATFORM.moduleName('applicant-detail'), name:'detail'},
   
       { route: 'applicants/add',  moduleId: PLATFORM.moduleName('add-applicants'),   name: 'add'},
     //{ route:'applicants/edit/:id', moduleId:PLATFORM.moduleName('update-applicant'), name:'edit'},
       { route:'applicants/edit/:id', moduleId:PLATFORM.moduleName('applicants-list'), name:'edit'},
       { route:'applicants/delete/:id', moduleId:PLATFORM.moduleName('delete-applicant'), name:'delete'}
      ]);
  
    
    }

  }