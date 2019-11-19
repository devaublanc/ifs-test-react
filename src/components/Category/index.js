import React, { Component, PropTypes } from 'react'


export default class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: this.props.filter,
            children: this.props.children
        }
    }

    renderCategoryNames() {
        var Categories = this.state.children.map((child) =>
            <p>{child}</p>
        );
        return Categories;
    }

    render() {
        return (
            <div>
                <h4>{this.state.filter}</h4>
                <p>{this.renderCategoryNames()}</p>
            </div>
        )
    }
}
