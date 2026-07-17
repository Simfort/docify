export default function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`${className} px-5 py-2 rounded-lg shadow outline-0 bg-background`}
      {...props}></input>
  );
}
