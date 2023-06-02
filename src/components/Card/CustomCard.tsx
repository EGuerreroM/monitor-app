import {
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Image,
  Card,
  Text,
  Link,
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

type CustomCardProps = {
  name: string;
  image: string;
  description: string;
  link?: string;
};

const CustomCard = (props: CustomCardProps) => {
  const { name, image, link, description } = props;
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      backgroundColor="green.500"
      maxW={550}>
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src={image}
        alt={name}
      />

      <Stack>
        <CardBody>
          <Heading size="xl" color="white">
            {name}
          </Heading>
          <Text color="white">{description}</Text>
        </CardBody>
        {link && (
          <CardFooter>
            <Link
              backgroundColor="gray.50"
              borderRadius="4px"
              size="sm"
              padding="12px 16px"
              as={RouterLink}
              to={link}>
              View Detail
            </Link>
          </CardFooter>
        )}
      </Stack>
    </Card>
  );
};

export default CustomCard;
