import { createContext, useContext, useMemo, useState } from 'react';

const UserContext = createContext();
const UserProvider = ({ mockUser, children }) => {
  const [user, setUser] = useState(
    mockUser ? { id: mockUser.id, email: mockUser.email } : {}
  );

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('Mock UserProvider');
  }

  return context;
};

export { UserContext, UserProvider, useUser };
