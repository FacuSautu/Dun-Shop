import { useEffect, useState } from "react";
import { getUser, isLogedIn } from "../../util/Firebase";

import Contexts from "../../context/Contexts";

const UserContextProvider = ({ defaultValue=undefined, children }) => {
  const [user, setUser] = useState(defaultValue);

  isLogedIn((logedData) => {
    if(logedData){
      getUser(logedData.uid)
        .then((userData) => {
          setUser({id: logedData.id, ...userData.docs[0].data()});
        })
    }else{
      setUser(undefined);
    }
  });

  return(
    <Contexts.userContext.Provider value={{ user }}>
      {children}
    </Contexts.userContext.Provider>
  );
}

export default UserContextProvider;