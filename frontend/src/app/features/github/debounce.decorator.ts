/**
  * https://dev.to/scleriot/typescript-method-decorators-example-1imc
  * @param wait debounce time
  * @param immediate
  */
export function asd(wait: number, immediate: boolean = false): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        
        let timeout: any;
        let originalMethod = descriptor.value;
        console.log(originalMethod)
        descriptor.value = function () {
            let context = this;
            let args = arguments;
            let later = function () {
                timeout = null;
                if (!immediate) {
                    originalMethod.apply(context, args);
                }
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                originalMethod.apply(context, args);
            }
        };
        return descriptor;
    };
}