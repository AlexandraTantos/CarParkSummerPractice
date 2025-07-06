import SearchIcon from "@mui/icons-material/Search";

type SearchInputProps = {
  onSearch: (query: string) => void;
};

export default function SearchInput({ onSearch }: SearchInputProps) {
  return (
    <div className="w-full  p-4 sm:w-[70%]">
      <div className="flex items-center w-full  bg-gray-100 rounded-md px-3 py-2 shadow-sm">
        <SearchIcon className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search by manufacturer or model..."
          onChange={(e) => onSearch(e.target.value)}
          aria-label="search"
          className="w-full bg-transparent outline-none text-md text-gray-800 placeholder-gray-400"
        />
      </div>
    </div>
  );
}
