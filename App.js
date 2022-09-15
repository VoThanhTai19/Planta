import React from 'react';
import Navigation from './android/src/screens/navigation/Navigation'
import { UserContextProvider } from './android/src/screens/user/UserContext';
import { ProductContextProvider } from './android/src/screens/product/ProductContext'
export default function App() {
  return (
    <UserContextProvider>
      <ProductContextProvider>
        <Navigation/>
      </ProductContextProvider>
    </UserContextProvider>
  );
}


