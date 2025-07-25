// extract info from github issue and create a PR
import { Octokit } from '@octokit/rest';
import { exec } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
const REPO_OWNER = 'deificx';
const REPO_NAME = 'oppskrifteriet';

async function mkdirIfNotExists(path) {
  try {
    await mkdir(path, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

async function createPullRequestFromIssue(issueNumber) {
  try {
    // Fetch the issue details
    const { data: issue } = await octokit.issues.get({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      issue_number: issueNumber,
    });

    // Create a new branch for the PR
    const branchName = `issue-${issueNumber}`;
    await exec(`git checkout -b ${branchName}`);

    await mkdirIfNotExists(resolve(__dirname, '..', 'recipes'));
    // Create a new file with the issue title and body
    const fileName = join(__dirname, '..', 'recipes', `${issue.title}.md`);
    await writeFile(fileName, `# ${issue.title}\n\n${issue.body}`);

    // Stage and commit the new file
    await exec(`git add ${fileName}`);
    await exec(`git commit -m "Add recipe from issue #${issueNumber}"`);

    // Push the branch to the remote repository
    await exec(`git push origin ${branchName}`);

    // Create a pull request
    const { data: pullRequest } = await octokit.pulls.create({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      title: `Recipe from issue #${issueNumber}`,
      head: branchName,
      base: 'main',
      body: `This PR was created from issue #${issueNumber}.`,
    });

    console.log(`Pull request created: ${pullRequest.html_url}`);
  } catch (error) {
    console.error('Error creating pull request:', error);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const issueNumber = process.argv[2];
  if (!issueNumber) {
    console.error('Please provide an issue number as an argument.');
    process.exit(1);
  }
  createPullRequestFromIssue(issueNumber);
}

export default createPullRequestFromIssue;
