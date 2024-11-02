import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export type PokemonProps = {
  name: string | any;
  url: string;
};

export default function Header() {
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["pokemons", searchInput],
    queryFn: async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
      );
      const result = await response.json();

      if (searchInput) {
        return result.results.filter((pokemon: PokemonProps) =>
          pokemon.name.toLowerCase().includes(searchInput.toLowerCase())
        );
      }

      return result.results;
    },
  });
  console.log(searchParams);

  return (
    <>
      <Flex gap={60} alignItems={"flex-end"} paddingBlock={8}>
        <Flex flexDir={"column"}>
          <Link to={`/`}>
            <Heading as={"h1"}>Pokemon</Heading>
          </Link>
          <Text>
            Search for Pokémon by name or using the National Pokédex number
          </Text>
        </Flex>

        <Box flex={1} position={"relative"}>
          <InputGroup size={"lg"}>
            <InputLeftElement>
              <SearchIcon />
            </InputLeftElement>
            <Input
              value={searchInput}
              placeholder="What pokemon?"
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  setSearchParams({
                    search: (e.target as HTMLInputElement).value,
                  });
                  navigate(`/search?search=${searchInput}`);
                  setSearchInput("");
                }
              }}
            />
          </InputGroup>
          {searchInput.length > 0 && (
            <Grid
              templateColumns="repeat(1, 1fr)"
              gap={2}
              overflowY={"auto"}
              maxH={300}
              w={"100%"}
              boxShadow={"base"}
              position={"absolute"}
              zIndex={1}
              background={"white"}
              padding={"5px 10px"}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                data?.map((pokemon: PokemonProps) => (
                  <Link to={`/pokemon/${pokemon.name}`}>
                    <Text textTransform={"capitalize"}>
                      {pokemon.name.replaceAll("-", " ")}
                    </Text>
                  </Link>
                ))
              )}
            </Grid>
          )}
        </Box>
      </Flex>
    </>
  );
}
