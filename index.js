const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const pointsLabel = core.getInput('pointslabel');
        let labelsFilter = core.getInput('labels');
        const token = core.getInput('repo-token');
        let ownerAndRepo = core.getInput('repo').split("/")
        let ownerValue = ownerAndRepo[0]
        let repoValue = ownerAndRepo[1]

        labelsFilter += ","+pointsLabel

        const octokit = github.getOctokit(token)

        let result = await octokit.rest.issues.listForRepo({
            owner: ownerValue,
            repo: repoValue,
            labels: labelsFilter
        });

        console.log(result)
        core.setOutput("pointscount", 99);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run()