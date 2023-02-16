import { Navigate, Route, Routes } from 'react-router-dom';
import { getLanguages } from '../../service/repo/countries.api.repo';
import { SearchParams } from '../search.params/search.params';
import { appContainer } from './app.module.scss';
import { Details } from '../details/details';
export function App() {
  getLanguages();
  return (
    <div className={appContainer}>
      <header>
        <h1>Countries</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<SearchParams></SearchParams>}></Route>
          <Route path="/details/:id" element={<Details></Details>}></Route>
          <Route
            path="*"
            element={<Navigate to="/" replace={true}></Navigate>}
          ></Route>
        </Routes>
      </main>
    </div>
  );
}
