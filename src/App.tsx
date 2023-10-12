import { useState, useEffect } from "react";
import axios from "axios";

interface DataHero {
  hero_id: number;
  hero_name: string;
  hero_role: string;
  hero_specially: string;
}

const App = () => {
  const [data, setData] = useState<DataHero[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>("");
  const [filteredHero, setFilteredHero] = useState<DataHero[]>([]);

  useEffect(() => {
    FetchingHeros();
  }, []);

  const FetchingHeros = () => {
    axios
      .get("https://api.dazelpro.com/mobile-legends/hero")
      .then((res) => {
        setData(res.data.hero);
        setLoading(false);
        setFilteredHero(res.data.hero);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearchHero = () => {
    const keywordLower = keyword.toLowerCase();
    const filteringHero = data.filter((hero: DataHero) => {
      return hero.hero_name.toLowerCase().includes(keywordLower);
    });

    setFilteredHero(filteringHero);
  };

  const handleResetInput = () => {
    setKeyword("");
    setFilteredHero(data);
  };

  if (loading) {
    return <span className="loading loading-dots loading-lg "></span>;
  }

  return (
    <div className="m-20">
      <div>
        <h1 className="text-center font-bold text-[50px] mb-10">
          Mobile Legends
        </h1>
        <div className="flex justify-center my-5">
          <input
            type="text"
            placeholder="Input Name Hero"
            className="input input-bordered w-full max-w-xs mx-5"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" ? handleSearchHero() : <></>;
            }}
          />
          <button
            className="btn btn-outline btn-primary mx-5"
            onClick={handleSearchHero}
          >
            Search
          </button>
          <button
            className="btn btn-error text-white"
            onClick={handleResetInput}
          >
            Reset
          </button>
        </div>
        <div className="flex flex-wrap gap-10 justify-center">
          {filteredHero.length === 0 ? (
            <p className="text-center text-[25px] text-neutral-500 my-10">
              Hero not found
            </p>
          ) : (
            filteredHero?.map((hero: DataHero) => (
              <div
                key={hero.hero_id}
                className="card w-72 bg-base-100 p-5 shadow-xl "
              >
                <div className="card-body">
                  <h2 className="card-title text-[30px] font-bold">
                    {hero.hero_name}
                  </h2>
                  <p className="py-3 text-[24px]">{hero.hero_role}</p>
                  <p>{hero.hero_specially}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
