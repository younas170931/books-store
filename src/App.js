import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import MainLayout from "./layouts/Main";
import AdminLayout from "./layouts/Admin";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Switch>
        <Route path="/admin" component={AdminLayout} />
        <Route path="/" component={MainLayout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
