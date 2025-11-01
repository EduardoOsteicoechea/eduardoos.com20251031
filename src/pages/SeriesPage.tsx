import SeriesItemsDisplayer from "../components/SeriesItems.tsx/SeriesItemsDisplayer"
import "./page.css"
import "./series_page.css"

export default function SeriesPage() {
  return (
    <div className="page series_page">
      <SeriesItemsDisplayer url="/series_data/series.json" />
    </div>
  )
}