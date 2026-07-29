import React, { useState ,createContext } from 'react'




export const SearchContext = createContext()
export const SearchProvider = ({children}) => {
    let [search,setSearch] = useState("")
  return (
     <SearchContext.Provider value={{search,setSearch}}>
        {children}

     </SearchContext.Provider>
  )
}

// export default SearchContext