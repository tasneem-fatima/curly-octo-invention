import React from 'react'
import { calcTime, convertMoney } from "../../helpers";
import PropTypes from "prop-types";
import { Wrapper, Content } from "./MovieInfoBar.styles";
import MovieInfo from '../MovieInfo';
const MovieInfoBar = ({ time, revenue, budget }) => {
    return (
        <Wrapper>
            <Content>
                <div className='column'>
                    <p>Running Time: {calcTime(time)}</p>
                </div>
                <div className='column'>
                    <p>Budget: {convertMoney(budget)}</p>
                </div>
                <div className='column'>
                    <p>Revenue: {convertMoney(revenue)}</p>
                </div>
            </Content>
        </Wrapper>
    )
}
MovieInfoBar.propTypes = {
    time: PropTypes.number,
    revenue: PropTypes.number,
    budget: PropTypes.number
}
export default MovieInfoBar
