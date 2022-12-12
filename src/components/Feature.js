// import React, { Fragment, useCallback, useState } from 'react';
import React from "react";

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from '../api';

/**
 * We need a new component called Searchable which:
 * 
 * Has a template like this:
 * 
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 * 
 * When someone clicks the anchor tag, you should:
 * 
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 * 
 * Then start a try/catch/finally block:
 * 
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch: 
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = (props) => {
    const { searchTerm, searchValue, setIsLoading, setSearchResults } = props;

   return <Fragment>
    <span className='title'>
        {searchTerm}
    </span>
    <span className="content">
      <a href="#" onClick={async (event) => {
        event.preventDefault();
        setIsLoading(true);
    try {
        const result = await fetchQueryResultsFromTermAndValue(
            searchTerm, searchValue
        );
        setSearchResults(result);
    } catch (err) {
        console.error(err.message)
    } finally {
        setIsLoading(false)
      }
    }}>
          {searchValue}
        </a>
   
      </span> 
    </Fragment>;
}

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 * 
 * <main id="feature"></main>
 * 
 * And like this when one is:
 * 
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 * 
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style, 
 * technique, medium, dimensions, people, department, division, contact, creditline
 * 
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 * 
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 * 
 * This component should be exported as default.
 */
const Feature = (props) => {
    const { featuredResult, setIsLoading, setSearchResults } = props;
    const {
        title,
        dated,
        images,
        description,
        culture,
        style,
        technique,
        medium,
        dimensions,
        people,
        department,
        division,
        contact,
        creditline,
    } = featuredResult || {};

    if (featuredResult === null) return <main id="feature"></main>;
// {dated !== null ? dated : ""} {title !== null ? title : ""}
    return (
        <main id="feature">
            <div className="object-feature">
                <header>
                    <h3>{featuredResult.title}</h3>
                    <h4>{featuredResult.dated}</h4>
                </header>
                <section className="facts">
                    {/* if description is null, don't display description */}
                    {description !== null ? (
                        <React.Fragment>
                            <span className="title">Description</span>
                            <span className="content">{description}</span>
                        </React.Fragment>
                    ) : (
                        ""
                    )}
                    {culture !== null ? (
                        <React.Fragment>
                            <span className="title">Culture</span>
                            <Searchable
                                searchTerm={"culture"}
                                searchValue={culture}
                                setIsLoading={setIsLoading}
                                setSearchResults={setSearchResults}
                            />
                        </React.Fragment>
                    ) : (
                        ""
                    )}
                    {style !== null ? (
                        <React.Fragment>
                            <span className="title">Style</span>
                            <span className="content">{style}</span>
                        </React.Fragment>
                    ) : (
                        ""
                    )}
                    {technique !== null ? (
                        <React.Fragment>
                            <span className="title">Technique</span>
                            <Searchable
                                searchTerm={"technique"}
                                searchValue={technique}
                                setIsLoading={setIsLoading}
                                setSearchResults={setSearchResults}
                            />
                        </React.Fragment>
                    ) : (
                        ""
                    )}
                    {medium !== null ? (
                        <React.Fragment>
                            <span className="title">Medium</span>
                            <Searchable
                                searchTerm={"medium"}
                                searchValue={medium.toLowerCase()}
                                setIsLoading={setIsLoading}
                                setSearchResults={setSearchResults}
                            />
                        </React.Fragment>
                    ) : (
                        ""
                    )}
                    {dimensions !== null ? (
                        <React.Fragment>
                            <span className="title">Dimensions</span>
                            <span className="content">{dimensions}</span>
                        </React.Fragment>
                    ) : (
                        ""
                    )}
                    {people !== null && people !== undefined ? (
                        <React.Fragment>
                            <span className="title">Person</span>
                            {people.map((person) => {
                                return (
                                    <Searchable
                                        key={person.personid}
                                        searchTerm={"person"}
                                        searchValue={person.displayname}
                                        setIsLoading={setIsLoading}
                                        setSearchResults={setSearchResults}
                                    />
                                );
                            })}
                        </React.Fragment>
                    ) : (
                        ""
                    )}
                    {department !== null ? (
                        <React.Fragment>
                            <span className="title">Department</span>
                            <span className="content">{department}</span>
                        </React.Fragment>
                    ) : (
                        ""
                    )}
                    {division !== null ? (
                        <React.Fragment>
                            <span className="title">Division</span>
                            <span className="content">{division}</span>
                        </React.Fragment>
                    ) : (
                        ""
                    )}
                    {contact !== null ? (
                        <React.Fragment>
                            <span className="title">Contact</span>
                            <span className="content">{contact}</span>
                        </React.Fragment>
                    ) : (
                        ""
                    )}
                    {creditline !== null ? (
                        <React.Fragment>
                            <span className="title">Credit</span>
                            <span className="content">{creditline}</span>
                        </React.Fragment>
                    ) : (
                        ""
                    )}
                </section>
                <section className="photos">
                    {images !== null && images !== undefined
                        ? images.map((image) => {
                              return (
                                  <img alt={""}
                                      key={image.imageid}
                                      src={image.baseimageurl}
                                  ></img>
                              );
                          })
                        : ""}
                </section>
            </div>
        </main>
    );
}

export default Feature;