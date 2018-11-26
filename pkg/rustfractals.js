/* tslint:disable */
import * as wasm from './rustfractals_bg';

/**
* @param {Complex} arg0
* @param {Complex} arg1
* @returns {Complex}
*/
export function mul(arg0, arg1) {
    const ptr0 = arg0.ptr;
    arg0.ptr = 0;
    const ptr1 = arg1.ptr;
    arg1.ptr = 0;
    return Complex.__wrap(wasm.mul(ptr0, ptr1));
}

/**
* @param {Complex} arg0
* @param {Complex} arg1
* @returns {Complex}
*/
export function add(arg0, arg1) {
    const ptr0 = arg0.ptr;
    arg0.ptr = 0;
    const ptr1 = arg1.ptr;
    arg1.ptr = 0;
    return Complex.__wrap(wasm.add(ptr0, ptr1));
}

/**
* @param {Complex} arg0
* @param {Complex} arg1
* @returns {Complex}
*/
export function sub(arg0, arg1) {
    const ptr0 = arg0.ptr;
    arg0.ptr = 0;
    const ptr1 = arg1.ptr;
    arg1.ptr = 0;
    return Complex.__wrap(wasm.sub(ptr0, ptr1));
}

/**
* @param {Complex} arg0
* @param {number} arg1
* @returns {Complex}
*/
export function sub_f64(arg0, arg1) {
    const ptr0 = arg0.ptr;
    arg0.ptr = 0;
    return Complex.__wrap(wasm.sub_f64(ptr0, arg1));
}

/**
* @param {Complex} arg0
* @returns {number}
*/
export function abs(arg0) {
    const ptr0 = arg0.ptr;
    arg0.ptr = 0;
    return wasm.abs(ptr0);
}

/**
* @param {Complex} arg0
* @returns {number}
*/
export function arg(arg0) {
    const ptr0 = arg0.ptr;
    arg0.ptr = 0;
    return wasm.arg(ptr0);
}

/**
* @param {Complex} arg0
* @param {number} arg1
* @returns {Complex}
*/
export function scale(arg0, arg1) {
    const ptr0 = arg0.ptr;
    arg0.ptr = 0;
    return Complex.__wrap(wasm.scale(ptr0, arg1));
}

/**
* @param {Complex} arg0
* @returns {number}
*/
export function norm_sqr(arg0) {
    const ptr0 = arg0.ptr;
    arg0.ptr = 0;
    return wasm.norm_sqr(ptr0);
}

/**
* @param {Complex} arg0
* @param {Complex} arg1
* @returns {Complex}
*/
export function div(arg0, arg1) {
    const ptr0 = arg0.ptr;
    arg0.ptr = 0;
    const ptr1 = arg1.ptr;
    arg1.ptr = 0;
    return Complex.__wrap(wasm.div(ptr0, ptr1));
}

/**
* @param {Complex} arg0
* @returns {Complex}
*/
export function zfunc(arg0) {
    const ptr0 = arg0.ptr;
    arg0.ptr = 0;
    return Complex.__wrap(wasm.zfunc(ptr0));
}

/**
* @param {Complex} arg0
* @returns {Complex}
*/
export function dfunc(arg0) {
    const ptr0 = arg0.ptr;
    arg0.ptr = 0;
    return Complex.__wrap(wasm.dfunc(ptr0));
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

function getArrayU32FromWasm(ptr, len) {
    return getUint32Memory().subarray(ptr / 4, ptr / 4 + len);
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
}
/**
* @param {number} arg0
* @param {number} arg1
* @param {number} arg2
* @returns {Uint32Array}
*/
export function wasmdraw(arg0, arg1, arg2) {
    const retptr = globalArgumentPtr();
    wasm.wasmdraw(retptr, arg0, arg1, arg2);
    const mem = getUint32Memory();
    const rustptr = mem[retptr / 4];
    const rustlen = mem[retptr / 4 + 1];

    const realRet = getArrayU32FromWasm(rustptr, rustlen).slice();
    wasm.__wbindgen_free(rustptr, rustlen * 4);
    return realRet;

}

/**
* @param {number} arg0
* @param {number} arg1
* @returns {number}
*/
export function i_to_u(arg0, arg1) {
    return wasm.i_to_u(arg0, arg1);
}

function freeComplex(ptr) {

    wasm.__wbg_complex_free(ptr);
}
/**
*/
export class Complex {

    static __wrap(ptr) {
        const obj = Object.create(Complex.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeComplex(ptr);
    }

    /**
    * @returns {number}
    */
    get re() {
        return wasm.__wbg_get_complex_re(this.ptr);
    }
    set re(arg0) {
        return wasm.__wbg_set_complex_re(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get im() {
        return wasm.__wbg_get_complex_im(this.ptr);
    }
    set im(arg0) {
        return wasm.__wbg_set_complex_im(this.ptr, arg0);
    }
}

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}
