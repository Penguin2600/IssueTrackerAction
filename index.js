const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest");

try {
    const pointsLabel = core.getInput('pointslabel');
    const labelsFilter = core.getInput('labels');
    const token = core.getInput('repo-token');
    let ownerAndRepo = core.getInput('repo').split("/")
    let ownerValue = ownerAndRepo[0]
    let repoValue = ownerAndRepo[1]

    const octokit = new Octokit({
        auth: token,
      });

    let result = octokit.rest.issues.listForRepo({
        owner: ownerValue,
        repo: repoValue
      });

    console.log(result)
    core.setOutput("pointscount", 99);

} catch (error) {
    core.setFailed(error.message);
}