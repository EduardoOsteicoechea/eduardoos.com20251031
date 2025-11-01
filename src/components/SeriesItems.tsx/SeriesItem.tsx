interface SeriesItem{
  title:string
}

export default function SeriesItem({title}:SeriesItem){

  return(
    <div className="series_item">
      {title}
    </div>
  );
}