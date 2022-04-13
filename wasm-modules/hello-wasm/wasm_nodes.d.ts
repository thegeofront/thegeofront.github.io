/* tslint:disable */
/* eslint-disable */
/**
*/
export function greet(): void;
/**
* @param {number} a
* @param {number} b
* @returns {number}
*/
export function add(a: number, b: number): number;
/**
* @param {number} kaas
* @param {number} b
* @param {number} c
* @returns {number}
*/
export function testietestie(kaas: number, b: number, c: number): number;
/**
* @param {number} a
* @param {number} b
* @returns {number}
*/
export function subtract(a: number, b: number): number;
/**
* @param {number} a
* @param {number} length
* @returns {Float32Array}
*/
export function get_list(a: number, length: number): Float32Array;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly greet: () => void;
  readonly add: (a: number, b: number) => number;
  readonly testietestie: (a: number, b: number, c: number) => number;
  readonly subtract: (a: number, b: number) => number;
  readonly get_list: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
