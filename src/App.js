import React, { useState, useRef, Component } from 'react';
import './App.scss';

const apiKey = 'k_l56508qd';
let resp = {
  actor1: [],
  actor2: [],
  title1: [],
  title2: []
};

const Loader = () => {
  return(
    <div class="loader">
      <span>loading</span>
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

async function fetchData(base, name){
  const urlStr = `${base}/${apiKey}/${name}`;
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
   
  const data = await fetch(urlStr, requestOptions)
    .then(response => response.text())
    .then(result => {
      return JSON.parse(result);
    })
    .catch(error => console.log('error', error));

  return data;
}

const Title = (props) => {
  const movie = props.movie;
  if(getType(movie.title) === 'movie'){
    return(
      <h2><a href={`https://www.imdb.com/title/${movie.id}`}>{movie.title} ({movie.year})</a></h2>
    )
  } else {
    return(
      <h2><a href={`https://www.imdb.com/title/${movie.id}`}>{movie.title}</a></h2>
    )
  }
}

const FormatRoles = (props) => {
  if(props.roles.match(/TV Series/g)){
    let roles = props.roles.split(' - ');
    roles.shift();
    const items = roles.map((role, idx) =>
      <li key={idx}>{role}</li>
    )
    return(
      <ul>
        {items}
      </ul>
    )
  } else {
    return(
      <span>{props.roles}</span>
    )
  }
}

const getType = (title) => {
  if(title.match(/TV Series/g)){
    return 'tv';
  } else {
    return 'movie';
  }
}

const MatchingItemsTitles = () => {
  let title1ids = resp.title1.actors.map(d => d.id);
  let title2ids = resp.title2.actors.map(d => d.id);
  const intersection = title1ids.filter(element => title2ids.includes(element));
  const mapped = intersection.map(id => {
    const actor = resp.title1.actors.find(d => d.id === id);
    const actorB = resp.title2.actors.find(d => d.id === id);
    let role = [actor.asCharacter, actorB.asCharacter];
    if(role[0] === role[1]){
      role = actor.asCharacter;
    } else {
      role = `${role[0]} and ${role[1]}`
    }
    return(
      <li className="actor" key={id}>
      <a href={`https://www.imdb.com/name/${actor.id}`}>{actor.name}</a> as {role}</li>
    )
  })
  return(
    <div>
      <h2>These actors appeared in {resp.title1.title} and {resp.title2.title}</h2>
      <ul>{mapped}</ul>
    </div>
  )
}

const TitleForm = (props) => {
  const [found1, setFound1] = useState(false);
  const [found2, setFound2] = useState(false);
  const title1 = useRef();
  const title2 = useRef();
  const [newItem, setNewItem] = useState(props.new);

  async function handleSubmit(event) {
    event.preventDefault();
    setNewItem(false);
    setFound1(false);
    setFound2(false);
    // console.log('submit', title1.current.value, title2.current.value)
    const title1Search = fetchData('https://imdb-api.com/en/API/SearchTitle/', title1.current.value);
    title1Search.then(data => {
      const title1ID = data.results[0].id;
      const title1Values = fetchData('https://imdb-api.com/en/API/FullCast/', title1ID).then(data => {
        resp.title1 = data;
        setFound1(true);
      })
    })

    const title2Search = fetchData('https://imdb-api.com/en/API/SearchTitle/', title2.current.value);
    title2Search.then(data => {
      const title2ID = data.results[0].id;
      const title2Values = fetchData('https://imdb-api.com/en/API/FullCast/', title2ID).then(data => {
        resp.title2 = data;
        setFound2(true);
      })
    })
  }

  return(
    <div>
      <form id="findMovies" onSubmit={handleSubmit}>
        <div className="input-wrapper show-ex">
          <input type="text" className="acting" ref={title1} />
          {/* <span class="del">✕</span> */}
        </div> 
        <div className="ex">&</div>
        <div className="input-wrapper show-ex">
          <input type="text" className="acting" ref={title2} />
          {/* <span class="del">✕</span> */}
        </div>  
        <button id="submit" type="submit">🔮 submit 🔮</button>
      </form>
      {!found1 && !found2 && !newItem &&
        <Loader />
      }
      {found1 && found2 &&
      <div className="results">
        <MatchingItemsTitles />
      </div>
      }
    </div>
  )
}

const MatchingItems = () => {
  let a1Roles = resp.actor1.castMovies.filter(d => d.role === "Actor" || d.role === "Actress");
  let a2Roles = resp.actor2.castMovies.filter(d => d.role === "Actor" || d.role === "Actress");
  let a1ids = a1Roles.map(d => d.id);
  let a2ids = a2Roles.map(d => d.id);
  const intersection = a1ids.filter(element => a2ids.includes(element));
  let a1matches = a1Roles.filter(d => intersection.includes(d.id));
  let a2matches = a2Roles.filter(d => intersection.includes(d.id));
  const items = intersection.map(id => 
    <li key={id} className={getType(a1matches.find(d => d.id === id).description)}>
    <Title movie={a1matches.find(d => d.id === id)} />
      <ul>
        <li key={`${resp.actor1.name}-${id}`}>{resp.actor1.name} as <FormatRoles roles={a1matches.find(d => d.id === id).description} /></li>
        <li key={`${resp.actor2.name}-${id}`}>{resp.actor2.name} as <FormatRoles roles={a2matches.find(d => d.id === id).description} /></li>
      </ul>
    </li>
    
  )
  return(
    <div>
      <p>{resp.actor1.name} and {resp.actor2.name} have both appeared in:</p>
      <ul>
        {items}
      </ul>
    </div>
  )
}

const ActorForm = (props) => {
  const [found1, setFound1] = useState(false);
  const [found2, setFound2] = useState(false);
  const actor1 = useRef();
  const actor2 = useRef();
  const [newItem, setNewItem] = useState(props.new);

  async function handleSubmit(event) {
    event.preventDefault();
    setNewItem(false);
    setFound1(false);
    setFound2(false);
    const actor1Search = fetchData('https://imdb-api.com/en/API/SearchName', actor1.current.value);
    actor1Search.then(data => {
      const actor1ID = data.results[0].id;
      const actor1Values = fetchData('https://imdb-api.com/en/API/Name/', actor1ID).then(data => {
        resp.actor1 = data;
        setFound1(true);
      })
    })

    const actor2Search = fetchData('https://imdb-api.com/en/API/SearchName', actor2.current.value);
    actor2Search.then(data => {
      const actor2ID = data.results[0].id;
      const actor2Values = fetchData('https://imdb-api.com/en/API/Name/', actor2ID).then(data => {
        resp.actor2 = data;
        setFound2(true);
      })
    })
  }

  return(
    <div>
      <form id="findActors" onSubmit={handleSubmit}>
        <div className="input-wrapper show-ex">
          <input type="text" className="acting" ref={actor1} />
          {/* <span class="del">✕</span> */}
        </div> 
        <div className="ex">&</div>
        <div className="input-wrapper show-ex">
          <input type="text" className="acting" ref={actor2} />
          {/* <span class="del">✕</span> */}
        </div>  
        <button id="submit" type="submit">🔮 submit 🔮</button>
      </form>
      {!found1 && !found2 && !newItem &&
        <Loader />
      }
      {found1 && found2 &&
      <div className="results">
        <MatchingItems />
      </div>
      }
    </div>
  )
}

const elements = ['Compare Actors', 'Compare Titles'];

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeElement: 0,
      allElements: elements
    };
  }

  render() {
    return (
      <NavItem
        elements={this.state.allElements}
        showIndex={this.state.activeElement}
        toggleIndex={index => this.setState({ activeElement: index})}
      />
    );
  }
}

const NavItem = ({ elements, showIndex, toggleIndex, isActive }) => {
  return(
    <div>
      <div className="admin-nav">
        {elements.map((element, index) => (
          <div key={index}>
            <div onClick={() => toggleIndex(index)} className={
              showIndex === index ? 'selected' : null
            }>{elements[index]}</div>
          </div>
        ))}
      </div>
      {showIndex === 0 &&
        <ActorForm new={true}/>
      }
      {showIndex === 1 &&
        <TitleForm new={true} />
      }
    </div>
  )
};

function App() {
  return (
    <div className="App">
      <Nav />
    </div>
  );
}

export default App;
