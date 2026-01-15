#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const TEXT_FILE = path.join(__dirname, 'text.md');

const WORDS = [
  'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta',
  'iota', 'kappa', 'lambda', 'sigma', 'omega', 'phoenix', 'dragon',
  'quantum', 'nebula', 'cosmic', 'stellar', 'aurora', 'vertex', 'matrix',
  'cipher', 'nexus', 'prism', 'echo', 'pulse', 'flux', 'nova', 'horizon',
  'zenith', 'apex', 'core', 'node', 'link', 'spark', 'wave', 'beam',
  'logic', 'data', 'sync', 'async', 'stream', 'buffer', 'cache', 'queue'
];

const BRANCH_PREFIXES = [
  'feature', 'fix', 'hotfix', 'bugfix', 'update', 'add', 'remove',
  'change', 'modify', 'refactor', 'improve', 'new', 'wip', 'test'
];

const COMMIT_TYPES = ['feat', 'fix', 'chore', 'docs'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomWords(count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(WORDS[getRandomInt(0, WORDS.length - 1)]);
  }
  return result.join(' ');
}

function getRandomKebabWords(count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(WORDS[getRandomInt(0, WORDS.length - 1)]);
  }
  return result.join('-');
}

function getRandomCommitType() {
  return COMMIT_TYPES[getRandomInt(0, COMMIT_TYPES.length - 1)];
}

function generateBadBranchName() {
  // Bad pattern: using prefixes like feature/, fix/, etc. with kebab-case
  const prefix = BRANCH_PREFIXES[getRandomInt(0, BRANCH_PREFIXES.length - 1)];
  const description = getRandomKebabWords(getRandomInt(2, 4));
  return `${prefix}/${description}`;
}

function generateCommitMessage() {
  const type = getRandomCommitType();
  const description = getRandomWords(getRandomInt(3, 6));
  return `${type}: ${description}`;
}

function generateNewLine() {
  return getRandomWords(getRandomInt(8, 15));
}

function run(command) {
  console.log(`> ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing: ${command}`);
    process.exit(1);
  }
}

function runSilent(command) {
  return execSync(command, { encoding: 'utf-8' }).trim();
}

function makeCommit(commitNumber) {
  // Read the text file
  const content = fs.readFileSync(TEXT_FILE, 'utf-8');
  const lines = content.split('\n');

  // Pick a random line to modify (skip first 2 lines which are header)
  const lineIndex = getRandomInt(2, lines.length - 2);
  const originalLine = lines[lineIndex];
  const newLine = generateNewLine();

  console.log(`\n--- Commit ${commitNumber} ---`);
  console.log(`Modifying line ${lineIndex + 1}:`);
  console.log(`  Old: "${originalLine}"`);
  console.log(`  New: "${newLine}"`);

  lines[lineIndex] = newLine;

  // Write the modified content
  fs.writeFileSync(TEXT_FILE, lines.join('\n'));

  // Stage and commit
  const commitMessage = generateCommitMessage();
  console.log(`Commit message: "${commitMessage}"`);

  run('git add text.md');
  run(`git commit -m "${commitMessage}"`);
}

function main() {
  console.log('=== Bad Pattern Script (NOT Following Gitflow Guidelines) ===\n');

  // Generate random kebab-case branch name (bad pattern)
  const branchName = generateBadBranchName();
  console.log(`Branch name: ${branchName}`);
  console.log('  [BAD] Uses prefix like feature/, fix/, hotfix/');
  console.log('  [BAD] No ticket ID in branch name');

  // Get current branch
  const originalBranch = runSilent('git rev-parse --abbrev-ref HEAD');
  console.log(`Current branch: ${originalBranch}`);

  // Create branch with bad naming pattern
  console.log(`Creating branch: ${branchName}`);
  run(`git checkout -b "${branchName}"`);

  // Random number of commits (1-3)
  const numCommits = getRandomInt(1, 3);
  console.log(`\nWill create ${numCommits} commit(s)`);

  for (let i = 1; i <= numCommits; i++) {
    makeCommit(i);
  }

  console.log('\n=== Done! ===');
  console.log(`Branch "${branchName}" created with ${numCommits} commit(s).`);
  console.log('\nThis VIOLATES the gitflow guidelines:');
  console.log('  - Branch name uses prefix (feature/, fix/, etc.) instead of ticket ID');
  console.log('  - Branch name is lowercase kebab-case instead of TICKET-ID format');
}

main();
