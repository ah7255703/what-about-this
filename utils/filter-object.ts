export function filterObject<T extends object, U extends keyof T>(
    obj: T,
    keys: ReadonlyArray<U> | U[]
): Pick<T, U> {
    const keyList = Array.isArray(keys) ? keys : Object.keys(keys) as U[];
    const filteredObject = {} as Pick<T, U>;
    for (const key of keyList) {
        if (key in obj) {
            filteredObject[key] = obj[key];
            delete obj[key];
        }
    }
    return filteredObject;
}
