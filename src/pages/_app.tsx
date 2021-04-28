import { Header } from '../components/Header';
import { Player } from '../components/Player';
import {  PlayerContextProvider } from '../contexts/PlayerContext';
import '../styles/global.scss';

import styles from '../styles/app.module.scss';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {

  const [theme, setTheme] = useState("theme-dark");

  const toggleTheme = () => {
      theme == 'theme-light' ? setTheme('theme-dark') : setTheme('theme-light')
  };
  
  return (
    <PlayerContextProvider>
      <div className={`${styles.wrapper} ${theme}`}>
        <main>
          <Header theme={theme} toggleTheme={toggleTheme} />
          <Component {...pageProps} />
        </main>
        <Player/>
      </div>  
    </PlayerContextProvider>
  );
}

export default MyApp
