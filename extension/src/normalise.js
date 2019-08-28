//
var R = RegExp;

export const
STRIP_RULES = [
    [R('.*')                     , R('^\\w+://'         )],
    [R('.*')                     , R('(www|ww|amp)\\.'  )],
    [R('.*')                     , R('[&#].*$'          )],
    [
        [R('^(youtube|urbandictionary|tesco|scottaaronson|answers.yahoo.com|code.google.com)') , null],
        [R('.*'), R('[\\?].*$')],
    ],
    [R('.*')                     , R('/$'               )],
]
; // TODO perhaps that should be semi-configurable

export function normalise_url(url) {
    var cur = url;
    STRIP_RULES.forEach(function (thing) { // meh impure foreach..
        let first = thing[0];
        var rules = null;
        if (first instanceof Array) {
            rules = thing;
        } else {
            rules = [thing];
        }

        for (var i = 0; i < rules.length; i++) {
            let target = rules[i][0];
            let reg = rules[i][1];
            if (target[Symbol.search](cur) >= 0) {
                console.log("[normalise] %s: matched %s, applying %s", cur, target, reg);
                if (reg !== null) {
                    cur = reg[Symbol.replace](cur, '');
                }
                break;
            }
        }
    });
    return cur;
}

const _re = R('^(www|ww|amp)\\.'  );
export function normaliseHostname(url) {
    return _re[Symbol.replace](url, '');
}


export function normalisedURLHostname(url: Url): string {
    const _hostname = new URL(url).hostname;
    const hostname = normaliseHostname(_hostname);
    return hostname;
}
