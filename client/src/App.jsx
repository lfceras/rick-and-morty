import CharactersT from "./components/allCharacters/CharactersT"
import {Routes, Route} from 'react-router-dom'
import LandingPage from "./components/landingPage/LandingPage"
import Favorites from "./components/favorites/Favorites"
import CreateCharacter from "./components/createCharacter/CreateCharacter"
import CharacterDetail from "./components/characterDetail/CharacterDetail"


 
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <LandingPage/> } />
        <Route path="/home" element={ <CharactersT/>} />
        <Route path="/favorites" element={<Favorites/>}/>
        <Route path="/details/:id" element={<CharacterDetail/>}/>
        <Route path="/create" element={<CreateCharacter/>}/>
      </Routes>  
    </div>  
  )
}

export default App
