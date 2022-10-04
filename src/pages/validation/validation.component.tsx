import React, { useEffect, useMemo, useState } from "react";
import { ApolloClient, gql, InMemoryCache, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Dropdown, Input } from "../../components";
import { Routes } from "../../router";
import styles from "./validation.module.scss";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

const LIST_COUNTRIES = gql`
  {
    countries {
      name
      currency
    }
  }
`;

const SELECTED_COUNTRY = "_SELECTED_COUNTRY";
const SELECTED_CURRENCY = "_SELECTED_CURRENCY";

const getSelectedCountry = () => {
  const selectedCountry = localStorage.getItem(SELECTED_COUNTRY);

  return selectedCountry
    ? JSON.parse(selectedCountry)
    : { value: "", title: "" };
};

const getSelectedCurrency = () => {
  const selectedCurrency = localStorage.getItem(SELECTED_CURRENCY);

  return selectedCurrency || "";
};

export const Validation = () => {
  const [country, setCountry] = useState(getSelectedCountry);
  const [currency, setCurrency] = useState(getSelectedCurrency);
  const countries = useQuery(LIST_COUNTRIES, { client });

  useEffect(() => {
    if (country.value && country.title) {
      localStorage.setItem(SELECTED_COUNTRY, JSON.stringify(country));
    }
  }, [country]);

  useEffect(() => {
    if (currency.length === 3) {
      localStorage.setItem(SELECTED_CURRENCY, currency);
    }
  }, [currency]);

  const itemsList = useMemo(() => {
    if (countries && countries.data) {
      return countries.data.countries.map((country: { name: string }) => ({
        value: country.name,
        title: country.name,
      }));
    }
  }, [countries]);

  return (
    <div className={styles["container"]}>
      <div className={styles["dropdown-container"]}>
        <Dropdown
          itemsList={itemsList}
          selectedItem={country}
          selectItem={setCountry}
        />
      </div>
      <div className={styles["currency-input"]}>
        <Input value={currency} onChange={(e) => setCurrency(e.target.value)} />
      </div>
      <div className={styles["text"]}>
        <p>
          {currency.length === 3
            ? countries?.data?.countries.find(
                (item: { name: string; currency: string }) =>
                  item.name === country.value
              )?.currency === currency
              ? "Currency match the country selected"
              : "Currency does not match the country selected. Please correct"
            : null}
        </p>
      </div>
      <div className={styles["link"]}>
        <Link to={Routes.Continents}>Go to continents</Link>
      </div>
    </div>
  );
};
