import { useState } from 'react'
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Card } from "@/components/ui/card";

function App() {
  const [name, setName] = useState<string>('');
  const [pokemon, setPokemon] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadAPI = () => {
    setIsLoading(true);

    if (name == '') {
      setPokemon(null);
      setIsLoading(false);
      return;
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;

    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setPokemon(json);
      })
      .catch(err => {
        console.log(err);
        setPokemon(undefined);
      })
      .finally(() =>
        setIsLoading(false)
      );
  }

  return (
    <div className='grid gap-5'>
      <div className='grid place-items-center bg-primary p-3'>
        <h1 className='text-4xl text-white font-semibold'>
          Pokewiki
        </h1>
      </div>

      <div className='grid place-items-center'>
        <div className='flex gap-2'>
          <Input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Type your pokemon'
            className='border-black'
          />
          <Button onClick={loadAPI}>Search</Button>
        </div>
      </div>

      <div className='grid place-items-center'>
        {
          isLoading ? (
            <p className='text-xl font-semibold'>Loading...</p>
          ) :
          pokemon ? (
            <Card className='border-black gap-3 p-6'>
              <img 
                src={pokemon.sprites.front_default} 
                alt={pokemon.name} 
                className='w-[240px] h-auto'
              />
              <div>
                <h1 className='text-lg'>
                  <span className='font-semibold'>Name:</span> {pokemon.name}
                </h1>
              </div>
              <div>
                <h1 className='text-lg'>
                  <span className='font-semibold'>Number:</span> {pokemon.id}
                </h1>
              </div>
              <div>
                <h1 className='text-lg'>
                  <span className='font-semibold'>Weight:</span> {pokemon.weight}
                </h1>
              </div>
              <div>
                <h1 className='text-lg'>
                  <span className='font-semibold'>Height:</span> {pokemon.height}
                </h1>
              </div>
            </Card>
          ) : pokemon === undefined ? (
            <p className='text-xl font-semibold'>Pokemon not found!</p>
          ) : null
        }
      </div>
    </div>
  );
}

export default App;