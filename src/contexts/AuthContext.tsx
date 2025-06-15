
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  firstName: string;
  surname: string;
  studentNumber: string;
}

interface AuthContextType {
  user: User | null;
  login: (studentNumber: string, password: string) => Promise<boolean>;
  signup: (userData: { firstName: string; surname: string; studentNumber: string; password: string; confirmPassword: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const signup = async (userData: { firstName: string; surname: string; studentNumber: string; password: string; confirmPassword: string }): Promise<boolean> => {
    try {
      // Validate passwords match
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = existingUsers.find((u: any) => u.studentNumber === userData.studentNumber);
      
      if (userExists) {
        throw new Error('User with this student number already exists');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        firstName: userData.firstName,
        surname: userData.surname,
        studentNumber: userData.studentNumber,
        password: userData.password // In real app, this would be hashed
      };

      // Save to "database" (localStorage)
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Auto login after signup
      const userForState = {
        id: newUser.id,
        firstName: newUser.firstName,
        surname: newUser.surname,
        studentNumber: newUser.studentNumber
      };

      setUser(userForState);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(userForState));

      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const login = async (studentNumber: string, password: string): Promise<boolean> => {
    try {
      // Get users from "database"
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => u.studentNumber === studentNumber && u.password === password);

      if (foundUser) {
        const userForState = {
          id: foundUser.id,
          firstName: foundUser.firstName,
          surname: foundUser.surname,
          studentNumber: foundUser.studentNumber
        };

        setUser(userForState);
        setIsAuthenticated(true);
        localStorage.setItem('currentUser', JSON.stringify(userForState));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
