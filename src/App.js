import React, { useState, useRef, Component } from 'react';
import './App.scss';
import stringSimilarity from 'string-similarity';

// Use imdbapi.dev API through proxy
const IMDB_API_BASE = 'https://api.imdbapi.dev';
const PROXY_URL = process.env.REACT_APP_PROXY_URL || '/api/proxy';

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

async function searchIMDb(query){
  console.log('🔍 Searching IMDb for:', query);
  const urlStr = `https://search.imdbot.workers.dev/?q=${encodeURIComponent(query)}`;
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
   
  const data = await fetch(urlStr, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('✅ Search results:', result);
      return result;
    })
    .catch(error => {
      console.log('❌ Search error:', error);
      return null;
    });

  return data;
}

async function searchIMDbSuggestion(query){
  console.log('🔍 Searching IMDb suggestions for:', query);
  // Use IMDb's suggestion API which separates people from titles
  const urlStr = `https://v3.sg.media-imdb.com/suggestion/x/${encodeURIComponent(query.toLowerCase().replace(/\s+/g, '_'))}.json`;
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
   
  const data = await fetch(urlStr, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('✅ Suggestion results:', result);
      return result;
    })
    .catch(error => {
      console.log('❌ Suggestion error:', error);
      return null;
    });

  return data;
}

async function getActorFilmography(imdbId){
  console.log('🎬 Getting filmography for actor:', imdbId);
  
  const filmography = [];
  let nextPageToken = null;
  let pageCount = 0;
  const maxPages = 50; // Limit to prevent infinite loops
  
  try {
    do {
      pageCount++;
      const apiUrl = nextPageToken 
        ? `${IMDB_API_BASE}/names/${imdbId}/filmography?pageSize=50&pageToken=${encodeURIComponent(nextPageToken)}`
        : `${IMDB_API_BASE}/names/${imdbId}/filmography?pageSize=50`;
      
      const urlStr = `${PROXY_URL}?url=${encodeURIComponent(apiUrl)}`;
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      console.log(`📄 Fetching page ${pageCount}...`);
      
      // Add delay between requests to avoid rate limiting (except for first request)
      if (pageCount > 1) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      }
      
      const response = await fetch(urlStr, requestOptions);
      console.log('📡 Response status:', response.status);
      
      // Check for rate limit
      if (response.status === 429) {
        console.log('⚠️ Rate limit hit, stopping pagination');
        break;
      }
      
      const result = await response.json();
      
      // Process filmography data from API
      if (result && result.credits) {
        console.log('📊 Found credits on this page:', result.credits.length);
        
        result.credits.forEach(credit => {
          if (credit.title && credit.title.id && credit.title.primaryTitle) {
            filmography.push({
              id: credit.title.id,
              title: credit.title.primaryTitle,
              year: credit.title.releaseYear || '',
              description: credit.characters ? credit.characters.join(', ') : credit.title.primaryTitle,
              role: 'Actor'
            });
          }
        });
      }
      
      // Get next page token
      nextPageToken = result.nextPageToken || null;
      
      // Continue if there's more data
    } while (nextPageToken && pageCount < maxPages);
    
    console.log(`✅ Extracted filmography: ${filmography.length} titles across ${pageCount} pages`);
    
    return {
      castMovies: filmography
    };
  } catch (error) {
    console.log('❌ Filmography error:', error);
    return { castMovies: filmography }; // Return what we got so far
  }
}

