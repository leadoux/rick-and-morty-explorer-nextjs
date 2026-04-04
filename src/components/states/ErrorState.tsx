type ErrorStateProps = {
  message: string;
};

export function ErrorState({ message }: ErrorStateProps) {
  return <p className="error-text">Could not load data: {message}</p>;
}
