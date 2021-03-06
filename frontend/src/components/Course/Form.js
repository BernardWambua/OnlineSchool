import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import GradeSelect from "./GradeSelect";
import { addCourse } from "../../actions/courses";


class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            course_name: "",
            grade: null,
            description: ""
        }
        this.handleGradeSelect = this.handleGradeSelect.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    static propTypes() {
        addCourse: PropTypes.func.isRequired;
    };
    handleGradeSelect(gradeValue) {

        this.setState({ grade: gradeValue });
    }

    handleChange(e) { this.setState({ [e.target.name]: e.target.value }); }
    onSubmit(e) {
        const { course_name, description, grade: { value } } = this.state;
        const course = { course_name, grade: value, description };
        this.props.addCourse(course);

    };


    render() {
        const { course_name, description } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <h1>Add Course</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="course_name"
                            onChange={this.handleChange}
                            value={course_name}
                        />
                    </div>
                    <div className="form-group">
                        <label>Grade</label>
                        <GradeSelect onSelectGrade={this.handleGradeSelect} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input
                            className="form-control"
                            type="text"
                            name="description"
                            onChange={this.handleChange}
                            value={description}
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>

        )
    }
}

export default connect(null, { addCourse })(Form);
