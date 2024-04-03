import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperatingSystem, OperatingSystemWithCommentariesAndPublisher } from '../types/operating-system';
import { Commentary, CommentaryForShow } from '../types/commentary';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private http: HttpClient) { }

  getSystemAll() {
    return this.http.get<OperatingSystem[]>(`/api/system`);
  }

  getSystemOne(systemId: string) {
    return this.http.get<OperatingSystemWithCommentariesAndPublisher>(`/api/system/${systemId}/details`);
  }

  addSystem(name: string, environment: string, distribution: string) {
    return this.http.post<OperatingSystem>(`/api/system/add`, { name, environment, distribution });
  }

  update(systemId: string, name: string, environment: string, distribution: string) {
    return this.http.put<OperatingSystemWithCommentariesAndPublisher>(`/api/system/${systemId}/update`, {
      name, environment, distribution
    })
  }

  addCommentary(content: string, systemId: string, userId: string | undefined) {
    return this.http.post<Commentary>(`/api/commentary/${systemId}/add`, {
      content, systemId, userId
    })
  }
  
  getCommentaryAll(systemId: string){   
    return this.http.get<CommentaryForShow[]>(`/api/commentary/${systemId}`);
  }

  deleteSystem(systemId: string){
    return this.http.delete<OperatingSystem>(`/api/system/${systemId}/delete`);
  }
}
