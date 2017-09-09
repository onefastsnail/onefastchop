// lets export some code for reuse
export function getCurrentTimestamp() {
    return Math.floor(Date.now() / 1000);
}

// lets execute some reg JS when this module is primarily bundled
// this will only be executed once
console.log(getCurrentTimestamp());
