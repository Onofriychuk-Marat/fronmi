export const UseIfHave = (keyObjects: string[]) => {
  return (
    target: any,
    memberName: string,
    propertyDescriptor: PropertyDescriptor,
  ) => {
    return {
      get(): any {
        const wrapperFn = (...args: any[]) => {
          keyObjects.forEach((key) => {
            if (!this[key]) {
              throw new Error(`You can^t use this metod without ${key}`);
            }
          });
          return propertyDescriptor.value.apply(this, args);
        };
        Object.defineProperty(this, memberName, {
          value: wrapperFn,
          configurable: true,
          writable: true,
        });
        return wrapperFn;
      },
    };
  };
};
