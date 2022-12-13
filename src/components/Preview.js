import { fetchQueryResultsFromURL } from '../api';
import React from 'react';

// /**
//  * We need to import fetchQueryResultsFromURL since we will sometimes have urls in info.prev and info.next
//  * which are query urls.
//  */

const Preview = (props) => {
// const [ setSearchResults, setFeaturedResult, setIsLoading ] = props;
const { setSearchResults, setFeaturedResult, setIsLoading } = props;
const { info, records } = props.setSearchResults;
//   /**
//    * Destructure setSearchResults, setFeaturedResult, and setIsLoading from props
//    * and also destructure info and records from props.searchResults
//    * 
//    * You need info, records, setSearchResults, setFeaturedResult, and setIsLoading as available constants
//    */



//   /**
//    * Don't touch this function, it's good to go.
//    * 
//    * It has to be defined inside the Preview component to have access to setIsLoading, setSearchResults, etc...
//    */

async function fetchPage(pageUrl) {
  setIsLoading(true);

  try {
      const results = await fetchQueryResultsFromURL(pageUrl);
      setSearchResults(results);
  } catch (error) {
      console.error(error);
  } finally {
      setIsLoading(false);
  }
}

return (
  <aside id="preview">
      <header className="pagination">
          {/* This button should be disabled if nothing is set in info.prev, and should call fetchPage with info.prev when clicked */}
          <button
              disabled={info?.prev === undefined ? true : false}
              className="previous"
              onClick={() => fetchPage(info.prev)}
          >
              Previous
          </button>
          {/* This button should be disabled if nothing is set in info.next, and should call fetchPage with info.next when clicked */}
          <button
              disabled={info?.next === undefined ? true : false}
              className="next"
              onClick={() => fetchPage(info.next)}
          >
              Next
          </button>
      </header>
      <section className="results">
          {records?.map((record) => {
              return (
                <div
                    key={record.id}
                    className="object-preview"
                    onClick={(event) => {
                        // prevent the default
                        event.preventDefault();
                        // set the featured result to be this record, using setFeaturedResult
                        setFeaturedResult(record);
                    }}
                >

                    <a href="/#">
                        {record.primaryiamgeurl !== "" ? (
                            <img alt={""} src={record.primaryimageurl}></img>
                        ) : (
                            ""
                        )}
                        {record.title !== "" ? (
                            <h3>{record.title}</h3>
                        ) : (
                            <h3>MISSING INFO</h3>
                        )}
                    </a>
                </div>
            );
        })}
    </section>
</aside>
);
};
export default Preview;

