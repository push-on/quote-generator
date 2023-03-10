import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";

type Advice = {
  slip: {
    advice: string;
  };
};

export const App = () => {
  const [advice, setAdvice] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const baseUrl = "https://api.adviceslip.com/advice";

  // used fetch insted of axios
  const fetchAdvice = async () => {
    setLoading(true);

    const response = await fetch(baseUrl);
    const data: Advice = await response.json();
    setAdvice(data.slip.advice);

    setLoading(false);
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  const spinner = <Oval
    height={70}
    width={70}
    color="#eef0ae"
    secondaryColor="#555d2c"
    strokeWidth={3}
    strokeWidthSecondary={3}
  />;

  return (
    <div className=" flex justify-center items-center h-screen bg-[url(./assets/img.jpg)] bg-center bg-cover	">
      {/* container */}
      <div className="rounded-3xl bg-black/10 p-10 m-10 backdrop-blur-lg shadow-2xl shadow-black/70 border-b-2 border-lime-300 ">
        {/* content */}
        <div className=" flex flex-col justify-center items-center space-y-5 ">
          <div className="font-serif font-medium text-3xl">
            {loading ? spinner : advice}
          </div>
          <button className="btn-blue flex" onClick={fetchAdvice}>Refresh </button>
        </div>
      </div>
      <a href="https://github.com/push-on" className="absolute bottom-5 right-5 hover:underline underline-offset-8	decoration-lime-300	">🙋Link My (Pushons) Github Profile🔗</a>
    </div>
  );
};