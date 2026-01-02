import React, { useState } from "react";
import SearchForm from "../components/SearchForm";

function SearchPage() {
  const [criteria, setCriteria] = useState({});

  return (
    <div>
      <h2>Property Search</h2>
      <SearchForm criteria={criteria} setCriteria={setCriteria} />
    </div>
  );
}

export default SearchPage;
