import { inject } from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client'
import { Applicant } from 'core/models/applicants';

@inject(HttpClient,"apiRoot")
export class ApplicantService {
    isRequesting = false;apiRoot:any;
    applicants:any;
    private _httpClient: HttpClient;
    private applicantsBaseUrl = 'https://localhost:5001/api/applicants';
    constructor(http: HttpClient, apiRoot){
        this._httpClient = http;
this.apiRoot=apiRoot;
        this._httpClient.configure(config => {
            config.withBaseUrl(this.applicantsBaseUrl)
        });
    }

    getApplicants(): Promise<Applicant[]> {
        return new Promise<Applicant[]>((resolve, reject) => {
            this._httpClient.fetch('')
                .then(response => response.json())
                .then(applicants => resolve(applicants))
                .catch(error => reject(error));
        });
    }

    getApplicant(id: number): Promise<Applicant> {
        this.isRequesting = true;
        return new Promise<Applicant>((resolve, reject) => {
            this._httpClient.fetch(`/${id}`)
                .then(response => response.json())
                .then(applicants => resolve(applicants))
                .catch(error => reject(error));
        });
    }
    addApplicant(applicant: Applicant): Promise<Applicant> {
        
        return new Promise<Applicant>((resolve, reject) => {
            this._httpClient.fetch(``, {
                method: 'post',
                body: json(applicant)
            })
                .then(response => response.json())
                .then(applicants => resolve(applicants))
                .catch(error => reject(error));
        });
    }
    addApplicants(applicant: Applicant): Promise<Applicant> {
        
        return new Promise<Applicant>((resolve, reject) => {
            this._httpClient.fetch(this.apiRoot+'api/applicants', {
                method: 'post',
                
                body: json(applicant),
                
            })
                .then(response => response.json())
                .then(applicants =>
                    {
                    resolve(applicants);
                    }
               )
                .catch(error => reject(error));
        });
    }

    updateApplicant(id: number, updatedInfo: Applicant): Promise<Response>{
        return new Promise<Response>((resolve, reject) => {
            this._httpClient.fetch(`/${id}`, {
                method: 'put',
                body: json(updatedInfo)
            })
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    }
    

    deleteApplicant(id: number): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            this._httpClient.fetch(`/${id}`, {
                method: 'delete'
            })
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    }
}
