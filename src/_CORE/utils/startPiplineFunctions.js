/**
 * Function 'start' get arr of arr with func and its arguments
 * arr = [
 *   [func, [arg1, arg2, ...]], 
 *   [func, [arg1, arg2, ...]], 
 *    ...
 * ]
 * And execute as pipline one after anoter. 
 * All functions must call its callbacks 
 */


export const start = arr => iterateArrF(arr.map(data => on => () => data[0](...data[1], on)))

const iterateArrF = arrF => {
    const iterate = i => arrF[i] && arrF[i](() => iterate(++i))()
    iterate(0)
}