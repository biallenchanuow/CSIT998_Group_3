import ForgeUI, { render, Fragment, Text, ProjectPage, GlobalPanel, IssuePanel, useProductContext, useState, GlobalPage } from '@forge/ui';
import api, { route } from "@forge/api";

//This function takes an issueId to call the REST API with path /rest/api/3/issue/${issueIdOrKey}/comment.
const fetchCommentsForIssue = async (issueIdOrKey) => {
  const res = await api
    .asUser()
    .requestJira(route`/rest/api/3/issue/${issueIdOrKey}/comment`);

  const data = await res.json();
  return data.comments;
};

const App = () => {
  const context = useProductContext(); //Use the UI kit hook useProductContext to get the issueId to call fetchCommentsForIssue
  
  // Fetch the comments for the page and log the output in the App function
  const [comments] = useState(async () => await fetchCommentsForIssue(context.platformContext.issueKey));
  console.log(`Number of comments on this issue: ${comments.length}`);

  return (
    <Fragment>
      <Text>Skeleton App for Velocity-Predictor</Text>
      <Text>Number of comments on this issue: {comments.length}</Text>
    </Fragment>
  );
};


export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
