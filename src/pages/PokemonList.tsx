import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { AppDispatch, RootState } from "../store/store";
import { getPokemons } from "../store/slices/pokemon";

const PokemonList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, pokemons, page } = useSelector(
    (state: RootState) => state.pokemons
  );

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(getPokemons(page));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Pokemon App</h1>
      <hr className="my-4" />

      <InfiniteScroll
        dataLength={pokemons.length}
        next={handleLoadMore}
        hasMore={!isLoading}
        loader={<FaSpinner className="text-blue-500 animate-spin" size={24} />}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {pokemons.map((pokemon: any) => {
          const pokemonId = pokemon.url.split("/").slice(-2, -1);

          return (
            <div
              key={pokemon.name}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                alt={pokemon.name}
                className="w-32 h-32 object-contain mb-4"
              />
              <h2 className="text-xl font-semibold">{pokemon.name}</h2>
              <Link to={`/pokemon/${pokemonId}`} className="text-blue-500 mt-2">
                View Details
              </Link>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default PokemonList;
