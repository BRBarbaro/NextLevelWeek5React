
import Link from 'next/link';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import styles from './styles.module.scss';

export function Header({theme, toggleTheme}) {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale:ptBR });

  return (
    <header className={styles.headerContainer}>
      <Link href="/">
        <img 
          src={theme == "theme-light" ?  "/logo.svg" : "/logo-dark.svg"}
          alt="Podcastr" />
      </Link>
      
      <p>O melhor para você ouvir, sempre</p>
      <span>{currentDate}</span>
      <button className={styles.toggleTheme} onClick={() => toggleTheme()}>
        <img 
          src={theme == "theme-light" ?  "/dark-mode.svg" : "/light-mode.svg"} 
          alt={theme == "theme-light" ?  "dark-mode" : "light-mode"} 
          />
      </button>
    </header>
  );
}