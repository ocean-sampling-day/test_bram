import { Octokit } from '@octokit/rest';
//import env variables from .env file
console.log(process.env.REACT_APP_HASHED_TOKEN);
const decoded_token_a = fromBinary(process.env.REACT_APP_HASHED_TOKEN);
console.log(decoded_token_a);
// Create a new Octokit instance that uses axios as its HTTP client
const octokit = new Octokit({
    auth: decoded_token_a
});
  
function fromBinary(encoded) {
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return String.fromCharCode(...new Uint16Array(bytes.buffer));
}

//async funtion that will return a promise
export async function getRepos(setLoading,setError,username) {
    //perform axios request to get repos
    console.log(username);
    if (username != ''){
        const request_repo = await octokit.request('GET /users/{username}/repos', {
            username
        });
        //return the repos
    return request_repo.data;
    }
    
    return [];
}

//async function that will return the workflows given a repo
export async function getWorkflows(username,repo) {
    //perform axios request to get workflows
    //return the workflows
    const request_workflows = await octokit.request('GET /repos/{owner}/{repo}/actions/workflows', {
        owner: username,
        repo: repo
    });
    return request_workflows.data;
}