async function getTitleCast(imdbId){
  console.log('🎭 Getting cast for title:', imdbId);
  const apiUrl = `${IMDB_API_BASE}/titles/${imdbId}/credits`;
  const urlStr = `${PROXY_URL}?url=${encodeURIComponent(apiUrl)}`;
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
   
  const data = await fetch(urlStr, requestOptions)
    .then(response => {
      console.log('📡 Response status:', response.status);
      return response.json();
    })
    .then(result => {
      console.log('📄 Received cast data:', result);
      
      const cast = [];
      
      // Process cast data from API
      if (result && result.credits && result.credits.cast) {
        console.log('📊 Found cast members:', result.credits.cast.length);
        
        result.credits.cast.forEach(member => {
          if (member.id && member.name) {
            cast.push({
              id: member.id,
              name: member.name,
              asCharacter: member.characters ? member.characters.join(', ') : member.name
            });
          }
        });
      }
      
      console.log('✅ Extracted cast:', cast.length, 'actors');
      return {
        actors: cast
      };
    })
    .catch(error => {
      console.log('❌ Cast error:', error);
      return { actors: [] };
    });

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
    console.log('🚀 TITLE COMPARISON STARTED');
    console.log('Title 1:', title1.current.value);
    console.log('Title 2:', title2.current.value);
    setNewItem(false);
    setFound1(false);
    setFound2(false);
    
    const title1Search = searchIMDbSuggestion(title1.current.value);
    title1Search.then(data => {
      console.log('📥 Title 1 search complete');
      if (data && data.d && data.d.length > 0) {
        // Filter for title results (movies/shows)
        const titleResults = data.d.filter(item => 
          item.id && item.id.startsWith('tt')
        );
        
        console.log('🎬 Found', titleResults.length, 'title results');
        
        if (titleResults.length > 0) {
          const title1ID = titleResults[0].id;
          const title1Title = titleResults[0].l;
          console.log('🎬 Found Title 1:', title1Title, '(', title1ID, ')');
          getTitleCast(title1ID).then(castData => {
            if(castData && castData.actors){
              resp.title1 = {
                ...castData,
                title: title1Title,
                imdbID: title1ID
              };
              console.log('✅ Title 1 complete. Cast:', castData.actors.length, 'actors');
            } else {
              resp.title1 = { actors: [], title: title1Title };
              console.log('⚠️ Title 1: No cast data found');
            }
            setFound1(true);
          })
        } else {
          resp.title1 = { actors: [], title: '' };
          console.log('⚠️ Title 1: No title results');
          setFound1(true);
        }
      } else {
        resp.title1 = { actors: [], title: '' };
        console.log('⚠️ Title 1: No search results');
        setFound1(true);
      }
    })

    const title2Search = searchIMDbSuggestion(title2.current.value);
    title2Search.then(data => {
      console.log('📥 Title 2 search complete');
      if (data && data.d && data.d.length > 0) {
        // Filter for title results (movies/shows)
        const titleResults = data.d.filter(item => 
          item.id && item.id.startsWith('tt')
        );
        
        console.log('🎬 Found', titleResults.length, 'title results');
        
        if (titleResults.length > 0) {
          const title2ID = titleResults[0].id;
          const title2Title = titleResults[0].l;
          console.log('🎬 Found Title 2:', title2Title, '(', title2ID, ')');
          getTitleCast(title2ID).then(castData => {
            if(castData && castData.actors){
              resp.title2 = {
                ...castData,
                title: title2Title,
                imdbID: title2ID
              };
              console.log('✅ Title 2 complete. Cast:', castData.actors.length, 'actors');
            } else {
              resp.title2 = { actors: [], title: title2Title };
              console.log('⚠️ Title 2: No cast data found');
            }
            setFound2(true);
          })
        } else {
          resp.title2 = { actors: [], title: '' };
          console.log('⚠️ Title 2: No title results');
          setFound2(true);
        }
      } else {
        resp.title2 = { actors: [], title: '' };
        console.log('⚠️ Title 2: No search results');
        setFound2(true);
      }
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
  });
  array.sort((a, b) => {
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
    console.log('🚀 ACTOR COMPARISON STARTED');
    console.log('Actor 1:', actor1.current.value);
    console.log('Actor 2:', actor2.current.value);
    setNewItem(false);
    setFound1(false);
    setFound2(false);
    
    // Use suggestion API which better identifies people vs titles
    const actor1Search = searchIMDbSuggestion(actor1.current.value);
    actor1Search.then(data => {
      console.log('📥 Actor 1 search complete');
      if (data && data.d && data.d.length > 0) {
        // Filter for person results (they have 'qid' property or lack 'q' for title type)
        const personResults = data.d.filter(item => 
          item.id && item.id.startsWith('nm')
        );
        
        console.log('👤 Found', personResults.length, 'person results for Actor 1');
        console.log('👤 Person results:', personResults);
        
        if (personResults.length > 0) {
          // Get best match
          const actor1ID = getMostSimilarId(actor1.current.value, personResults.map(p => ({
            id: p.id,
            title: p.l || p.name
          })));
          
          console.log('🎯 Best match Actor 1:', actor1ID);
          
          getActorFilmography(actor1ID).then(filmData => {
            const actorName = personResults.find(p => p.id === actor1ID)?.l || personResults.find(p => p.id === actor1ID)?.name || actor1.current.value;
            resp.actor1 = {
              ...filmData,
              name: actorName,
              imdbID: actor1ID
            };
            console.log('✅ Actor 1 complete:', actorName, '-', filmData.castMovies.length, 'films');
            setFound1(true);
          });
        } else {
          resp.actor1 = { castMovies: [], name: actor1.current.value };
          console.log('⚠️ Actor 1: No person results');
          setFound1(true);
        }
      } else {
        resp.actor1 = { castMovies: [], name: actor1.current.value };
        console.log('⚠️ Actor 1: No search results');
        setFound1(true);
      }
    })

    const actor2Search = searchIMDbSuggestion(actor2.current.value);
    actor2Search.then(data => {
      console.log('📥 Actor 2 search complete');
      if (data && data.d && data.d.length > 0) {
        // Filter for person results
        const personResults = data.d.filter(item => 
          item.id && item.id.startsWith('nm')
        );
        
        console.log('👤 Found', personResults.length, 'person results for Actor 2');
        console.log('👤 Person results:', personResults);
        
        if (personResults.length > 0) {
          const actor2ID = getMostSimilarId(actor2.current.value, personResults.map(p => ({
            id: p.id,
            title: p.l || p.name
          })));
          
          console.log('🎯 Best match Actor 2:', actor2ID);
          
          getActorFilmography(actor2ID).then(filmData => {
            const actorName = personResults.find(p => p.id === actor2ID)?.l || personResults.find(p => p.id === actor2ID)?.name || actor2.current.value;
            resp.actor2 = {
              ...filmData,
              name: actorName,
              imdbID: actor2ID
            };
            console.log('✅ Actor 2 complete:', actorName, '-', filmData.castMovies.length, 'films');
            setFound2(true);
          });
        } else {
          resp.actor2 = { castMovies: [], name: actor2.current.value };
          console.log('⚠️ Actor 2: No person results');
          setFound2(true);
        }
      } else {
        resp.actor2 = { castMovies: [], name: actor2.current.value };
        console.log('⚠️ Actor 2: No search results');
        setFound2(true);
      }
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
