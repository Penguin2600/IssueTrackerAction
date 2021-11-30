const core = require('@actions/core');
const github = require('@actions/github');

try {

  const pointsLabel = core.getInput('pointslabel');
  const labelsFilter = core.getInput('labels');

  console.log(`pointsLabel: ${pointsLabel}!`);
  const pointscount = (pointsLabel*5)
  console.log(`pointscount: ${pointscount}!`);

  core.setOutput("pointscount", pointscount);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

} catch (error) {
  core.setFailed(error.message);
}