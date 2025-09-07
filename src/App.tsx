import { AppRoutes } from '@/app/routes';
import { store } from '@/app/store';
import '@/shared/styles/global.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
