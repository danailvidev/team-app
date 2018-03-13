import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
    transform(enumArray, args: string[]): any {
        const keys = [];
        for (const enumMember in enumArray) {
            if (!isNaN(parseInt(enumMember, 10))) {
                keys.push({ value: enumMember, label: enumArray[enumMember] });
            }
        }
        return keys;
    }
}