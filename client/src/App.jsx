import './App.css'
import CharactersT from "./components/allCharacters/CharactersT"
import {Routes, Route} from 'react-router-dom'
import LandingPage from "./components/landingPage/LandingPage"
import Favorites from "./components/favorites/Favorites"
import CreateCharacter from "./components/createCharacter/CreateCharacter"
import CharacterDetail from "./components/characterDetail/CharacterDetail"
import UpdateCharacter from "./components/updateCharacter/UpdateCharacter"



function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={ <LandingPage/> } />
        <Route path="/home" element={ <CharactersT/>} />
        <Route path="/favorites" element={<Favorites/>}/>
        <Route path="/details/:id" element={<CharacterDetail/>}/>
        <Route path="/create/" element={<CreateCharacter/>}/>
        <Route path="/update/:id" element={<UpdateCharacter/>}/>
      </Routes>  
    </div>  
  )
}

export default App
