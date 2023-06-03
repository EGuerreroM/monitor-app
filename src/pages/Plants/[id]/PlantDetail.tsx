import {
  Button,
  Heading,
  Image,
  Select,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import useWebSocket from 'react-use-websocket';
import baseApi from '../../../services/baseApi';
import { ENDPOINTS } from '../../../constants';
import { IDevice, IPlant } from '../../../interfaces';
import { AxiosError } from 'axios';

const getDetail = async (id: string) => {
  const response = await baseApi<IDevice>({
    url: ENDPOINTS.DEVICES.DETAIL(id),
  });
  return response.data;
};

const getPlants = async () => {
  const response = await baseApi<IPlant[]>(ENDPOINTS.PLANTS);
  return response.data;
};

const PlantDetail = () => {
  const { id } = useParams();
  const [humidity, setHumidity] = useState<string | null>(null);
  const [temperature, setTemperature] = useState<string | null>(null);
  const [pump, setPump] = useState<string | null>(null);
  const [plant, setPlant] = useState('');
  const toast = useToast();

  const { data, isLoading, error, isSuccess } = useQuery<IDevice, AxiosError>({
    queryKey: ['device', id],
    queryFn: () => getDetail(id as string),
    onSuccess: (data) => {
      setPlant(data.planta);
    },
  });

  const { data: plantsData } = useQuery<IPlant[], AxiosError>({
    queryKey: ['plants'],
    queryFn: getPlants,
  });

  const { lastJsonMessage, sendJsonMessage } = useWebSocket(
    `wss://sistema-de-riego-iot.herokuapp.com/monitor/23ff0c37-013b-477b-a21f-c0adc4524da6/`,
    {
      onOpen: () => console.log('WebSocket connection opened.'),
      onClose: () => console.log('WebSocket connection closed.'),
      shouldReconnect: (closeEvent) => {
        closeEvent.isTrusted;
        return true;
      },
      onMessage: (event: WebSocketEventMap['message']) =>
        console.log(event.data),
    }
  );

  const handleClick = () => {
    sendJsonMessage({
      evento: 'cambio_planta',
      planta: plant,
    });
  };

  useEffect(() => {
    if (!lastJsonMessage) return;
    if (lastJsonMessage.evento === 'actualizar_monitor') {
      setHumidity(lastJsonMessage.humedad_medida);
      setTemperature(lastJsonMessage.temperatura_medida);
      setPump(lastJsonMessage.riego_activado ? 'ON' : 'OFF');
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    if (!lastJsonMessage) return;

    if (lastJsonMessage.evento === 'planta_cambiada_feedback') {
      toast({
        title: 'Plant type changed.',
        description: 'The plant type has been changed successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [lastJsonMessage, toast]);

  const currentPlanttype = useMemo(
    () => plantsData?.find((element) => element.tipo === data?.planta),
    [data?.planta, plantsData]
  );
  const currentMaxTemp = useMemo(
    () => currentPlanttype?.temperatura_maxima,
    [currentPlanttype?.temperatura_maxima]
  );
  const objectiveHumidity = useMemo(
    () => currentPlanttype?.humedad_objetivo,
    [currentPlanttype?.humedad_objetivo]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !isSuccess) {
    return <div>There has been an error </div>;
  }

  return (
    <Stack justify="center" alignItems="center" width="100%">
      <Stack alignItems="flex-end" width="100%" minH="400px">
        <Stack
          padding="1rem"
          width={['100%', '100%', '50%', '50%', '50%']}
          backgroundColor="green.500"
          minH={400}>
          <Heading color="white" fontSize={['lg', 'lg', 'lg', '6xl', '8xl']}>
            {data.nombre}
          </Heading>
          <Text color="white" fontSize={['sm', 'md', 'md', 'md', 'xl']}>
            {data.planta_descripcion}
          </Text>
          <Text color="white" fontSize="2xl" fontWeight="semibold">
            Plant type
          </Text>
          <Stack maxW={600} direction="row" alignItems="center">
            <Select
              backgroundColor="gray.50"
              maxW={200}
              value={plant}
              fontSize={['sm', 'md', 'md', 'md', 'xl']}
              onChange={(event) => setPlant(event.target.value)}>
              {plantsData?.map((plant) => (
                <option key={plant.tipo} value={plant.tipo}>
                  {plant.tipo}
                </option>
              ))}
            </Select>
            <Button
              onClick={handleClick}
              fontSize={['sm', 'md', 'md', 'md', 'xl']}>
              Change plant type
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        position="relative"
        justifyContent="flex-end"
        minH={200}
        width="100%"
        borderRadius="24px"
        backgroundColor="white">
        <Image
          src={data.imagen_url}
          width={[300, 300, 300, 300, 500]}
          top="-350px"
          left="50px"
          position="absolute"
          display={['none', 'none', 'block']}
        />
        <Stack width={['100%', '100%', '50%', '50%', '50%']} padding={6}>
          <Stack direction="row" gap={6}>
            <Stack>
              <Text
                fontSize={['lg', 'lg', 'lg', '6xl', '8xl']}
                fontWeight="semibold">
                {humidity ?? '-'}%
              </Text>
              <Text
                fontSize={['smaller', 'smaller', 'smaller', '2xl', '4xl']}
                fontWeight="semibold"
                color={
                  objectiveHumidity && humidity
                    ? Number(humidity) < objectiveHumidity
                      ? 'red.500'
                      : 'green.500'
                    : 'green.500'
                }>
                Humidity
              </Text>
            </Stack>

            <Stack>
              <Text
                fontSize={['lg', 'lg', 'lg', '6xl', '8xl']}
                fontWeight="semibold">
                {temperature ?? '-'}°C
              </Text>
              <Text
                fontSize={['smaller', 'smaller', 'smaller', '2xl', '4xl']}
                fontWeight="semibold"
                color={
                  currentMaxTemp && temperature
                    ? Number(temperature) >= currentMaxTemp
                      ? 'red.500'
                      : 'gree'
                    : 'green.500'
                }>
                Temperature
              </Text>
            </Stack>
            <Stack>
              <Text
                fontSize={['lg', 'lg', 'lg', '6xl', '8xl']}
                fontWeight="semibold">
                {pump ?? '-'}
              </Text>
              <Text
                fontSize={['smaller', 'smaller', 'smaller', '2xl', '4xl']}
                fontWeight="semibold"
                color="green.500">
                Pump
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PlantDetail;
