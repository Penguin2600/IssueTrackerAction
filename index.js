const core = require('@actions/core');
const github = require('@actions/github');

try {

    const pointsLabel = core.getInput('pointslabel');
    const labelsFilter = core.getInput('labels');

    const getContents = async (pointsLabel) => {
        const state = 'open'
        const token = core.getInput('GITHUB_TOKEN');
        const octokit = new github.GitHub(token);
        const repository = github.context.repo;
        const list = await octokit.issues.listForRepo({
            ...repository,
            state,
            pointsLabel
        });
        return list.data
    }
    result = getContents(pointsLabel)
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