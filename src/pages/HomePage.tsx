import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { searchUsers } from "../api/github";
import {
  TextField,
  Button,
  List,
  Box,
  CircularProgress,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";
import UserRepositories from "../components/UserRepositories";

interface User {
  login: string;
}

const HomePage = () => {
  const inputRef = useRef<HTMLInputElement>();
  const [searchedUserName, setSearchedUserName] = useState("");
  const [selectedLoginForRepoList, setSelectedLoginForRepoList] = useState<
    string | false
  >();

  const { data, refetch, isFetching, isError } = useQuery(
    "searchUsers",
    () => searchUsers(inputRef.current?.value ?? ''),
    { enabled: false },
  );

  const fetchedUsers: User[] = data?.data.items;

  const handleSearch = () => {
    if(inputRef.current){
    if(!inputRef.current.value) return;
    setSearchedUserName(inputRef.current.value);
    refetch();
    }
  };

  const handleAccordionChange = (login: string) => (isExpanded: boolean) => {
    setSelectedLoginForRepoList(isExpanded ? login : false);
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
        <TextField
          name="username"
          placeholder={"Enter username"}
          variant="outlined"
          type="text"
          fullWidth
          inputRef={inputRef}
        />
        <Button
          type="submit"
          variant="contained"
          onClick={handleSearch}
          fullWidth
          disabled={isFetching}
        >
          {isFetching ? <CircularProgress size={25} /> : "Search"}
        </Button>
      {searchedUserName && (
        <Typography
          color={"grey"}
          marginTop={5}
        >{`Showing users for "${searchedUserName}"`}</Typography>
      )}
      {isFetching && <CircularProgress sx={{ mt: 2 }} />}
      {isError ? (
        <Typography color={"red"} marginTop={5}>
          Error fetching data
        </Typography>
      ) : (
        fetchedUsers?.length === 0 && (
          <Typography color={"grey"} marginTop={5}>
            No users found
          </Typography>
        )
      )}
      {!isError && (
        <List sx={{ mt: 2 }}>
          {fetchedUsers?.map((user: User) => (
            <Accordion
              key={user.login}
              onChange={(_, isExpanded) =>
                handleAccordionChange(user.login)(isExpanded)
              }
              expanded={selectedLoginForRepoList === user.login}
              elevation={0}
            >
              <AccordionSummary
                sx={{ backgroundColor: "#E5E5E5" }}
                expandIcon={<ArrowDownward />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {user.login}
              </AccordionSummary>
              <AccordionDetails sx={{ m: "0px -15px 5px 20px" }}>
                {selectedLoginForRepoList && (
                  <UserRepositories username={selectedLoginForRepoList} />
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </List>
      )}
    </Box>
  );
};

export default HomePage;
