export type Fn<T extends any[], R> = (...args: T) => R;
export type PropKey = string | number;
export type Obj<T = any> = Record<PropKey, T>;

type Callback = Fn<[...any], any>;

export function createEmitter() {
  const fns = <Obj<Callback[]>>{};

  const emit = (key: string, ...args: unknown[]) => {
    fns[key]?.forEach((fn) => fn(...args));
  };

  const off = (key: string, fn: Callback) => {
    fns[key] = fns[key].filter((f: Callback) => f !== fn);
  };

  const on = (key: string, fn: Callback) => {
    fns[key] ||= [];
    if (!fns[key].includes(fn)) fns[key] = fns[key].concat(fn);
    return () => off(key, fn);
  };

  return { emit, off, on };
}

export const emitter = createEmitter();
