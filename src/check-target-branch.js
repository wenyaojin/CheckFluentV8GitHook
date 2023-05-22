"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process = require("child_process");
var IGNORE_BRANCH_CHECK_ENV_VAR_NAME = 'IGNORE_BRANCH_CHECK';
if (process.env[IGNORE_BRANCH_CHECK_ENV_VAR_NAME] !== '1') {
    var getTargetBranch = function () {
        var revParseResult = child_process.spawnSync('git', ['--no-optional-locks', 'rev-parse', '--abbrev-ref', 'HEAD'], {
            encoding: 'utf-8'
        });
        return revParseResult.stdout.trim();
    };
    var targetBranch = getTargetBranch();
    if (targetBranch === 'main' || /^prod\/\d{4}-\d\d-\d\d$/.test(targetBranch)) {
        // eslint-disable-next-line no-console
        console.error("Committing to '".concat(targetBranch, "' requires a PR. Create a new branch to commit."));
        process.exit(1);
    }
}
