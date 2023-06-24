import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "./store/slices/pokemon";
import InfiniteScroll from "react-infinite-scroll-component";
import { AppDispatch, RootState } from "./store/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, pokemons, page } = useSelector(
    (state: RootState) => state.pokemons
  );

  useEffect(() => {
    dispatch(getPokemons(0));
  }, [dispatch]);

  return (
    <div>
      <h1>Pokemon App</h1>
      <hr />

      <InfiniteScroll
        dataLength={pokemons.length}
        next={() => dispatch(getPokemons(page))}
        hasMore={!isLoading}
        loader={<p className="text-center">Loading...</p>}
      >
        {pokemons.map((pokemon) => (
          <div key={pokemon.name}>{pokemon.name}</div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default App;
