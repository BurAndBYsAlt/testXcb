import * as React from 'react';
import {AuthenticatedContextProvider} from './hooks/useAuthenticatedContext';
import {PlayersContextProvider} from './hooks/usePlayers';
import {Game} from './components/Game';

export default function App() {
  return (
    <AuthenticatedContextProvider>
      <PlayersContextProvider>
        <Game />
      </PlayersContextProvider>
    </AuthenticatedContextProvider>
  );
}