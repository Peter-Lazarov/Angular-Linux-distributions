import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DesktopEnvironment } from '../types/desktop-environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor(private http: HttpClient) { }

  getEnvironmentAll() {
    return this.http.get<DesktopEnvironment[]>(`/api/environment`);
  }

  writeEnvironment(name: string, description: string, image: string) {
    return this.http.post<DesktopEnvironment>(`/api/environment/add`, { name, description, image });
  }

  getEnvironmentOne(environmentId: string) {
    return this.http.get<DesktopEnvironment>(`/api/environment/${environmentId}/details`);
  }
}
