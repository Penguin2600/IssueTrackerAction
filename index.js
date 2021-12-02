const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest");

try {

    const pointsLabel = core.getInput('pointslabel');
    const labelsFilter = core.getInput('labels');
    const token = core.getInput('repo-token');
    let nameAndRepo = core.getInput('repo').split("/")

    const octokit = new Octokit({
        auth: token,
      });
    
    console.log(nameAndRepo)
    console.log(core.getInput('repo'))
    console.log("Asdasd")

    let result = octokit.rest.issues.listForRepo({
        owner: nameAndRepo[1],
        repo: nameAndRepo[0],
      });


    console.log(result)
    console.log(`pointsLabel: ${pointsLabel}!`);
    const pointscount = (pointsLabel * 5)
    console.log(`pointscount: ${pointscount}!`);

    core.setOutput("pointscount", pointscount);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);

} catch (error) {
    core.setFailed(error.message);
}