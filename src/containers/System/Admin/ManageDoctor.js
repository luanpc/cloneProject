import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
//import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            allDoctors: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
    }

    fillDataToSelect = (data) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                let labelVi = `${item.firstName} ${item.lastName}`;
                let labelEn = `${item.lastName} ${item.firstName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors || prevProps.language !== this.props.language) {
            let dataSelect = this.fillDataToSelect(this.props.allDoctors);
            this.setState({
                allDoctors: dataSelect
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleSaveContentMarkdown = () => {
        this.props.saveDoctorDetail({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value
        })
    }

    handleChange = selectedDoctor => {
        this.setState({ selectedDoctor });
    }

    handleChangeDescript = (event) => {
        this.setState({ description: event.target.value })
    }
    render() {
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>create doctor info</div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ</label>
                        <Select value={this.state.selectedDoctor}
                            options={this.state.allDoctors}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu</label>
                        <textarea className='form-control' rows="4"
                            onChange={(event) => this.handleChangeDescript(event)} value={this.state.description}
                        >
                            kalsdjak
                        </textarea>
                    </div>
                </div>

                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }} renderHTML={text =>
                        mdParser.render(text)} onChange={this.handleEditorChange} />
                </div>

                <button className='save-content-doctor'
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    Lưu thông tin
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch((actions.fetchAllDoctor())),
        saveDoctorDetail: (data) => dispatch((actions.saveDoctorDetail(data)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);