import { Routes, Route } from "react-router-dom";
import MainLayout from "./containers/MainLayout";
import { Home, ContactList, MetaCard, SocialLinks, PublicMetaCard } from "./pages";

const App = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="meta-card" element={<MetaCard />} />
      <Route path="contacts" element={<ContactList />} />
      <Route path="social-links" element={<SocialLinks />} />
      <Route path=":address" element={<PublicMetaCard />} />
    </Route>
  </Routes>
);

export default App;
