import { createSlice } from "@reduxjs/toolkit";

interface Pokemon {
  name: string;
  url: string;
}

interface SelectedPokemon {
  abilities: Array<{
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }>;
  base_experience: number;
  forms: Array<{ name: string; url: string }>;
  game_indices: Array<{
    game_index: number;
    version: { name: string; url: string };
  }>;
  height: number;
  id: number;
  is_default?: boolean;
  location_area_encounters?: string;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }>;
  }>;
  name: string;
  order: number;
  species?: { name: string; url: string };
  sprites?: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
    other: {
      dream_world: {
        front_default: string;
        front_female: string;
      };
      home: {
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  weight: number;
}

export interface PokemonState {
  page: number;
  pokemons: Array<Pokemon>;
  selectedPokemon: SelectedPokemon;
  isLoading: boolean;
}

const initialState: PokemonState = {
  page: 0,
  pokemons: [],
  selectedPokemon: {
    abilities: [],
    base_experience: 0,
    forms: [],
    game_indices: [],
    id: 0,
    height: 0,
    moves: [],
    name: "",
    order: 0,
    stats: [],
    types: [],
    weight: 0,
  },
  isLoading: false,
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    startLoadingPokemons: (state) => {
      state.isLoading = true;
    },
    setPokemons: (state, action) => {
      state.isLoading = false;
      state.page = action.payload.page;
      state.pokemons = action.payload.pokemons;
    },
    setSelectedPokemon: (state, action) => {
      state.isLoading = false;
      state.selectedPokemon = action.payload.selectedPokemon;
    },
  },
});

export const { startLoadingPokemons, setPokemons, setSelectedPokemon } =
  pokemonSlice.actions;
