import React, { Component } from 'react'
import request from 'superagent'

// import components
import SelectFilter from 'components/SelectFilter'

import styles from './index.css'


export default class Home extends Component {

    state = {
        data: []
    }

    handleChange(currentFilter) {

    }

    componentDidMount() {

        // do your xhr request here (http://localhost:5000/category)
        request
            .get('http://localhost:5000/category')
            .end((err, res) => {
                if (res) {
                    console.log('res', res.body) // eslint-disable-line
                    // change state when arrives and then pass it to selectfilter
                    this.setState({
                        data: this.formatData(res.body),
                    });
                }
            });

    }

    formatData(data) {
        let flatArrayFromCategoryNames = [];
        let formatted = data;
        formatted.forEach(category => {
            let children = category.children.forEach(child => flatArrayFromCategoryNames.push(child.name))
            category.children = flatArrayFromCategoryNames;
            flatArrayFromCategoryNames = [];
        })
        return formatted
    }



    render() {
        return (
            <div className={ styles.home }>
                <h1>ifs test react</h1>
                <SelectFilter
                    filters={this.state.data}
                    onChange={(currentFilter) => {
                        console.log('currentFilter', currentFilter) // eslint-disable-line

                    }}
                    rootStyle={ styles.filter }
                />
            </div>
        )
    }
}
