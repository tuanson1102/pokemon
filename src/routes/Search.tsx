import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PokemonProps } from "../component/Header";
import { Flex, Grid, Spinner } from "@chakra-ui/react";
import PokemonCard from "../component/PokemonCard";

type PokemonNameProps = {
  name: string;
};

export default function Search() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const { data, isLoading } = useQuery({
    queryKey: ["pokemons", searchQuery],
    queryFn: async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
      );
      const result = await response.json();

      if (searchQuery) {
        return result.results.filter((pokemon: PokemonProps) =>
          pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      return result.results;
    },
  });

  return (
    <Flex flexDirection={"column"}>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {isLoading ? (
          <Spinner />
        ) : (
          data?.map((pokemon: PokemonNameProps) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} />
          ))
        )}
      </Grid>
    </Flex>
  );
}
