import { createContext, useState } from "react";

export const CustomContext = createContext();

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
    <CustomContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </CustomContext.Provider>
  );
};

export default CustomContext;
