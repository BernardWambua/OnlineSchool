import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import CourseSelect from "./CourseSelect";
import { addChapter } from "../../actions/chapters";


class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chapter_name: "",
            selectedFile: null,
            course: null
        }
        this.onFileChange = this.onFileChange.bind(this)
        this.handleCourseSelect = this.handleCourseSelect.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };
    // On file select (from the pop up) 
    onFileChange(event) {

        // Update the state 
        this.setState({ selectedFile: event.target.files[0] });

    };

    static propTypes() {
        addChapter: PropTypes.func.isRequired;
    };
    handleCourseSelect(courseValue) {
        this.setState({ course: courseValue });
    }

    handleChange(e) { this.setState({ [e.target.name]: e.target.value }); }
    onSubmit() {
        const { chapter_name, selectedFile, course: { value } } = this.state;
        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append("chapter_name", chapter_name)
        formData.append(
            "content", selectedFile, selectedFile.name
        );
        formData.append("course", value)
        this.props.addChapter(formData);

    };

    render() {
        const { chapter_name, selectedFile } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <h1>Add Chapter</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="chapter_name"
                            onChange={this.handleChange}
                            value={chapter_name}
                        />
                    </div>
                    <div className="form-group">
                        <label>Content</label>
                        <input
                            className="form-control"
                            type="file"
                            onChange={this.onFileChange}
                            name="selectedFile"
                        />
                    </div>
                    <div className="form-group">
                        <label>Course</label>
                        <CourseSelect onSelectCourse={this.handleCourseSelect} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                    </div>
                </form>
            </div>

        )
    }
}

export default connect(null, { addChapter })(Form);