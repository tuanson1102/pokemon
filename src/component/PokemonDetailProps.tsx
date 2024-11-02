import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Progress,
  Tag,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { TypePokemonProps } from "./PokemonCard";

type PokemonDetailProps = {
  pokemon: {
    types: TypePokemonProps[];
    name: string | any;
    abilities: AbilitiesProps[];
    sprites: {
      front_default: string;
    };
    stats: StatsProps[];
  };
};

type AbilitiesProps = {
  ability: {
    name: string | any;
  };
};

type StatsProps = {
  base_stat: number;
  stat: {
    name: string | any;
  };
};

export default function PokemonDetailProps({ pokemon }: PokemonDetailProps) {
  return (
    <div>
      <Grid
        gridTemplateColumns={"repeat(2,1fr)"}
        gap={6}
        boxShadow="md"
        borderRadius={15}
        overflow={"hidden"}
      >
        <GridItem
          className={`bg-${pokemon.types[0].type.name} card-properties__abilities`}
          padding="15px 20px"
          justifyItems={"center"}
        >
          <Heading textTransform={"capitalize"} textColor={"white"}>
            {pokemon.name.replaceAll("-", " ")}
          </Heading>
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            boxSize={"450px"}
            style={{width:'100%'}}
          />
          <Heading fontSize={18} textColor={"white"} marginTop={15}>
            Abilities
          </Heading>
          <Flex gap={2} marginTop={2} flexDir={"column"}>
            {pokemon.abilities.map((ability: AbilitiesProps) => (
              <Tag
                key={ability.ability.name}
                // colorScheme={type.type.name}
                variant="solid"
                justifyContent={"center"}
                padding={"5px 20px"}
                className={`card-abilities__item ${pokemon.types[0].type.name}_type`}
              >
                <Text
                  fontSize={16}
                  fontWeight={600}
                  textTransform={"capitalize"}
                >
                  {ability.ability.name.replaceAll("-", " ")}
                </Text>
              </Tag>
            ))}
          </Flex>
        </GridItem>
        <GridItem padding="15px 20px">
          <Heading textTransform={"capitalize"}>Basic Stats</Heading>
          <Flex flexDirection={"column"} rowGap={3} marginTop={5}>
            {pokemon.stats.map((item: StatsProps) => (
              <Flex key={item.stat.name} alignItems={"center"}>
                <Text
                  width={32}
                  alignItems={"center"}
                  textTransform={"capitalize"}
                >
                  {item.stat.name.replaceAll("-", " ")}
                </Text>

                <Tooltip label={item.base_stat} fontSize="md">
                  <Progress
                    flex={1}
                    value={item.base_stat}
                    colorScheme="green"
                    size={"sm"}
                    min={0}
                    max={150}
                  />
                </Tooltip>
              </Flex>
            ))}
            <Box>
              <strong>Total: </strong>
              {pokemon.stats.reduce(
                (acc: number, curr) => acc + curr.base_stat,
                0
              )}
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </div>
  );
}
