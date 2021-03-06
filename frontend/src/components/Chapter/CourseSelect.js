import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getCourses } from "../../actions/courses";
import get from "lodash/get";
import map from "lodash/map"


class CourseSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: null
        };
        this.handleChange = this.handleChange.bind(this);
    };
    componentDidMount() {
        this.props.getCourses()
    }

    handleChange(selectedOption) {
        this.setState({ selectedOption });
        this.props.onSelectCourse(selectedOption);
    };
    render() {
        const { selectedOption } = this.state;
        const { courses } = this.props;
        const courseList = map(courses, ({ id, course_name, grade_name }) => ({ value: id, label: course_name + " for grade " + grade_name }))
        return (
            <Select
                placeholder="Select Course"
                className="mb-3"
                value={selectedOption}
                onChange={this.handleChange}
                options={courseList}
            />
        );
    }
}
const mapStateToProps = state => ({
    courses: get(state.courses, "courses")
})


export default connect(mapStateToProps, { getCourses })(CourseSelect);