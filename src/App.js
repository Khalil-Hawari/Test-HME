import {React, useEffect, lazy, Suspense} from "react";
import { Route, Routes, useLocation } from 'react-router-dom'

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

import NavBar from './NavBar.js';
import { Link } from 'react-router-dom'
import Logo from './logo/logo.png';

import Home from './pages/Home.js'
const Tuition = lazy(() => import("./pages/Tuition.js"))
const Practice = lazy(() => import("./pages/Practice.js"))
const Contests = lazy(() => import("./pages/Contests.js"))
const Career = lazy(() => import("./pages/Career.js"))
const Contact = lazy(() => import("./pages/Contact.js"))
const Team = lazy(() => import("./pages/Team.js"))
const License = lazy(() => import("./pages/License.js"))
const Notfound = lazy(() => import("./pages/Notfound.js"))
const Quadratic_Equations = lazy(() => import("./pages/Practice/Quadratic_Equations.js"))

export function backToTop(mybutton) {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

export const Copyright = () => {
  return (
    <footer id = 'footer'>

      <div id = 'footerdiv'>
        <div>
          <img src = {Logo} alt = 'footerlogo' style = {{width: 'max(15vw, 100px)'}}></img>
          <Link to = '/license' style = {{display: 'block'}}>
            License
          </Link>
          <a href = 'https://github.com/happymatheducation/happymatheducation.com' target = '_blank'>
            <i class='bi bi-github'></i>
            {' Source'}
          </a>
        </div>

        <div>
          <p style = {{color: '#7E94C4', textAlign: 'center'}}>
            Maths
          </p>
          <Link to = '/classes'>Classes</Link>
          <br></br>
          <Link to = '/practice'>Our Publications</Link>
          <br></br>
          <Link to = '/contests'>Math Contests</Link>
          <br></br>
        </div>

        <div>
          <p style = {{color: '#7E94C4', textAlign: 'center'}}>
            Company
          </p>
          <Link to = '/'>Home</Link>
          <br></br>
          <Link to = '/careers'>Careers</Link>
          <br></br>
          <Link to = '/team'>Our Team</Link>
          <br></br>
          <Link to = '/Practice/Quadratic_Equations'>Try me</Link>
          <br></br>
        </div>

      </div>

      <p style = {{marginTop: '40px'}}>
        Copyright © 2022: <a href = 'https://jeffrey-zang.github.io/' target = '_blank'>Jeffrey Zang</a>
      </p>

      <a id = 'backtotop' style = {{cursor: 'pointer'}} onClick = {
          () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }   
      }>Back to Top</a>

      <br></br>
    </footer>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {

  AOS.init();

  return (
    <>    
    <ScrollToTop />
    <NavBar/>
    
    <Suspense fallback={<div className="lazy-preloader"></div>}>
    <Routes>
      <Route exact path = '/' element = {<Home/>}/>
      <Route exact path = '/classes' element = {<Tuition/>}/>
      <Route exact path = '/practice' element = {<Practice/>}/>
      <Route exact path = '/contests' element = {<Contests/>}/>
      <Route exact path = '/license' element = {<License/>}/>
      <Route exact path = '/careers' element = {<Career/>}/>
      <Route exact path = '/apply' element = {<Contact/>}/>
      <Route exact path = '/team' element = {<Team/>}/>
      <Route exact path = '/Practice/Quadratic_Equations' element = {<Quadratic_Equations/>}/>
      <Route exact path = '/*' element = {<Notfound/>}/>
    </Routes>
    </Suspense>

    <Copyright/>

    </>
  );
}

export default App;
