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
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import { getDetailInfoDoctor } from '../../../services/userService';
const mdParser = new MarkdownIt();

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            allDoctors: '',
            hasOldData: false,

            //save to doctor_info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.getRequiredDoctorInfo();
    }

    fillDataToSelect = (data, type) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            if (type === 'USERS') {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.firstName} ${item.lastName}`;
                    let labelEn = `${item.lastName} ${item.firstName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'PRICE') {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language || prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo ||
            prevProps.allDoctors !== this.props.allDoctors
        ) {
            let dataSelect = this.fillDataToSelect(this.props.allDoctors, 'USERS');
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo
            let dataSelectPrice = this.fillDataToSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.fillDataToSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.fillDataToSelect(resProvince, 'PROVINCE');
            this.setState({
                allDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
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
        let { hasOldData } = this.state;

        this.props.saveDoctorDetail({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note
        })
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailInfoDoctor(selectedDoctor.value);

        if (res && res.errCode === 0 && res.data && res.data.Markdown && res.data.Markdown.contentHTML && res.data.Markdown.contentMarkdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
    }

    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    render() {
        let { hasOldData } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'><FormattedMessage id="admin.manage-doctor.title" /></div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ</label>
                        <Select value={this.state.selectedDoctor}
                            options={this.state.allDoctors}
                            onChange={this.handleChangeSelect}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id="admin.manage-doctor.intro" /></label>
                        <textarea className='form-control'
                            onChange={(event) => this.handleOnChangeText(event)}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>

                <div className='more-info-extra row'>
                    <div className='col-4 form-group'>
                        <Select value={this.state.selectedPrice}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            onChange={this.handleChangeSelectDoctorInfo}
                            name='selectedPrice'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <Select value={this.state.selectedPayment}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            onChange={this.handleChangeSelectDoctorInfo}
                            name='selectedPayment'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <Select value={this.state.selectedProvince}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            onChange={this.handleChangeSelectDoctorInfo}
                            name='selectedProvince'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                        />
                    </div>
                </div>

                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>

                <button className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    {hasOldData === true ?
                        <span>
                            <FormattedMessage id="admin.manage-doctor.save-info" />
                        </span>
                        :
                        <span>
                            <FormattedMessage id="admin.manage-doctor.create-info" />
                        </span>
                    }
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch((actions.fetchAllDoctor())),
        saveDoctorDetail: (data) => dispatch((actions.saveDoctorDetail(data))),
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
