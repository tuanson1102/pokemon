import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Flex, Grid, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import PokemonCard from "../component/PokemonCard";

export type GetListPokemonResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};

type Pokemon = {
  name: string;
  url: string;
};

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const { data, isLoading } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: async () =>
      fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 16}&limit=16`
      ).then((res) => res.json() as Promise<GetListPokemonResponse>),
  });

  const pageCount = Math.ceil((data?.count || 0) / 16);

  return (
    <Flex flexDirection={"column"}>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {isLoading ? (
          <Spinner />
        ) : (
          data?.results.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} />
          ))
        )}
      </Grid>

      <Flex justifyContent={"center"} marginTop={5} gap={1}>
        <ReactPaginate
          forcePage={page - 1}
          onPageChange={({ selected }) => {
            const params = Object.fromEntries(searchParams.entries());

            if (selected === 0) {
              delete params.page;
            } else {
              params.page = String(selected + 1);
            }
            setSearchParams(params);
          }}
          breakLabel={<Button>...</Button>}
          nextLabel={
            <Button>
              <ChevronRightIcon />
            </Button>
          }
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel={
            <Button>
              <ChevronLeftIcon />
            </Button>
          }
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLabelBuilder={(page) => <Button>{page}</Button>}
          activeClassName="active"
        />
      </Flex>
    </Flex>
  );
}
