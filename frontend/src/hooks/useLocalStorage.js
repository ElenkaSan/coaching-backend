import { useState, useEffect } from "react";

function useLocalStorage(key, firstValue = null) {
  const initialValue = localStorage.getItem(key) || firstValue;

  const [item, setItem] = useState(initialValue);

  useEffect(function setKeyInLocalStorage() {
    console.debug("hooks useLocalStorage useEffect", 
                  "item=", item);

    if (item === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, item);
    }
  }, [key, item]);

  return [item, setItem];
}

export default useLocalStorage;


// import React, { useEffect, useState } from "react";

// const useLocalStorage = (key, defaultValue) =&gt; {
//   const [value, setValue] = useState(
//     JSON.parse(localStorage.getItem(key, defaultValue))
//   );

//   useEffect(() =&gt; {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [value, key]);

//   return [value, setValue];
// };

// export default useLocalStorage;