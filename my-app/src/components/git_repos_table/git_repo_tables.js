//component that will render the table from a axios call to github api

import React, { Component } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getRepos } from '../../api/octokit';

const GitReposTable = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        getRepos(setLoading,setError).then((repos) => {
            setRepos(repos);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Something went wrong...</div>;
    }
    if (!repos || repos.length === 0) {
        return <div>No repos found</div>;
    }
    if (!loading && !error){
        return (
            <div className='table_main_page'>
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