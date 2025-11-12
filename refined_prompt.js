/**
 * Convert a value to camelCase.
 *
 * Accepts a string or number. Numbers will be coerced to strings before processing.
 *
 * Behavior:
 *  - Treats spaces, underscores (_) and hyphens (-) as word separators.
 *  - Consecutive separators are treated as a single separator.
 *  - Leading and trailing separators are ignored.
 *  - After splitting on separators:
 *      - The first segment is lowercased.
 *      - Subsequent segments are lowercased and then capitalized (first character uppercased).
 *  - If the input contains no separators:
 *      - If the entire string is upper-case, it is lowercased (e.g. "SCREEN_NAME" -> "screenName"
 *        when separated; but "SCREAM" -> "scream" when no separators).
 *      - Otherwise the original string is returned unchanged (preserves existing camelCase or other desired casing).
 *  - Empty or whitespace-only input returns an empty string.
 *
 * Error handling:
 *  - Non-string and non-number inputs throw a TypeError.
 *
 * Examples:
 *  toCamelCase('first name')    // -> 'firstName'
 *  toCamelCase('user_id')       // -> 'userId'
 *  toCamelCase('SCREEN_NAME')   // -> 'screenName'
 *  toCamelCase('mobile-number') // -> 'mobileNumber'
 *  toCamelCase(123)             // -> '123'
 *  toCamelCase('alreadyCamel')  // -> 'alreadyCamel'  (unchanged)
 *
 * @function toCamelCase
 * @param {string|number} input - The value to convert to camelCase.
 * @returns {string} A camelCased string. Returns an empty string for empty/whitespace-only input.
 * @throws {TypeError} If input is not a string or number.
 * @see module.exports
 */

/**
 * Convert a value to dot.case (lowercase segments separated by dots).
 *
 * Accepts a string or number. Numbers will be coerced to strings before processing.
 *
 * Processing steps:
 *  - Trim leading and trailing whitespace; empty or whitespace-only input returns an empty string.
 *  - Insert a dot between a lowercase/number character and an uppercase character to break camelCase
 *    boundaries (e.g. "firstName" -> "first.Name").
 *  - Replace any sequence of characters that are not ASCII letters, digits, or dots with a single dot.
 *    This converts spaces, underscores, hyphens, and other punctuation to dots.
 *  - Collapse consecutive dots into a single dot and remove leading/trailing dots.
 *  - Split on dots, lowercase each segment, and re-join with a single dot.
 *  - If the result is empty after trimming/collapsing, return an empty string.
 *
 * Notes:
 *  - Dots introduced by the camelCase boundary step and those from non-alphanumeric replacement are both
 *    normalized by the collapse step so the final result contains no empty segments.
 *  - Only ASCII letters and digits are considered alphanumeric for the replacement step.
 *
 * Examples:
 *  toDotCase('firstName')        // -> 'first.name'
 *  toDotCase('user_id')          // -> 'user.id'
 *  toDotCase('SCREEN_NAME')      // -> 'screen.name'
 *  toDotCase('mobile-number')    // -> 'mobile.number'
 *  toDotCase('  multiple   sep ')// -> 'multiple.sep'
 *  toDotCase(2021)               // -> '2021'
 *
 * @function toDotCase
 * @param {string|number} input - The value to convert to dot.case.
 * @returns {string} A dot-separated, lowercase string. Returns an empty string for empty/whitespace-only input
 *                   or if all characters are removed by normalization.
 * @throws {TypeError} If input is not a string or number.
 * @see module.exports.toDotCase
 */
function toCamelCase(input) {
    if (typeof input === 'number') input = String(input);
    if (typeof input !== 'string') {
        throw new TypeError('toCamelCase expects a string or number');
    }

    const str = input.trim();
    if (str.length === 0) return '';

    // If there are no separators, preserve existing camelCase unless the
    // string contains letters and is all uppercase (then lowercase it).
    const hasSeparator = /[\s_-]/.test(str);
    if (!hasSeparator) {
        if (/[A-Za-z]/.test(str) && str === str.toUpperCase()) {
            return str.toLowerCase();
        }
        return str;
    }

    const segments = str.split(/[\s_-]+/).filter(Boolean);
    if (segments.length === 0) return '';

    const first = segments[0].toLowerCase();
    const rest = segments.slice(1).map(seg => {
        const lower = seg.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    });

    return [first, ...rest].join('');
}

/* Example usage:
console.log(toCamelCase('first name'));       // firstName
console.log(toCamelCase('user_id'));         // userId
console.log(toCamelCase('SCREEN_NAME'));     // screenName
console.log(toCamelCase('mobile-number'));   // mobileNumber
console.log(toCamelCase(123));               // "123"
*/

function toDotCase(input) {
    if (typeof input === 'number') input = String(input);
    if (typeof input !== 'string') {
        throw new TypeError('toDotCase expects a string or number');
    }

    const str = input.trim();
    if (str.length === 0) return '';

    // Break camelCase boundaries: "firstName" -> "first.Name"
    let s = str.replace(/([a-z0-9])([A-Z])/g, '$1.$2');

    // Turn any sequence of characters that are not ASCII letters, digits, or dots into a dot
    s = s.replace(/[^A-Za-z0-9.]+/g, '.');

    // Collapse multiple dots and trim leading/trailing dots
    s = s.replace(/\.+/g, '.').replace(/^\.+|\.+$/g, '');
    if (s.length === 0) return '';

    // Lowercase all segments and join with dots
    return s.split('.').filter(Boolean).map(part => part.toLowerCase()).join('.');
}

module.exports = {
    toCamelCase,
    toDotCase
};


