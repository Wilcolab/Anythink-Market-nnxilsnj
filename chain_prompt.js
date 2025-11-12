/**
 * Convert a string to kebab-case:
 * - returns null if input === null
 * - throws for non-string non-null inputs
 * - trims extra spaces, collapses interior whitespace to single hyphens
 * - removes non-alphanumeric characters (preserves hyphens)
 * - returns empty string for input that's only whitespace
 *
 * Examples:
 *   toKebabCase("this shit IS SO Tiring bruh") === "this-shit-is-so-tiring-bruh"
 *   toKebabCase(null) === null
 *
 * @param {string|null} input
 * @returns {string|null}
 */
function toKebabCase(input) {
    if (input === null) return null;
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string or null');
    }

    const trimmed = input.trim();
    if (trimmed.length === 0) return '';

    // Replace any sequence of whitespace with a single hyphen
    let kebab = trimmed.replace(/\s+/g, '-');

    // Remove characters that are not letters, numbers, or hyphens
    kebab = kebab.replace(/[^A-Za-z0-9-]+/g, '');

    // Collapse multiple hyphens that may have formed
    kebab = kebab.replace(/-+/g, '-');

    kebab = kebab.toLowerCase();

    // Ensure result has at least one alphanumeric character
    if (!/[a-z0-9]/.test(kebab)) {
        throw new Error('Input cannot be converted to a valid kebab-case string');
    }

    return kebab;
}

module.exports = { toKebabCase };