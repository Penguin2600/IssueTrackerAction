const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs')

function writeContent(outputfile, pointsCount) {
  const content =  `
    ---
    title: Points
    ---
    ### Current Total Points Count:  
    * ${pointsCount}
  `; 

  fs.writeFileSync(outputfile, content)
}

async function run() {
    try {
        const outputfile = core.getInput('outputfile');
        const pointsLabel = core.getInput('pointslabel');
        const token = core.getInput('repo-token');
        let ownerAndRepo = core.getInput('repo').split("/")
        let ownerValue = ownerAndRepo[0]
        let repoValue = ownerAndRepo[1]
        let pointsCount = 0.0

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
                    if (name.includes(pointsLabel)) {
                        let pointsValue = name.split("::")[1]
                        pointsCount += parseInt(pointsValue)
                        console.log(pointsCount, pointsValue)
                    }
                });
            }
        });

        core.setOutput("pointscount", pointsCount);
        writeContent(outputfile, pointsCount)

    } catch (error) {
        core.setFailed(error.message);
    }
}

run()