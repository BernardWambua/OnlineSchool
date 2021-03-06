import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCourses, deleteCourse } from "../../actions/courses.js";
import get from "lodash/get";

class Courses extends Component {
    static propTypes() {
        courses: PropTypes.array.isRequired;
        getCourses: PropTypes.func.isRequired;
        deleteCourse: PropTypes.func.isRequired;
    };

    componentDidMount() {
        this.props.getCourses();
    }

    render() {
        return (
            <Fragment>
                <h1>Courses</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Grade</th>
                            <th>Description</th>

                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.courses.map(course => (
                            <tr key={course.id}>
                                <td>{course.course_name}</td>
                                <td>{course.grade_name}</td>
                                <td>{course.description}</td>
                                <td><button onClick=
                                    {this.props.deleteCourse.bind(this, course.id)}
                                    className="btn btn-danger btn-sm">
                                    {""}
                                        Delete
                                    </button>
                                </td>
                            </tr>))}

                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    courses: get(state.courses, "courses")
})

export default connect(mapStateToProps, { getCourses, deleteCourse })(Courses);
