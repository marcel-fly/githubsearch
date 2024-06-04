import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.github.com',
});

export const searchUsers = (username: string) =>
    api.get(`/search/users`, { params: { q: username, per_page: 5 } });

export const getUserRepos = (username: string) =>
    api.get(`/users/${username}/repos`);
