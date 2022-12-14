import { Octokit } from '@octokit/rest';
//import env variables from .env file
console.log(process.env.REACT_APP_HASHED_TOKEN);
//remove the \" from the hashed token"
const decoded_token_a = b64_to_utf8(process.env.REACT_APP_HASHED_TOKEN);
// Create a new Octokit instance that uses axios as its HTTP client
const octokit = new Octokit({
    auth: decoded_token_a
});
  
function b64_to_utf8(str) {
return decodeURIComponent(escape(window.atob(str)));
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