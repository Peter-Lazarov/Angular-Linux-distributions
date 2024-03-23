import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiObject } from 'src/environments/variables'
import { OperatingSystem } from '../types/operating-system';

@Injectable({
  providedIn: 'root'
})
export class DistributionService {

  constructor(private http: HttpClient) { }

  getDistributions() {
    const api = apiObject.apiUrl;
    return this.http.get<OperatingSystem[]>(`${api}/distributions`)
  }


}
