import React, { useState, useEffect, useReducer, useMemo, useRef } from 'react';


const initialState = {
    favorites: []
};

const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITE':
            return {
                ...state,
                favorites: [
                    ...state.favorites, action.payload
                ]
            }
            case 'REMOVE_FROM_FAVORITES':
			return {
				...state,
				favorites: [
					...state.favorites.filter((favorite) => favorite !== action.payload),
				],
			};
        default:
            return state;   
    }
     
}

const Characters = () => {

    const [characters, setCharacters ] = useState([]);
    const [favorites, dispatch ] = useReducer(favoriteReducer, initialState)
    const [search, setSearch ] = useState('') //para usar useMemo
    const searchInput = useRef('')
    
    const handleClick = favorite => {
        dispatch({
            type: 'ADD_TO_FAVORITE',
            payload: favorite
        })
    }
    const handleDelete = favorite => {
        dispatch({
            type: 'REMOVE_FROM_FAVORITES',
            payload: favorite
        })
    }

    // const handleSearch = (e) => {       //para usar useMemo
    //     setSearch(e.target.value)
    // }
    const handleSearch = () => {
        setSearch(searchInput.current.value)
    }

    // const filteredUsers = characters.filter( user => {
    //     return user.name.toLowerCase().includes( search.toLowerCase())    Sin useMemo
    // })

    const filteredUsers = useMemo(()=>
        characters.filter(( user )=> {
            return user.name.toLowerCase().includes( search.toLowerCase())
        }),
        [ characters, search ]
    )
    
    
    
    
    useEffect(()=>{
        
        fetch("https://rickandmortyapi.com/api/character")
            .then(resp => resp.json())
            .then(data => setCharacters(data.results))
    },[])


    return (
        <div>
            <div className="Search"> 
                <label for="search">Search Character: </label> 
                <input type="text" value={ search } ref={ searchInput } onChange= { handleSearch } className="search" id="search"/>
            </div>
            <h3>Favorites Characters List:</h3>
            
            <div className="Characters">
                <div className="List">
                    { favorites.favorites.map( favorite => (
                        <li key= { favorite.id }>
                            { favorite.name }
                            <button type="button" onClick={ ()=> { handleDelete( favorite )}} className="btnDelete">Borrar</button>
                        </li>
                    ))}
                </div>

                {
                    filteredUsers.map((character)=> (
                        <div>
                            <br/>
                            <h6 key={ character.id }> { character.name }</h6>
                            <img src={character.image} alt="" /><br/>
                            <button type="button" onClick={ ()=> { handleClick( character )}} className="btnAdd">Agregar</button>
                        
                        </div>
                    ))
                }

            </div>
        </div>
    );
}

export default Characters;