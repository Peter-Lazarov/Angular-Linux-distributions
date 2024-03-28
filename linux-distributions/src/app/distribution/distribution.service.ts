import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Distribution } from '../types/distribution';

@Injectable({
  providedIn: 'root'
})
export class DistributionService {

  constructor(private http: HttpClient) { }

  getDistributionAll() {
    return this.http.get<Distribution[]>(`/api/distribution`);
  }

  writeDistribution(name: string, description: string, image: string) {
    return this.http.post<Distribution>(`/api/distribution/add`, { name, description, image });
  }
}
