import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {
  const content = useRoutes(routes);
  return content;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
