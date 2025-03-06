import { createContext, useState } from "react";

export const UserContext = createContext();

// const UserContext = ({ children }) => {
//   const [userInfo, setUserInfo] = useState(null);
//   return (
//     <CustomContext.Provider value={{ userInfo, setUserInfo }}>
//       {children}
//     </CustomContext.Provider>
//   );
// };
export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
