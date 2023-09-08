import { Header } from "./Header";

export const Login = () => {
  return (
    <>
      <Header />
      <section className="text-center mt-40">
        <h2 className="text-4xl mb-4">Log in to Dotify</h2>
        <button className="bg-[#1ED760] text-black px-32 py-4 rounded-3xl">
          Log In
        </button>
      </section>
    </>
  );
};
