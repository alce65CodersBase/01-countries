import { Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchParams } from '../search.page/search.params/search.params';
import { appContainer } from './app.module.scss';
import { Details } from '../details.page/details/details';
import { Visit } from '../visit.page/visit/visit';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={appContainer}>
        <header>
          <h1>Countries</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<SearchParams></SearchParams>}></Route>
            <Route path="/details/:id" element={<Details></Details>}></Route>
            <Route path="/visit" element={<Visit></Visit>}></Route>
            <Route
              path="*"
              element={<Navigate to="/" replace={true}></Navigate>}
            ></Route>
          </Routes>
        </main>
      </div>
    </QueryClientProvider>
  );
}
