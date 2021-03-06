import React, { useState } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getGrades } from "../../actions/grades";
import get from "lodash/get";
import map from "lodash/map"


class GradeSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: null
        };
        this.handleChange = this.handleChange.bind(this);
    };


    componentDidMount() {
        this.props.getGrades()
    }

    handleChange(selectedOption) {
        console.log("test", selectedOption)
        this.setState({ selectedOption })
        this.props.onSelectGrade(selectedOption);
    };
    render() {
        const { selectedOption } = this.state;
        const { grades } = this.props;
        const gradeList = map(grades, ({ id, grade_name }) => ({ value: id, label: grade_name }))
        return (
            <Select
                placeholder="Select Grade"
                className="mb-3"
                value={selectedOption}
                onChange={this.handleChange}
                options={gradeList}
            />
        );
    }
}
const mapStateToProps = state => ({
    grades: get(state.grades, "grades")
})


export default connect(mapStateToProps, { getGrades })(GradeSelect);