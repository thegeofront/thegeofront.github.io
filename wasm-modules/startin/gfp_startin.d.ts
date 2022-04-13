/* tslint:disable */
/* eslint-disable */
/**
* @param {boolean} a
* @returns {Float64Array}
*/
export function points(a: boolean): Float64Array;
/**
*/
export function start(): void;
/**
*/
export class Matrix {
  free(): void;
/**
* @param {number} width
* @param {number} height
* @returns {Matrix}
*/
  static new(width: number, height: number): Matrix;
/**
* @param {Float64Array} vec
* @param {number} width
* @returns {Matrix}
*/
  static new_from_vec(vec: Float64Array, width: number): Matrix;
/**
* @param {number} row
* @param {number} col
* @param {number} value
* @returns {boolean}
*/
  set(row: number, col: number, value: number): boolean;
/**
* @param {number} row
* @param {Float64Array} values
* @returns {boolean}
*/
  set_row(row: number, values: Float64Array): boolean;
/**
* @param {number} row
* @param {number} col
* @returns {number}
*/
  get(row: number, col: number): number;
/**
* @returns {Float64Array}
*/
  to_vec(): Float64Array;
}
/**
*/
export class Triangulation {
  free(): void;
/**
* @param {boolean} b
* @returns {Triangulation}
*/
  static new_default(b: boolean): Triangulation;
/**
* @param {Float64Array} pts
* @returns {Triangulation}
*/
  static new_from_vec(pts: Float64Array): Triangulation;
/**
* @returns {Triangulation}
*/
  static new(): Triangulation;
/**
* @param {Float64Array} pts
*/
  insert(pts: Float64Array): void;
/**
* @param {number} px
* @param {number} py
* @param {number} pz
* @returns {boolean}
*/
  insert_one_pt(px: number, py: number, pz: number): boolean;
/**
* @returns {number}
*/
  number_of_vertices(): number;
/**
* @returns {number}
*/
  number_of_triangles(): number;
/**
* @returns {Float64Array}
*/
  all_vertices(): Float64Array;
/**
* @returns {Uint32Array}
*/
  all_edges(): Uint32Array;
/**
* @returns {Uint32Array}
*/
  all_triangles(): Uint32Array;
/**
* @param {number} px
* @param {number} py
* @returns {number}
*/
  closest_point(px: number, py: number): number;
/**
* @param {number} v
* @returns {boolean}
*/
  remove(v: number): boolean;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_triangulation_free: (a: number) => void;
  readonly triangulation_new_default: (a: number) => number;
  readonly triangulation_new_from_vec: (a: number, b: number) => number;
  readonly triangulation_new: () => number;
  readonly triangulation_insert: (a: number, b: number, c: number) => void;
  readonly triangulation_insert_one_pt: (a: number, b: number, c: number, d: number) => number;
  readonly triangulation_number_of_vertices: (a: number) => number;
  readonly triangulation_number_of_triangles: (a: number) => number;
  readonly triangulation_all_vertices: (a: number, b: number) => void;
  readonly triangulation_all_edges: (a: number, b: number) => void;
  readonly triangulation_all_triangles: (a: number, b: number) => void;
  readonly triangulation_closest_point: (a: number, b: number, c: number) => number;
  readonly triangulation_remove: (a: number, b: number) => number;
  readonly __wbg_matrix_free: (a: number) => void;
  readonly matrix_new: (a: number, b: number) => number;
  readonly matrix_new_from_vec: (a: number, b: number, c: number) => number;
  readonly matrix_set: (a: number, b: number, c: number, d: number) => number;
  readonly matrix_set_row: (a: number, b: number, c: number, d: number) => number;
  readonly matrix_get: (a: number, b: number, c: number) => number;
  readonly matrix_to_vec: (a: number, b: number) => void;
  readonly points: (a: number, b: number) => void;
  readonly start: () => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_start: () => void;
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
