import { Image, Stack, Text } from '@chakra-ui/react';
import baseApi from '../../services/baseApi';
import { ENDPOINTS, ROUTES } from '../../constants';
import { IDevice } from '../../interfaces';
import { useQuery } from 'react-query';
import CustomCard from '../../components/Card/CustomCard';

const getDevices = async () => {
  const response = await baseApi.get<IDevice[]>(ENDPOINTS.DEVICES);
  return response.data;
};

export const Plants = () => {
  const { data } = useQuery({
    queryKey: ['devices'],
    queryFn: getDevices,
  });

  console.log(data);
  return (
    <Stack margin="0 43px">
      <Text fontSize="60px">My Plants</Text>
      {data?.map((device) => {
        return (
          <CustomCard
            name={device.nombre}
            image={device.imagen_url}
            link={`${ROUTES.PLANTS.DETAIL(device.id)}`}
          />
        );
      })}
    </Stack>
  );
};
export default Plants;