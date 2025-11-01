import SeriesItemsDisplayer from "../components/SeriesItems.tsx/SeriesItemsDisplayer"
import "./page.css"
import "./series_page.css"

export default function SeriesPage() {
  return (
    <div className="page series_page">
      <h1>Series</h1>
      <div className="series_page_series_item_container">
        <SeriesItemsDisplayer url="/series_data/series.json" />
      </div>
    </div>
  )
}