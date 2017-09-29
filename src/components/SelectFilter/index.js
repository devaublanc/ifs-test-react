import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import styles from './index.css'

import Category from 'components/Category'

export default class SelectFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filtersToRender: this.props.filters
        }
    }

    static propTypes = {
        filters: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            children: PropTypes.array,
        })).isRequired,
        onChange: PropTypes.func,
        rootStyle: PropTypes.string
    }

    componentWillReceiveProps(nextProps) {
        console.log('component received props')
        if (nextProps) {
            this.setState({
                filtersToRender: nextProps.filters,
            });
        }
    }

    renderCategories() {
        console.log(this.state.filtersToRender)
        var Filters = this.state.filtersToRender.map((filter, index) =>
             <Category key={index.toString()} filter={filter.name} children={filter.children} />
        );
        return Filters;

    }

    filterFilters(pattern) {
        const regexString = '^' + pattern
        const regex = new RegExp(regexString, 'i')
        // removes categories where no child matches
        let newCategories = this.props.filters.filter(filter => {
            return filter.children.some(child => regex.test(child))
        })
        // removes non-matching children from categories
        return newCategories.map(filter => {
            let newCategory = Object.assign({}, filter)
            newCategory.children = filter.children.filter(child => regex.test(child))
            return newCategory
        })

    }

    handleChange(e) {
        const inputVal = e.target.value;
        const filteredFilters = this.filterFilters(inputVal)
        this.setState((prevState) => ({
        filtersToRender: filteredFilters,
        }));
    }

    render() {
        const {
            rootStyle
        } = this.props;
        console.log("RENDERED CATEGORIES",this.renderCategories())
        return (
            <div className={ classNames(styles.selectfilter, rootStyle)}>
                <p>select a channel</p>
                <input type="text" onChange={this.handleChange.bind(this)} />
                {this.renderCategories()}
            </div>
        )
    }
}
