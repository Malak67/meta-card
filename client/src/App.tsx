import { Routes, Route } from "react-router-dom";
import MainLayout from "./containers/MainLayout";
import {
  Home,
  ContactList,
  MetaCard,
  SocialLinks,
  PublicMetaCard,
  PageNotFound,
} from "./pages";

const App = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="meta-card" element={<MetaCard />} />
      <Route path="contacts" element={<ContactList />} />
      <Route path="social-links" element={<SocialLinks />} />
      <Route path="public/:address" element={<PublicMetaCard />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  </Routes>
);

export default App;
