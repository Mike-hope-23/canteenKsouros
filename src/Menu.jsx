import React, { useEffect, useState } from "react";
import client from "./contentfulClient"; // your Contentful client
import headerImg from "./assets/ksourosheaderu.webp";
import cardIcon from "./assets/cardicon.webp";
import irisIcon from "./assets/iris-payments.webp";

const Menu = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [beers, setBeers] = useState([]);
  const [softDrinks, setSoftDrinks] = useState([]);
  const [winesOuzo, setWinesOuzo] = useState([]);

  // Fetch from Contentful
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Food
        const foodRes = await client.getEntries({ content_type: "canteenMenu", order: "fields.order" });
        setFoodItems(foodRes.items.map((item) => item.fields));

        // Beers
        const beerRes = await client.getEntries({ content_type: "beerItem", order: "fields.order" });
        setBeers(beerRes.items.map((item) => item.fields));

        // Soft drinks
        const softRes = await client.getEntries({ content_type: "softDrinkItem", order: "fields.order" });
        setSoftDrinks(softRes.items.map((item) => item.fields));

        // Wines & Ouzo
        const wineRes = await client.getEntries({ content_type: "wineOuzoItem", order: "fields.order" });
        setWinesOuzo(wineRes.items.map((item) => item.fields));
      } catch (err) {
        console.error("Error fetching menu items:", err);
      }
    };
    fetchData();
  }, []);

  const formatNameAndAmount = (name) => {
    if (!name) return "";
    const parts = name.split(/( \d+(ml| l)$)/);
    if (parts.length > 2) {
      return (
        <>
          {parts[0]} <br /> {parts[1]}
        </>
      );
    }
    return name;
  };

  const formatFoodName = (name) => {
    if (!name) return "";
    const parts = name.split(/(\(.*\))/);
    return (
      <>
        {parts[0]} <br /> {parts[1]}
      </>
    );
  };

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap');
        .kalam-font {
          font-family: 'Kalam', cursive;
        }`}
      </style>
      <div className="text-white w-full min-h-screen kalam-font relative bg-gradient-to-b from-neutral-800 to-neutral-950">
        {/* Header */}
        <div className="flex justify-center items-center bg-red-600 py-1 mb-8">
<img src={headerImg} alt="Kantina Xouros" className="w-[93vw] h-[23vh] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8">
          {/* Left Section - Food Table */}
          <div className="relative">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-center py-6 font-bold text-lg md:text-[1.65rem] bg-yellow-400 text-black border border-yellow-600">
                    ΤΙΜΟΚΑΤΑΛΟΓΟΣ/PRICE LIST
                  </th>
                  <th className="font-bold text-lg px-4 md:text-xl">
                    ΣΑΝΤΟΥΙΤΣ<br />(Sandwich)
                  </th>
                  <th className="font-bold text-lg px-4 md:text-xl">
                    ΜΕΡΙΔΑ<br />(Portion)
                  </th>
                  <th className="font-bold text-lg px-4 md:text-xl">
                    ΤΕΜΑΧΙΟ<br />(Piece)
                  </th>
                </tr>
              </thead>
              <tbody>
                {foodItems.map((item, i) => (
                  <tr key={i} className="border-b border-gray-700">
                    <td className="py-4 pr-2 text-base md:text-xl">
                      {formatFoodName(item.name)}
                    </td>
                    <td className="text-center text-base md:text-xl">
                      {item.sandwich}
                    </td>
                    <td className="text-center text-base md:text-xl">
                      {item.portion}
                    </td>
                    <td className="text-center text-base md:text-xl">
                      {item.piece}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right Section - Drinks */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {/* Beers */}
              <div>
                <h2 className="text-xl font-bold mb-2">ΜΠΥΡΕΣ / BEERS</h2>
                {beers.map((beer, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b border-gray-700 py-2 text-lg"
                  >
                    <span>{formatNameAndAmount(beer.name)}</span>
                    <span>{beer.price}</span>
                  </div>
                ))}
              </div>

              {/* Soft Drinks & Waters */}
              <div>
                <h2 className="text-xl font-bold mb-2">
                  ΑΝΑΨΥΚΤΙΚΑ / SOFT DRINKS
                </h2>
                {softDrinks.map((drink, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b border-gray-700 text-base py-1"
                  >
                    <span>{formatNameAndAmount(drink.name)}</span>
                    <span>{drink.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Wines & Ouzo */}
            <div>
              <h2 className="text-xl font-bold mb-2">
                ΡΕΤΣΙΝΕΣ / WINE - ΤΣΙΠΟΥΡΟ / OUZO
              </h2>
              {winesOuzo.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b border-gray-700 py-0 text-base max-w-[450px]"
                >
                  <span>{formatNameAndAmount(item.name)}</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment images */}
        <div className="absolute bottom-6 right-8 flex items-end space-y-2">
<img src={cardIcon} alt="Visa" className="h-16 md:h-52" />
<img src={irisIcon} alt="Iris" className="h-16 md:h-52" />
        </div>

        {/* Table Footnotes */}
        <div className="absolute bottom-4 left-10 text-xl text-gray-300 leading-relaxed space-y-2">
          <div className="flex gap-4">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>-ΑΛΟΙΦΕΣ +0.30 €</span>
              </div>
              <div className="flex justify-between">
                <span>(salad dressings)</span>
              </div>
              <div className="flex justify-between">
                <span>-ΤΡΙΜΜΕΝΟ ΚΕΦΑΛΟΤΥΡΙ</span>
              </div>
              <div className="flex justify-between">
                <span>+0.30 €</span>
              </div>
              <div className="flex justify-between">
                <span>(grated kefalotyri cheese)</span>
              </div>
            </div>
            <div className="space-y-1">
              <div>* Η μερίδα περιλαμβάνει:</div>
              <div>2 τεμάχια κρεατικών</div>
              <div>Πατάτες, σαλάτα, αλοιφή, κεφαλοτύρι, ψωμί.</div>
              <div>(The food portion includes 2 pieces of meat,</div>
              <div>
                potatoes, salad, dressing, kefalotyri cheese, bread.)
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
