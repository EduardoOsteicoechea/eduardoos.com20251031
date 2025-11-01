import { useEffect, useState } from "react";
import SeriesItem from "./SeriesItem";

interface SeriesItemsDisplayerProps{
  url:string
}

interface Item{
  title:string,
  uri:string
}

interface Subseries{
  title:string,
  items:Item[]
}

interface SeriesCategory{
  title:string,
  subseries:Subseries[]
}

interface ApiResponse{
  avalilable_series: SeriesCategory[]
}

export default function SeriesItemsDisplayer({url}:SeriesItemsDisplayerProps){

  const [seriesData, setSeriesData] = useState< SeriesCategory[] | null>(null)

  useEffect(()=>{

    const getData = async () => {

      try {
        const response = await fetch(url);

        if(!response.ok){
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data: ApiResponse = await response.json();

        setSeriesData(data.avalilable_series);

      } catch (error) {
        console.error("Failed to load series data: ", error)
      }
    }


  },[url])

  return(
    <div>
      {seriesData?.map((category, categoryIndex)=>(
        category.subseries.map((subserie, subserieIndex)=>(
          subserie.items.map((subserieItem,subserieItemIndex)=>(
            <SeriesItem
            key={subserieItem.uri}
            url={subserieItem.uri}
            />
          ))
        ))
        ))}
    </div>
  );
}