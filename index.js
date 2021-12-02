const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const pointsLabel = core.getInput('pointslabels');
        const token = core.getInput('repo-token');
        let ownerAndRepo = core.getInput('repo').split("/")
        let ownerValue = ownerAndRepo[0]
        let repoValue = ownerAndRepo[1]
        let pointsCount = 0

        const octokit = github.getOctokit(token)

        let result = await octokit.rest.issues.listForRepo({
            owner: ownerValue,
            repo: repoValue
        });

        let data = result['data']

        data.forEach(issue => {
            let labels = issue['labels']
            if (labels) {
                labels.forEach(label => {
                    let name = label['name']
                    console.log(name)
                    if (name.includes(pointsLabel)) {
                        let pointsValue = name.split("::")[1]
                        console.log(pointsValue)
                        pointsCount += pointsValue
                    }
                });
            }
        });

        core.setOutput("pointscount", pointsCount);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run()