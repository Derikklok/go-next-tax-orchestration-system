import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { Observable } from "rxjs";
import { TaskListResponse } from "../models/task.model";

@Injectable({
    providedIn:'root'
})
export class TaskApiService{
    private http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiBaseUrl}/tasks`;

    // Service Functions

    // Get All Tasks
    getTasks() : Observable<TaskListResponse>{
        return this.http.get<TaskListResponse>(this.baseUrl);
    }
}