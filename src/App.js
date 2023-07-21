import { Routes, Route} from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import FooterComponent from './components/FooterComponent/FooterComponent'
import { routes } from './routes/route'
var showHeader = true
function App() {
  return (
    <div>
      <div id='header'>
      {showHeader === true && <HeaderComponent />}
      </div>

      <div id='content'>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            return (
              <Route key={route.path} path={route.path} element={<Page />} />
            )
          })}
        </Routes>
      </div>

      <div id='footer'>
        <FooterComponent />
      </div>
    </div>
  );
}

export default App;
