import { useState } from "react";
import SearchForm from "../components/SearchForm";

function SearchPage() {
  const [filters, setFilters] = useState({});

  return (
    <>
      <h1>Property Search</h1>
      <SearchForm filters={filters} setFilters={setFilters} />
    </>
  );
}

export default SearchPage;
