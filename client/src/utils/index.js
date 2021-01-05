export function getStringLength(s) {
    const str = s.trim();
    var slength = 0;
    for (let i = 0; i < str.length; i++) {
        if ((str.charCodeAt(i) >= 0) && (str.charCodeAt(i) <= 255))
            slength = slength + 1;
        else
            slength = slength + 2;
    }
    return slength;
};