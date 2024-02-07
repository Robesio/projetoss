import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import Container from './components/layout/Container';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';

function App() {
  return (
    <Router>
      <NavBar />
      <Container customClass="min_height">
        <Routes><Route path='/' element={<Home />} /></Routes>
        <Routes><Route path='/projects' element={<Projects />} /></Routes>
        <Routes><Route path='/company' element={<Company />} /></Routes>
        <Routes><Route path='/contact' element={<Contact />} /></Routes>
        <Routes><Route path='/newproject' element={<NewProject />} /></Routes>
        <Routes><Route path='/project/:id' element={<Project />} /></Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
