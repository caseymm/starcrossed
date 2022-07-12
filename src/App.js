import React, { useState, useRef, Component } from 'react';
import './App.scss';
import stringSimilarity from 'string-similarity';

const apiKey = 'k_l56508qd';
let resp = {
  actor1: [],
  actor2: [],
  title1: [],
  title2: []
};

const Loader = () => {
  return(
    <div className="loader">
      <span>loading</span>
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

const handleChange = (input) => {
  if(input.current.value.length > 0){
    input.current.nextElementSibling.className = 'del show-ex'
  } else {
    input.current.nextElementSibling.className = 'del'
  }
}

const clearInput = (ref, num) => {
  ref.current.value = '';
  ref.current.focus();
  handleChange(ref)
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
  if(props.roles.match(/\(TV /g) || props.roles.match(/\(Video\)/g)){
    let role = props.roles.split(' - ')[0].split(') ')[1];
    try{
      role = role.replace('(Video) ', '');
      role = role.replace('...', 'more...');
    } catch(err){
      console.log(err);
    }
    return(
      <span>{role}</span>
    )
  } else {
    return(
      <span>{props.roles}</span>
    )
  }
}

const getType = (title) => {
  if(title.match(/\(TV /g)){
    return 'tv';
  } else {
    return 'movie';
  }
}

const formatRole = (role, title) => {
  if(role.match(/episode/g)){
    const roleArray = role.split(/\s\d+\sepisode[s]?,\s/gm);
    role = `${roleArray[0].replace('...', 'more...')} in ${title} (${roleArray[1]})`;
  } else {
    role = `${role} in ${title}`;
  }
  return role;
}

const MatchingItemsTitles = () => {
  if(resp.title1.length === 0 && resp.title2.length === 0){
    return(<p>Unable to find a match. Make sure you've selected the right tab up top.</p>)
  }
  let title1ids = resp.title1.actors.map(d => d.id);
  let title2ids = resp.title2.actors.map(d => d.id);
  const intersection = title1ids.filter(element => title2ids.includes(element));
  const mapped = intersection.map(id => {
    const actor = resp.title1.actors.find(d => d.id === id);
    const actorB = resp.title2.actors.find(d => d.id === id);
    let role = [actor.asCharacter, actorB.asCharacter];
    if(role[0] === role[1]){
      role = actor.asCharacter;
      return(
        <li className="actor" key={id}>
        <a href={`https://www.imdb.com/name/${actor.id}`}>{actor.name}</a> as {role}</li>
      )
    } else {
      return(
        <li className="actor" key={id}>
          <a href={`https://www.imdb.com/name/${actor.id}`}>{actor.name}</a> as
          <ul className="role-sublist">
            <li>{formatRole(role[0], resp.title1.title)}</li>
            <li>{formatRole(role[1], resp.title2.title)}</li>
          </ul>
        </li>
      )
    }
  })
  return(
    <div>
    {intersection.length > 0 &&
      <h2>These actors appeared in {resp.title1.title} and {resp.title2.title}:</h2>
    }
    {intersection.length === 0 &&
      <div>
        <h2>{resp.title1.title} and {resp.title2.title} do not share any actors.</h2>
        <p>Something seem off? Make sure you've selected the right tab up top.</p>
      </div>
    }
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
    const title1Search = fetchData('https://imdb-api.com/en/API/SearchTitle', title1.current.value);
    title1Search.then(data => {
      const title1ID = data.results[0].id;
      const title1Values = fetchData('https://imdb-api.com/en/API/FullCast', title1ID).then(data => {
        if(data){
          resp.title1 = data;
        } else {
          resp.title1 = '';
        }
        setFound1(true);
      })
    })

    const title2Search = fetchData('https://imdb-api.com/en/API/SearchTitle', title2.current.value);
    title2Search.then(data => {
      
      const title2ID = data.results[0].id;
      const title2Values = fetchData('https://imdb-api.com/en/API/FullCast', title2ID).then(data => {
        if(data){
          resp.title2 = data;
        } else {
          resp.title2 = '';
        }
        setFound2(true);
      })
    })
  }

  return(
    <div>
      <form id="findMovies" onSubmit={handleSubmit}>
        <div className="input-wrapper" onChange={() => handleChange(title1)}>
          <input type="text" className="acting" placeholder="Title" ref={title1} />
          <span className='del' onClick={() => clearInput(title1)}>✕</span>
        </div> 
        <div className="ex">&</div>
        <div className="input-wrapper" onChange={() => handleChange(title2)}>
          <input type="text" className="acting" placeholder="Title" ref={title2} />
          <span className='del' onClick={() => clearInput(title2)}>✕</span>
        </div>  
        <button id="submit" type="submit">compare</button>
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
        <li className="actor sub" key={`${resp.actor1.name}-${id}`}>{resp.actor1.name} as <FormatRoles roles={a1matches.find(d => d.id === id).description} /></li>
        <li className="actor sub" key={`${resp.actor2.name}-${id}`}>{resp.actor2.name} as <FormatRoles roles={a2matches.find(d => d.id === id).description} /></li>
      </ul>
    </li>
  )
  return(
    <div>
    {a1matches.length > 0 &&
      <h2>{resp.actor1.name} and {resp.actor2.name} have both appeared in:</h2>
    }
    {a1matches.length === 0 &&
      <div>
        <h2>{resp.actor1.name} and {resp.actor2.name} have never appeared together.</h2>
        <p>Something seem off? Make sure you've selected the right tab up top.</p>
      </div>
    }
      <ul>
        {items}
      </ul>
    </div>
  )
}

const getSimilarity = (nameValue, returnedName) => {
  return stringSimilarity.compareTwoStrings(nameValue, returnedName);
}

const getMostSimilarId = (actorName, array) => {
  array.forEach(item => {
    item.similarity = getSimilarity(actorName.toLowerCase(), item.title.toLowerCase())
  }).sort((a, b) => {
    return b.similarity - a.similarity;
  });
  return array[0].id;
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
      const actor1ID = getMostSimilarId(actor1.current.value, data.results);
      const actor1Values = fetchData('https://imdb-api.com/en/API/Name', actor1ID).then(data => {
        resp.actor1 = data;
        setFound1(true);
      })
    })

    const actor2Search = fetchData('https://imdb-api.com/en/API/SearchName', actor2.current.value);
    actor2Search.then(data => {
      const actor2ID = getMostSimilarId(actor2.current.value, data.results);
      console.log(actor2ID)
      const actor2Values = fetchData('https://imdb-api.com/en/API/Name', actor2ID).then(data => {
        resp.actor2 = data;
        setFound2(true);
      })
    })
  }

  return(
    <div>
      <form id="findActors" onSubmit={handleSubmit}>
        <div className="input-wrapper" onChange={() => handleChange(actor1)}>
          <input type="text" className="acting" placeholder="Actor Name" ref={actor1} />
          <span className="del" onClick={() => clearInput(actor1)}>✕</span>
        </div> 
        <div className="ex">&</div>
        <div className="input-wrapper" onChange={() => handleChange(actor2)}>
          <input type="text" className="acting" placeholder="Actor Name" ref={actor2} />
          <span className="del" onClick={() => clearInput(actor2)}>✕</span>
        </div>  
        <button id="submit" type="submit">compare</button>
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
