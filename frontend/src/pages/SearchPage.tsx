import { useLocation } from "react-router-dom";
import { SearchInput } from "../components/SearchInput"
import {SearchResults} from "../components/SearchResults"
import useSearch from "../hooks/useSearch";

export const SearchPage = () => {
    const { search } = useLocation();
    const searchTerm = search?.split("?")[1];
    const { data, setData } = useSearch(searchTerm);
    console.log(searchTerm)
    return(
        <>
        <SearchInput></SearchInput>
        {data && <SearchResults data={data} setData={setData} />}
        </>
    )
}