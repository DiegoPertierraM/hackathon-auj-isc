type Props = {
  title: string;
};

export const Title = ({ title }: Props) => {
  return <h2 className="title">{title}</h2>;
};
