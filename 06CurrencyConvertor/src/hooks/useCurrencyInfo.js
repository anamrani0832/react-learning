import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({}); // always object ✅

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://open.er-api.com/v6/latest/${currency}`
        );

        const json = await res.json();

        console.log("API RESPONSE:", json); // DEBUG

        if (json && json.rates) {
          setData(json.rates);   // ✅ correct
        } else {
          setData({});           // ✅ fallback
        }

      } catch (error) {
        console.error("Fetch error:", error);
        setData({});             // ✅ never undefined
      }
    }

    fetchData();
  }, [currency]);

  return data; // ✅ ALWAYS object
}

export default useCurrencyInfo;