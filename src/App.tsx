import { AppRoutes } from '@/app/routes';
import { store } from '@/app/store';
import '@/shared/styles/global.css';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
}

export default App;
