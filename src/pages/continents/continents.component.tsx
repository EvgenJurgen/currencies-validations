import React, { useEffect, useMemo, useState } from "react";
import { ApolloClient, gql, InMemoryCache, useQuery } from "@apollo/client";
import styles from "./continents.module.scss";
import { Dropdown } from "../../components";
import { Link } from "react-router-dom";
import { Routes } from "../../router";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

const LIST_CONTINENTS = gql`
  {
    continents {
      name
      code
    }
  }
`;

const SELECTED_CONTINENT = "_SELECTED_CONTINENT";

const getSelectedContinent = () => {
  const selectedContinent = localStorage.getItem(SELECTED_CONTINENT);

  return selectedContinent
    ? JSON.parse(selectedContinent)
    : { value: "", title: "" };
};

export const Continents = () => {
  const [continent, setContinent] = useState(getSelectedContinent);
  const continents = useQuery(LIST_CONTINENTS, { client });

  useEffect(() => {
    if (continent.value && continent.title) {
      localStorage.setItem(SELECTED_CONTINENT, JSON.stringify(continent));
    }
  }, [continent]);

  const CONTINENT = useMemo(() => {
    return gql`
      {
        continent(code: "${continent.value}") {
          name,
          countries{
            name
          }
        }
      }
    `;
  }, [continent]);

  const [countries, setCountries] = useState([]);

  const responseContinent = useQuery(CONTINENT, { client });

  useEffect(() => {
    if (responseContinent && responseContinent.data) {
      setCountries(
        responseContinent.data.continent.countries.map(
          (country: { name: string }) => country.name
        )
      );
    }
  }, [responseContinent]);

  const itemsList = useMemo(() => {
    if (continents && continents.data) {
      return continents.data.continents.map(
        (continent: { code: string; name: string }) => ({
          value: continent.code,
          title: continent.name,
        })
      );
    } else {
      return null;
    }
  }, [continents]);

  return (
    <div className={styles["container"]}>
      <div className={styles["dropdown-container"]}>
        <Dropdown
          itemsList={itemsList}
          selectedItem={continent}
          selectItem={setContinent}
        />
      </div>
      <p className={styles["countries-list"]}>{countries.join(", ")}</p>
      <div className={styles["link"]}>
        <Link to={Routes.Validation}>Go to validation</Link>
      </div>
    </div>
  );
};
