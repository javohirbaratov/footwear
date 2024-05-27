import React from "react";
import { SearchIcon } from "../../icons";
import styles from "./searchInput.module.css";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value = "",
  onChange = () => null,
  placeholder = "Qidirish",
}) => {
  return (
    <label htmlFor="searchInput" className={styles.searchInput}>
      <input
        type="text"
        id="searchInput"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className={styles.searchInputIcon}>
        <SearchIcon />
      </div>
    </label>
  );
};

export default SearchInput;
