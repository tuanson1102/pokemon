import { Skeleton } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PokemonDetailProps from "../component/PokemonDetailProps";

export type PokemonPageParams = {
  name: string;
};

export default function Pokemon() {
  const { name } = useParams<PokemonPageParams>();

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      return res.json();
    },
  });

  if (isLoading) {
    return <Skeleton />;
  }

  return <PokemonDetailProps pokemon={data} />;
}
