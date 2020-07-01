import React from 'react';

export default function SearchBar(props) {
    return(
        <div className="Searchbar bg-light fixed-top app-header">
            <div className="input-group md-form form-sm form-1 pl-0 search-box">
                <div className="input-group-prepend">
                    <span className="input-group-text bg-info" id="basic-text1"><i className="fas fa-search text-white"
                        aria-hidden="true"></i></span>
                </div>
                <input className="form-control my-0 search-input" type="text" placeholder="Search login"
                 aria-label="Search login" onChange={(event) => {props.onSearch(event.target.value)}}></input>
            </div>
        </div>
    );
}