//component that will render the table from a axios call to github api

import React, { Component } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getRepos } from '../../api/octokit';

const GitReposTable = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState('');
    const [searched, setSearched] = useState("");
    //function that will search for a user or org
    const searchUser = () => {
        getRepos(setLoading,setError,search).then((repos) => {
            setRepos(repos);
            setLoading(false);
            setSearched(search);
            setSearch('');
        }, (error) => {
            setError(true);
            setLoading(false);
            setSearch('');
        });
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
                            <th>Repo URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repos.map((repo) => (
                            <tr key={repo.id}>
                                <td>{repo.name}</td>
                                <td><a href={repo.html_url} target="_blank">{repo.html_url}</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        );
    }
}

export default GitReposTable; 