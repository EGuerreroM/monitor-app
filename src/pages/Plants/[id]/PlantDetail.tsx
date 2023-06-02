import { Box, Button, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import useWebSocket from 'react-use-websocket';
import baseApi from '../../../services/baseApi';
import { ENDPOINTS, ROUTES } from '../../../constants';
import { IDevice } from '../../../interfaces';
import { AxiosError } from 'axios';

const getDetail = async (id: string) => {
  const response = await baseApi<IDevice>({
    url: ENDPOINTS.DEVICES.DETAIL(id),
  });
  return response.data;
};

const PlantDetail = () => {
  const { id } = useParams();
  const [humidity, setHumidity] = useState('0');
  const [temperature, setTemperature] = useState('0');

  const { data, isLoading, error, isSuccess } = useQuery<IDevice, AxiosError>({
    queryKey: ['device', id],
    queryFn: () => getDetail(id as string),
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
      planta: 'Snake Plant',
    });
  };

  useEffect(() => {
    if (!lastJsonMessage) return;
    if (lastJsonMessage.evento === 'actualizar_monitor') {
      setHumidity(lastJsonMessage.humedad_medida);
      setTemperature(lastJsonMessage.temperatura_medida);
    }
  }, [lastJsonMessage]);

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
          width="50%"
          backgroundColor="green.500"
          minH={400}>
          <Heading color="white">{data.nombre}</Heading>
          <Text color="white">{data.planta_descripcion}</Text>
          <Button onClick={handleClick}>Send Message</Button>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        position="relative"
        justifyContent="flex-end"
        minH={200}
        width="100%"
        top={-50}
        borderRadius="24px"
        backgroundColor="white">
        <Image
          src={data.imagen_url}
          width={500}
          top="-350px"
          left="50px"
          position="absolute"
        />
        <Stack width="50%">
          <Stack direction="row" gap={6}>
            <Stack>
              <Text fontSize="8xl" fontWeight="semibold">
                {humidity}%
              </Text>
              <Text fontSize="4xl" fontWeight="semibold">
                Humidity
              </Text>
            </Stack>
            <Stack>
              <Text fontSize="8xl" fontWeight="semibold">
                {temperature}°C
              </Text>
              <Text fontSize="4xl" fontWeight="semibold">
                Temperature
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PlantDetail;
