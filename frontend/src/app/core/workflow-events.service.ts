import { Injectable } from '@angular/core';

import { environment } from '@env/environment';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class WorkflowEventsService {
  private readonly WORKFLOW_EVENTS = environment['workflow'];
  private userRoles: Set<string>;
  constructor(private authSvc: AuthService) {
  }
  public checkAuthorization(path: any): Observable<boolean> {
    if (!this.userRoles) {
      return this.authSvc.userInfo()
        .pipe(
          map((userData: any) => userData.roles),
          tap((userRoles: any) => {
            const roles = userRoles.map(role => role.name);
            this.userRoles = new Set(roles);
          }),
          map(res => this.doCheckAuthorization(path))
        );
    }
    return of(this.doCheckAuthorization(path));
  }

  private doCheckAuthorization(path: string[]): boolean {
    if (path.length) {
      const entry = this.findEntry(this.WORKFLOW_EVENTS, path);
      if (entry && entry['permittedRoles']
        && this.userRoles.size) {
        return entry.permittedRoles
          .some(permittedRole => this.userRoles.has(permittedRole));
      }
      return false;
    }
    return false;
  }
  /**
   * Recursively find workflow-map entry based on the path strings
   */
  private findEntry(currentObject: any, keys: string[], index = 0) {
    const key = keys[index];
    if (currentObject[key] && index < keys.length - 1) {
      return this.findEntry(currentObject[key], keys, index + 1);
    } else if (currentObject[key] && index === keys.length - 1) {
      return currentObject[key];
    } else {
      return false;
    }
  }
}
