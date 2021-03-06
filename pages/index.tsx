import React, { FC } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import PageWithLayoutType from "../types/pageWithLayout";
import counties from "../data/counties.json";
import MainLayout from "../layouts/mainLayout";
import styled from "@emotion/styled";
import { ICounties, IElectricityContract, IPost } from "../types";
import Post from "../components/Post";
import { InferGetStaticPropsType } from "next";
import axios from "axios";
interface ComponentProps {
  className?: string;
  label: string;
}
interface IElAvtal {
  productType: string;
}

interface CheckboxProps {
  checked: boolean;
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function Home({ posts, data }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [postList, setPostList] = React.useState(posts);
  const [dataList, setDataList] = React.useState(data);
  const [selectedStrom, setSelectedStrom] = React.useState(15000);
  const [productType, setProductType] = React.useState<string[]>([]);
  const elavtal: any[] = [
    { productType: "SPOT" },
    { productType: "HOURLY SPOT" },
    { productType: "FIXED" },
    { productType: "BUY PRICE" }
  ];
  const [county, setCounty] = React.useState<ICounties>({
    id: 254,
    number: 301,
    name: "Oslo",
    countyId: 11
  });
  console.log(productType);
  
  const filteredUnits:any[] = productType.length || selectedStrom
      ? data.filter((elavtal) => {
        // // console.log("filtering", elavtal);
        return (
          (!productType.length ||
            productType.includes(elavtal.productType)) &&
          (elavtal.maxKWYear > selectedStrom)
        );
      })
      : data;
  const onChange = async (
    value: string
  ): Promise<Array<IElectricityContract> | any> => {
    console.log(value);

    let chosen = counties.filter(function (obj) {
      return obj.name === value;
    });
    let res = await axios(`http://strom.valjoh.se/?city=${chosen[0].id}`);
    setDataList(res.data);
    setCounty(chosen[0]);
    console.log(res.data);
  };

  if (!postList) return <h1>Loading...</h1>;

  return (
    <main className="container">
      <h1>My posts</h1>
      <p>Str??mavtale</p>
      <input
        type="range"
        min="0"
        max="100000"
        step="500"
        value={selectedStrom}
        onChange={(e) => {
          setSelectedStrom(parseInt(e.target.value));
        }}
      />
      <input
        type="number"
        step="500"
        value={selectedStrom}
        onChange={(e) => {
          setSelectedStrom(parseInt(e.target.value));
        }}
      />
      <p>{selectedStrom}</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {elavtal.map((elavtal, i) => {
          return (
            <div style={{ flexDirection: "column" }}>
              <input
                type="checkbox"
                key={i}
                defaultChecked={false}
                id="designillustration"
                value={elavtal.productType}
                onChange={(event:any) =>
                  setProductType((prev:any) =>
                    event.target.checked
                      ? [...prev, elavtal.productType]
                      : []
                  )
                }
              />
              <label>{elavtal.productType}</label>
            </div>
          );
        })}
      </div>
      <select
        defaultValue={county?.name}
        value={county?.name}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {postList.map((post: ICounties, index) => {
          return (
            <option key={index} value={post.name} title={post.name}>
              {post.name}
            </option>
          );
        })}
      </select>
      <p>{county.name}</p>
      <table>
        <thead>
          <tr>
            <th>Row number</th>
            <th>Str??mselskap</th>
            <th>Vilk??r</th>
            <th
              onClick={() => {
                console.log("something");
              }}
            >
              Pris per KWt
            </th>
            <th>Forventet m??nedspris</th>
            <th>Orderlink</th>
          </tr>
        </thead>
        <tbody>
          {filteredUnits.map((x, index) => {
            return (
              <tr
                key={index}
                style={{ backgroundColor: index < 5 ? "#87CEEB" : "#ffffff" }}
              >
                <th>{index + 1}</th>
                <th>{x.organizationName}</th>
                <th>{x.productName}</th>
                <th>
                  {(
                    x.currentPrice.kwPrice +
                    x.currentPrice?.addonPrice * 1.25
                  ).toFixed(2)}
                </th>
                <th>
                  {(
                    (x.currentPrice.kwPrice +
                      x.currentPrice?.addonPrice * 1.25) *
                    1500
                  ).toFixed(2)}
                </th>
                <th>{x.orderUrl}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

(Home as PageWithLayoutType).layout = MainLayout;
const BASE_URL: string = "http://localhost:3000/api/counties";
const BASE_URL1: string = `http://strom.valjoh.se/?city=9`;

export async function getStaticProps() {
  const res = await fetch(BASE_URL);
  const res1 = await fetch(BASE_URL1);

  const posts: ICounties[] = await res.json();
  const data: IElectricityContract[] = await res1.json();

  return {
    props: {
      posts,
      data
    }
  };
}
export default Home;
