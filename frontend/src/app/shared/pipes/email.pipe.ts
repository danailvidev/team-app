import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'emailToUser'
})
export class EmailToUserPipe implements PipeTransform {
    transform(value: string): string {
        const emailName = value.split('@')[0];
        return `@${emailName}`;
      }
}