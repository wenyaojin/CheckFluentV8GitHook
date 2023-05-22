import * as child_process from 'child_process';

const IGNORE_BRANCH_CHECK_ENV_VAR_NAME: string = 'IGNORE_BRANCH_CHECK';

if (process.env[IGNORE_BRANCH_CHECK_ENV_VAR_NAME] !== '1') {
  const getTargetBranch = () => {
    const revParseResult: child_process.SpawnSyncReturns<string> = child_process.spawnSync(
      'git',
      ['--no-optional-locks', 'rev-parse', '--abbrev-ref', 'HEAD'],
      {
        encoding: 'utf-8'
      }
    );

    return revParseResult.stdout.trim();
  }

  const targetBranch: string = getTargetBranch();
  if (targetBranch === 'main' || /^prod\/\d{4}-\d\d-\d\d$/.test(targetBranch)) {
    // eslint-disable-next-line no-console
    console.error(`Committing to '${targetBranch}' requires a PR. Create a new branch to commit.`);
    process.exit(1);
  }
}
