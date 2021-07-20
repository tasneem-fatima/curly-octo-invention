import React, { useState, useEffect, useRef } from 'react'
import PropTypes from "prop-types";
import searchIcon from "../../images/search-icon.svg";
import { Wrapper, Content } from "./SearchBar.styles";

const SearchBar = ({ setSearchTerm }) => {
    const [state, setState] = useState('')
    const initialRef = useRef(true)
    useEffect(() => {
        if (initialRef.current) {
            initialRef.current = false;
            return;
        }
        const timer = setTimeout(() => {
            setSearchTerm(state)
        }, 500)
        return () => clearTimeout(timer);
    }, [state, setSearchTerm])
    return (
        <Wrapper>
            <Content>
                <img src={searchIcon}
                    alt='search-icon' />
                <input
                    type='text'
                    placeholder='Search Movie'
                    onChange={e => setState(e.currentTarget.value)}
                    value={state} />
            </Content>
        </Wrapper>
    )
}
SearchBar.propTypes = {
    setSearchTerm: PropTypes.func
}
export default SearchBar;
