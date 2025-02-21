

const SearchInput = ({ setSearch }) => {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search users"
        onChange={handleSearch}
        className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-400 transition duration-200 shadow-sm w-64"
      />
    </div>
  );
};

export default SearchInput;
