import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { AppDispatch, RootState } from "../store/store";
import { getSelectedPokemon } from "../store/slices/pokemon";

const PokemonDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const { isLoading, selectedPokemon } = useSelector(
    (state: RootState) => state.pokemons
  );

  useEffect(() => {
    if (id) dispatch(getSelectedPokemon(id));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <FaSpinner className="text-blue-500 animate-spin" size={24} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <div className="rounded-full overflow-hidden border-4 border-white shadow-md">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.id}.png`}
                  alt={selectedPokemon.name}
                  className="w-64 h-64"
                />
              </div>
              <h1 className="text-4xl font-bold ml-4">
                {selectedPokemon.name}
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4">Abilities</h2>
                  <div className="overflow-auto max-h-96">
                    <ul className="list-disc pl-6 space-y-2">
                      {selectedPokemon.abilities.map((ability) => (
                        <li key={ability.ability.name}>
                          {ability.ability.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4">Stats</h2>
                  <div className="overflow-auto max-h-96">
                    <ul className="list-disc pl-6 space-y-2">
                      {selectedPokemon.stats.map((stat) => (
                        <li key={stat.stat.name}>
                          <span className="font-semibold">
                            {stat.stat.name}:
                          </span>{" "}
                          {stat.base_stat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4">Types</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    {selectedPokemon.types.map((type) => (
                      <li key={type.type.name}>{type.type.name}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4">Height</h2>
                  <p>{selectedPokemon.height}</p>
                </div>
              </div>

              <div className="col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4">Weight</h2>
                  <p>{selectedPokemon.weight}</p>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4">Moves</h2>
                  <div className="overflow-auto max-h-96">
                    <ul className="list-disc pl-6 space-y-2">
                      {selectedPokemon.moves.map((move) => (
                        <li key={move.move.name}>{move.move.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Additional properties/cards */}
              <div className="col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Base Experience
                  </h2>
                  <p>{selectedPokemon.base_experience}</p>
                </div>
              </div>

              <div className="col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4">Forms</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    {selectedPokemon.forms.map((form) => (
                      <li key={form.name}>{form.name}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4">Game Indices</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    {selectedPokemon.game_indices.map((index) => (
                      <li key={index.game_index}>
                        {index.version.name} - {index.game_index}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
