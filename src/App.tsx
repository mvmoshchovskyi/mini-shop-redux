import { Header } from './components/header/Header';
import { AppRouter } from './router/AppRouter';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        <AppRouter />
      </main>
    </div>
  );
}

export default App;
