import { AppDispatch, RootState } from "../../store";
import { pokemonApi } from "../../../api/pokemonApi";
import {
  setPokemons,
  setSelectedPokemon,
  startLoadingPokemons,
} from "./pokemonSlice";

export const getPokemons = (page = 0) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(startLoadingPokemons());

    const { data } = await pokemonApi.get(
      `pokemon?limit=20&offset=${page * 20}`
    );

    const currentPokemons = getState().pokemons.pokemons;
    dispatch(
      setPokemons({
        pokemons: [...currentPokemons, ...data.results],
        page: page + 1,
      })
    );
  };
};

export const getSelectedPokemon = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingPokemons());

    const { data } = await pokemonApi.get(`pokemon/${id}`);
    dispatch(setSelectedPokemon({ selectedPokemon: data }));
  };
};
