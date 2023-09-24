import { useEffect, useState } from "react";
import { Box, InputBase } from "@mui/material";
import _ from "lodash";
import { useTheme } from "@mui/material/styles";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@/src/quicks-icons/SearchIcon";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  paddingRight: `calc(1em + ${theme.spacing(4)})`,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  pointerEvents: "none",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  fontFamily: "inherit",
  fontSize: 12,
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create("width"),
  },
}));

function SearchBar({ open }) {
  const theme = useTheme();

  return (
    <Search
      sx={{
        border: `1px solid ${theme.palette.button.lightGrey}`,
        borderRadius: 2,
      }}
    >
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />

      <SearchIconWrapper>
        <SearchIcon color="black" size={12} />
      </SearchIconWrapper>
    </Search>
  );
}

export default SearchBar;
