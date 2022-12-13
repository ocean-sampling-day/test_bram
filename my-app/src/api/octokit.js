import { Octokit } from '@octokit/rest';
import axios from 'axios';

//import env variables from .env file
console.log(process.env.REACT_APP_GITHUB_TOKEN);

// Create a new Octokit instance that uses axios as its HTTP client
const octokit = new Octokit({
    auth: process.env.REACT_APP_GITHUB_TOKEN
});


//async funtion that will return a promise
export async function getRepos(setLoading,setError) {
    //perform axios request to get repos
    let username = "bulricht"
    const request_repo = await octokit.request('GET /users/{username}/repos', {
        username
    });
    //return the repos
    return request_repo.data;
}