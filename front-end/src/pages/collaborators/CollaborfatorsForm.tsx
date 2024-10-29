import { useParams } from 'react-router-dom';

export const CollaborfatorsForm = () => {
  const { id } = useParams<{ id: string }>();

  console.log({ id });
  return <div>CollaborfatorsForm</div>;
};
