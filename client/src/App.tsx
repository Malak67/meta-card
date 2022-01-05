import { Routes, Route } from "react-router-dom";
import MainLayout from "./containers/MainLayout";
import { Home, ContactList, MetaCard } from "./pages";

const App = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="meta-card" element={<MetaCard />} />
      <Route path="contacts" element={<ContactList />} />
    </Route>
  </Routes>
);

export default App;
