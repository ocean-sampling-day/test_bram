//component that will render the table from a axios call to github api

import React, { Component } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getRepos , getWorkflows } from '../../api/octokit';

const GitReposTable = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState('');
    const [searched, setSearched] = useState("");
    //function that will search for a user or org
    const searchUser = () => {
        getRepos(setLoading,setError,search).then((repos) => {

            for (let i = 0; i < repos.length; i++) {
                repos[i]['workflows_loaded'] = false; 
            }
            setRepos(repos);
            setLoading(false);
            setSearched(search);
            setSearch('');
        }, (error) => {
            console.log(error);
            setError(true);
            setLoading(false);
            setSearch('');
        });
    }

    //function here that will return a value of a cell in the table
    const getWorkflowCell = (repo) => {

        if (repo.workflows_loaded){
            return repo.workflows.workflows.map((workflow) => {
                return(
                    <li>{workflow.name}=>{workflow.state}</li>
                )
            })
        }
        if (!repo.workflows_loaded){
            //get the workflows for the repo
            //return the workflows
            setLoading(true);
            getWorkflows(searched,repo.name).then((workflows) => {
                //loop over repos and find the repo that matches the repo that was passed in
                for(let i = 0; i < repos.length; i++){
                    if (repos[i].id == repo.id){
                        repos[i]['workflows_loaded'] = true;
                        repos[i]['workflows'] = workflows;
                    }
                }
                setLoading(false);
                setRepos(repos);
                console.log(repos);
            }, (error) => {
                console.log(error);
                return(<>Error while fetching...</>)
            }
            );
            return(<>Loading...</>)
        }
    }
    if (loading && searched == '') {
        return (
            <div className='table_main_page'>
                <input type="text" placeholder="Search for a user or org" onChange={e => setSearch(e.target.value)} value={search}/>
                <button onClick={e => searchUser()}>search</button>
            </div>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Something went wrong...</div>;
    }
    if (!loading && !error){
        return (
            <div className='table_main_page'>
                <input type="text" placeholder="Search for a user or org" onChange={e => setSearch(e.target.value)} value={search}/>
                <button onClick={e => searchUser()}>search</button>
                <h1>{searched} Github Repos</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Repo Name</th>
                            <th>workflows</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repos.map((repo) => (
                            <tr key={repo.id}>
                                <td><a href={repo.html_url} target="_blank">{repo.name}</a></td>
                                <td>{getWorkflowCell(repo)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        );
    }
}

export default GitReposTable; 