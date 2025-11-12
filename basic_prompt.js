function camelCase(a, b) {
    a = String(a);
    b = String(b);
    if (b.length === 0) return a;
    return a + b[0].toUpperCase() + b.slice(1);
}

module.exports = camelCase;