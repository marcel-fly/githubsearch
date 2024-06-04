import React from "react";
import { useQuery } from "react-query";
import { getUserRepos } from "../api/github";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
} from "@mui/material";

interface Repo {
  name: string;
  description: string;
  stargazers_count: number;
}

const UserRepositories: React.FC<{ username: string }> = ({ username }) => {
  const { data, isLoading } = useQuery(["getUserRepos", username], () =>
    getUserRepos(username),
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <List>
      {!isLoading && data?.data.length === 0 && (
        <Typography>No repos found</Typography>
      )}
      {data?.data.map((repo: Repo) => (
        <ListItem sx={{ bgcolor: "#C1C1C1", mb: "5px" }} key={repo.name}>
          <ListItemText primary={repo.name} secondary={repo.description} />
          <Typography>{repo.stargazers_count} ★</Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default UserRepositories;
