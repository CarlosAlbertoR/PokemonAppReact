import { AppDispatch, RootState } from "../../store";
import { pokemonApi } from "../../../api/pokemonApi";
import { setPokemons, startLoadingPokemons } from "./pokemonSlice";

export const getPokemons = (page = 0) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(startLoadingPokemons());

    const { data } = await pokemonApi.get(
      `pokemon?limit=20&offset=${page * 20}`
    );

    dispatch(setPokemons({ pokemons: data.results, page: page + 1 }));
  };
};
