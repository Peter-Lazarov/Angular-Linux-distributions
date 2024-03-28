import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperatingSystem } from '../types/operating-system';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private http: HttpClient) { }

  getSystemAll() {
    return this.http.get<OperatingSystem[]>(`/api/system`);
  }

  createSystem(name: string, environmentDescription: string) {
    return this.http.post<OperatingSystem>(`/api/system/add`, { name, environmentDescription });
  }
}
