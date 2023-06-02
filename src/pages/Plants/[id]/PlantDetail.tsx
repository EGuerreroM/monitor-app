import { Button, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useWebSocket from 'react-use-websocket';

const PlantDetail = () => {
  const { id } = useParams();
  const [humidity, setHumidity] = useState('0');
  const [temperature, setTemperature] = useState('0');

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

  return (
    <>
      <Text>Plant id: {id}</Text>
      <Text>{humidity}</Text>
      <Text>{temperature}</Text>
      <Button onClick={handleClick}>Send Message</Button>
    </>
  );
};

export default PlantDetail;
