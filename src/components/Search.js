import React, { useEffect, useState } from 'react';

/**
 * Don't touch these imports!
 */
import { 
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults
} from '../api';

const Search = (props) => {
  // Make sure to destructure setIsLoading and setSearchResults from the props
   const { setIsLoading, setSearchResults }= props;
  //  const [setIsLoading] = props;
   const [centuryList, setCenturyList] = useState([]);
   const [classificationList, setClassificationList] = useState([]);
   const [queryString, setQueryString] = useState("");
   const [century, setCentury] = useState("any");
   const [classification, setClassification] = useState("any");

  //  console.log(props);

  /** ^^^^^^
   * We are at the Search component, a child of app. This has a form, so we need to use useState for
   * our controlled inputs:
   * 
   * centuryList, setCenturyList (default should be an empty array, [])
   * classificationList, setClassificationList (default should be an empty array, [])
   * queryString, setQueryString (default should be an empty string, '')
   * century, setCentury (default should be the string 'any')
   * classification, setClassification (default should be the string 'any')
   */


  /**
   * Inside of useEffect, use Promise.all([]) with fetchAllCenturies and fetchAllClassifications
   * 
   * In the .then() callback pass the returned lists to setCenturyList and setClassificationList
   * 
   * Make sure to console.error on caught errors from the API methods.
   */
  useEffect(() => {
    const allPromise = Promise.all([fetchAllCenturies(), fetchAllClassifications()]);

    allPromise.then((results) => {
      setCenturyList(results[0]);
      setClassificationList(results[1]);
       
    }).catch((error) => {
      console.error("error", error);
    })
    }, []);

  /**
   * This is a form element, so we need to bind an onSubmit handler to it which:
   * 
   * calls event.preventDefault()
   * calls setIsLoading, set it to true
   * 
   * then, in a try/catch/finally block:
   * 
   * try to:
   * - get the results from fetchQueryResults({ century, classification, queryString })
   * - pass them to setSearchResults
   * 
   * catch: error to console.error
   * 
   * finally: call setIsLoading, set it to false
   */
  return <form id="search" onSubmit={async (event) => {
    // write code here 
    
  event.preventDefault();
   setIsLoading(true);
   console.log("true")

   try {
    const queryResults = await fetchQueryResults({ century, classification, queryString });
    setSearchResults(queryResults);
   } catch (err) {
    console.error(err);
   } finally {
    setIsLoading(false);
   }
  }}>
    <fieldset>
      <label htmlFor="keywords">Query</label>
      <input 
        id="keywords" 
        type="text" 
        placeholder="enter keywords..." 
        value={queryString} 
        onChange={(event) => setQueryString(event.target.value)}/>
    </fieldset>
    <fieldset>
      <label htmlFor="select-classification">Classification <span className="classification-count">({ classificationList.length })</span></label>
      <select 
        name="classification"
        id="select-classification"
        value={classification} 
        onChange={(event) => setClassification(event.target.value)}>
        <option value="any">Any</option> 
        { classificationList.map((classification) => {
            return (
              <option
                key={classification.id}
                value={classification.name}>
                {classification.name}
              </option>
            );
          })
        }
      </select>
    </fieldset>
    <fieldset>
      <label htmlFor="select-century"> Century <span className="century-count">({ centuryList.length })</span></label>
      <select 
        name="century" 
        id="select-century"
        value={century} 
        onChange={(event) => setCentury(event.target.value)}>
        <option value="any">Any</option>
        {/* map over the centuryList, return an <option /> */
         centuryList.map((century) => {
          return (
            <option key={century.id}
            value={century.name}>
              {century.name}
            </option>
          )
         })
        }
      </select>
     </fieldset>
    <button>SEARCH</button>
  </form>
}

export default Search;