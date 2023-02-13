import { SearchParams } from '../search.params/search.params';
import { appContainer } from './app.module.scss';
export function App() {
  return (
    <div className={appContainer}>
      <header>
        <h1>Countries</h1>
      </header>
      <main>
        <SearchParams></SearchParams>
      </main>
    </div>
  );
}
