import { useState } from 'react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Card } from "@/components/ui/card";

function App() {
  // State for storing the user's input (Pokémon name)
  const [name, setName] = useState<string>('');
  // State for storing the fetched Pokémon data (or null/undefined)
  const [pokemon, setPokemon] = useState<any>(null);
  // State to indicate whether the API request is in progress
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to load data from the Pokémon API
  const loadAPI = () => {
    setIsLoading(true); // Set loading state to true

    // If the input is empty, reset Pokémon state and stop loading
    if (name === '') {
      setPokemon(null);
      setIsLoading(false);
      return;
    }

    // Construct the API URL using the lowercase Pokémon name
    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;

    // Perform the fetch request
    fetch(url)
      .then(response => response.json())     // Parse JSON response
      .then(json => {
        console.log(json);                  // Log raw JSON to console
        setPokemon(json);                   // Store fetched data
      })
      .catch(err => {
        console.log(err);                   // Log any errors
        setPokemon(undefined);              // Mark as “not found” on error
      })
      .finally(() =>
        setIsLoading(false)                 // Always end loading state
      );
  }

  return (
    <div className='grid gap-5'>
      {/* Header section with title */}
      <div className='grid place-items-center bg-primary p-3'>
        <h1 className='text-4xl text-white font-semibold'>
          Pokewiki
        </h1>
      </div>

      {/* Input section: user types Pokémon name and clicks Search */}
      <div className='grid place-items-center'>
        <div className='flex gap-2'>
          <Input 
            value={name}                             // Controlled input bound to `name`
            onChange={(e) => setName(e.target.value)}// Update state on change
            placeholder='Type your pokemon'          // Placeholder text
            className='border-black'
          />
          <Button onClick={loadAPI}>Search</Button>  {/* Trigger API call */}
        </div>
      </div>

      {/* Result section: shows loading, Pokémon card, or “not found” */}
      <div className='grid place-items-center'>
        {isLoading ? (
          // Show loading indicator while fetching
          <p className='text-xl font-semibold'>Loading...</p>
        ) : pokemon ? (
          // When data is available, display it inside a Card component
          <Card className='border-black gap-3 p-6'>
            {/* Display Pokémon sprite image */}
            <img 
              src={pokemon.sprites.front_default} 
              alt={pokemon.name} 
              className='w-[240px] h-auto'
            />
            {/* Display Pokémon name */}
            <div>
              <h1 className='text-lg'>
                <span className='font-semibold'>Name:</span> {pokemon.name}
              </h1>
            </div>
            {/* Display Pokémon number (ID) */}
            <div>
              <h1 className='text-lg'>
                <span className='font-semibold'>Number:</span> {pokemon.id}
              </h1>
            </div>
            {/* Display Pokémon weight */}
            <div>
              <h1 className='text-lg'>
                <span className='font-semibold'>Weight:</span> {pokemon.weight}
              </h1>
            </div>
            {/* Display Pokémon height */}
            <div>
              <h1 className='text-lg'>
                <span className='font-semibold'>Height:</span> {pokemon.height}
              </h1>
            </div>
          </Card>
        ) : pokemon === undefined ? (
          // If fetch resulted in an error (e.g., Pokémon not found)
          <p className='text-xl font-semibold'>Pokemon not found!</p>
        ) : null}
      </div>
    </div>
  );
}

export default App;
