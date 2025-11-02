import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./post.css"
import "./series_menu.css"
import "./series_menu_controls.css"
import SeriesMenuButton from "./SeriesMenuButton";

interface SeriesItemsDisplayerProps {
  url: string
}

interface SubseriesPost {
  title: string,
  uri: string
}

interface Subseries {
  title: string,
  items: SubseriesPost[]
}

interface SeriesCategory {
  title: string,
  subseries: Subseries[]
}

interface ApiResponse {
  available_series: SeriesCategory[]
}

export default function SeriesItemsDisplayer({ url }: SeriesItemsDisplayerProps) {

  const [seriesData, setSeriesData] = useState<SeriesCategory[] | null>(null);
  const [selectedPostData, setSelectedPostData] = useState<Post | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [isMenuActive, setIsMenuActive] = useState(false);
  const [areBarsRotated, setAreBarsRotated] = useState(false);


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data: ApiResponse = await response.json();
        setSeriesData(data.available_series);
      } catch (error) {
        console.error("Failed to load series data: ", error)
      }
    };
    getData();
  }, [url])

  useEffect(() => {
    const getData = async () => {
      try {
        const selectedArticleUri = searchParams.get('article');
        if (selectedArticleUri) {
          const response = await fetch(selectedArticleUri);
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }
          const data: Post = await response.json();

          console.log(data)
          setSelectedPostData(data);
        }
      } catch (error) {
        console.error("Failed to load selected article data: ", error)
      }
    };
    getData();
  }, [searchParams]);

  const handleArticleSelection = (uri: string) => {
    setSearchParams({ article: uri });
  };

  const toggleMenu = () => {
    setIsMenuActive((prev) => !prev)
  };

  useEffect(() => {
    let timer: any;

    if (isMenuActive) {
      setAreBarsRotated(true)
    } else {
      timer = setTimeout(() => {
        setAreBarsRotated(false)
      }, 200)
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    }

  }, [isMenuActive]);

  const handleSelectedPostItemClick = (id: string) => {
    const selected_post_items_container = document.getElementById("selected_post_items_container");
    const element = document.getElementById(id);

    if (selected_post_items_container) {
      Array.from(selected_post_items_container.children).forEach(element => {
        element.classList.remove("selected_post_item_selected")
      });
    }

    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      })
      element.classList.add("selected_post_item_selected")
    }

  }

  //////////////////////////
  //////////////////////////
  /// Main UI
  //////////////////////////
  //////////////////////////

  return (
    <>
      <div className="series_menu_controls">
        <SeriesMenuButton
          isMenuActive={isMenuActive}
          areBarsRotated={areBarsRotated}
          handleClick={toggleMenu}
        />
        <div
          id="selected_post_items_container"
          className="selected_post_items_container">
          {selectedPostData?.ideas.map((idea, index) => (
            <div
              key={index + "_" + idea.heading}
              id={"selected_post_item" + "_" + idea.heading}
              className="selected_post_item"
              onClick={() => handleSelectedPostItemClick(idea.heading)}
            ></div>
          ))}
        </div>
      </div>

      <div className={`series_menu ${isMenuActive ? "series_menu_active" : ""}`}>
        {seriesData?.map((category) => (
          <SeriesItem
            key={category.title}
            data={category}
            onArticleSelect={handleArticleSelection}
          />
        ))}
      </div>

      <div className="post_container">
        {selectedPostData ?
          <Post
            data={selectedPostData}
          /> : ""}
      </div>
    </>
  );
}

//////////////////////////
//////////////////////////
/// Main UI
//////////////////////////
//////////////////////////

interface SeriesItemProps {
  data: SeriesCategory,
  onArticleSelect: (uri: string) => void
}

function SeriesItem({ data, onArticleSelect }: SeriesItemProps) {

  return (
    <div className="series_item">
      <div className="series_category_heading">{data.title}</div>
      {data?.subseries.map((subserie) => (
        <SubseriesItem
          key={subserie.title}
          data={subserie}
          onArticleSelect={onArticleSelect}
        />
      ))}
    </div>
  );
}

interface SubseriesItemProps {
  data: Subseries,
  onArticleSelect: (uri: string) => void
}

function SubseriesItem({ data, onArticleSelect }: SubseriesItemProps) {

  return (
    <div className="subseries_item">
      <div className="series_category_series_heading">{data.title}</div>
      {data?.items.map((subseriePost) => (
        <SubseriesItemPost
          key={subseriePost.title}
          data={subseriePost}
          onArticleSelect={onArticleSelect}
        />
      ))}
    </div>
  );
}

interface SubseriesPostProps {
  data: SubseriesPost,
  onArticleSelect: (uri: string) => void
}

function SubseriesItemPost({ data, onArticleSelect }: SubseriesPostProps) {
  const handleClick = () => {
    onArticleSelect(data.uri);
  };
  return (
    <div className="subseries_item_post">
      <div className="series_category_series_article_heading">{data.title}</div>
      <button className="series_category_series_article_heading_button" onClick={handleClick}>View</button>
    </div>
  );
}

//////////////////////////
//////////////////////////
/// POST
//////////////////////////
//////////////////////////


interface PostProps {
  data: Post
}

interface Post {
  title: string,
  ideas: Idea[],
}
interface Idea {
  heading: string,
  subideas: Subidea[]
}
interface Subidea {
  content: string,
  strong_phrases: string[],
  type: string,
  biblical_references: string[],
  quote_reference: string[],
}

function Post({ data }: PostProps) {
  return (
    <article
      className="post"
      id="post"
    >
      <h1>{data.title}</h1>
      {
        data.ideas.map((idea) =>
          <PostIdea
            key={idea.heading}
            data={idea}
          />
        )
      }
    </article>
  )
}

interface PostIdeaProps {
  data: Idea
}

function PostIdea({ data }: PostIdeaProps) {
  return (
    <div className="post_idea">
      {!data.heading ? null : <h2 id={data.heading}>{data.heading}</h2>}
      {
        data.subideas.map((subidea, index) =>
          <PostSubidea
            key={index}
            data={subidea}
          />
        )
      }
    </div>
  )
}

interface PostSubideaProps {
  data: Subidea
}

function PostSubidea({ data }: PostSubideaProps) {
  return (
    <div className="post_subidea">
      <p className={`post_subidea_${data.type}`}>
        {data.content}
      </p>

      {data.biblical_references && data.biblical_references.length > 0 && (
        <div className="biblical-references">
          <strong>References:</strong>
          <ul>
            {data.biblical_references.map((ref, index) => (
              <li key={index}>{ref}</li>
            ))}
          </ul>
        </div>
      )}

      {data.quote_reference && data.quote_reference.length > 0 && (
        <div className="quote_references_container">
          {data.quote_reference.map((ref, index) => (
            <p className="quote_reference" key={index}>
              {ref}
            </p>
          ))}
        </div>
      )}

    </div>
  )
}