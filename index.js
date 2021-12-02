const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const pointsLabel = core.getInput('pointslabels');
        const token = core.getInput('repo-token');
        let ownerAndRepo = core.getInput('repo').split("/")
        let ownerValue = ownerAndRepo[0]
        let repoValue = ownerAndRepo[1]

        const octokit = github.getOctokit(token)

        let result = await octokit.rest.issues.listForRepo({
            owner: ownerValue,
            repo: repoValue
        });

        let data = result['data']
        data.forEach(issue => console.log(issue['labels']));
        core.setOutput("pointscount", 99);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run()