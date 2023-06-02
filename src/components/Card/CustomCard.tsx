import {
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Image,
  Card,
  Text,
  Link,
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

type CustomCardProps = {
  name: string;
  image: string;
  link?: string;
};

const CustomCard = (props: CustomCardProps) => {
  const { name, image, link } = props;
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      maxW={600}>
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src={image}
        alt={name}
      />

      <Stack>
        <CardBody>
          <Heading size="md">{name}</Heading>
        </CardBody>
      </Stack>
      {link && (
        <CardFooter>
          <Link colorScheme="blue" size="sm" as={RouterLink} to={link}>
            View Detail
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default CustomCard;
