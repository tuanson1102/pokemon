import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Spinner,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const padZero = (num: number) => {
  return num.toString().padStart(4, "0");
};

type PokemonCardProps = {
  name: string;
};

export type TypePokemonProps = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export default function PokemonCard({ name }: PokemonCardProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      return res.json();
    },
  });

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Link to={`/pokemon/${data.name}`}>
      <Card
        backgroundColor={"green.500"}
        className={`bg-${data.types[0].type.name} card-pokemon`}
      >
        <CardBody>
          <Flex justifyContent={"space-between"}>
            <Box>
              <Text fontWeight={700} fontFamily={"monospace"} fontSize={"lg"}>
                #{padZero(data.id)}
              </Text>
              <Heading
                fontSize={"2xl"}
                textTransform={"capitalize"}
                textColor={"white"}
                className="text-truncate"
              >
                {data.name.replaceAll("-", " ")}
              </Heading>
              <Flex gap={2} marginTop={2}>
                {data.types.map((type: TypePokemonProps) => (
                  <Tag
                    key={type.type.name}
                    variant="solid"
                    className={`${type.type.name}_type`}
                  >
                    <Text
                      fontSize={"xs"}
                      fontWeight={600}
                      textTransform={"capitalize"}
                    >
                      {type.type.name}
                    </Text>
                  </Tag>
                ))}
              </Flex>
            </Box>
            <Image
              src={data.sprites.front_default}
              alt={data.name}
              boxSize={"96px"}
            />
          </Flex>
        </CardBody>
      </Card>
    </Link>
  );
}
