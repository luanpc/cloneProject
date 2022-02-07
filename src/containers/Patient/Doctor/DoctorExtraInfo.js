import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorDetail.scss';
import { getExtraInfoDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import Select from 'react-select';
import './DoctorExtraInfo.scss';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isShowDetailInfo: false,
            extraInfor: {}
        })
    }
    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }

    }

    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetailInfo: status
        })
    }

    render() {
        let { isShowDetailInfo, extraInfor } = this.state;
        let { language } = this.props;
        return (
            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <div className='text-address'>
                        <FormattedMessage id="patient.extra-info-doctor.text-address" />
                    </div>
                    <div className='name-clinic'>
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfo === false &&
                        <div className='short-info'>
                            <FormattedMessage id="patient.extra-info-doctor.price" />:
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                &&
                                <NumberFormat
                                    className='currency'
                                    thousandSeparator={true}
                                    displayType={'text'}
                                    suffix={'VND'}
                                    value={extraInfor.priceTypeData.valueVi} />
                            }
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                &&
                                <NumberFormat
                                    className='currency'
                                    thousandSeparator={true}
                                    displayType={'text'}
                                    suffix={'$'}
                                    value={extraInfor.priceTypeData.valueEn} />
                            }
                            <span className='detail' onClick={() => this.showHideDetailInfo(true)}>
                                <FormattedMessage id="patient.extra-info-doctor.detail" />
                            </span>
                        </div>
                    }
                    {isShowDetailInfo === true &&
                        <>
                            <div className='title-price'><FormattedMessage id="patient.extra-info-doctor.price" />: </div>
                            <div className='detail-info'>
                                <div className='price'>
                                    <span className='left'><FormattedMessage id="patient.extra-info-doctor.price" /></span>
                                    <span className='right'>
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                            &&
                                            <NumberFormat
                                                className='currency'
                                                thousandSeparator={true}
                                                displayType={'text'}
                                                suffix={'VND'}
                                                value={extraInfor.priceTypeData.valueVi} />
                                        }
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                            &&
                                            <NumberFormat
                                                className='currency'
                                                thousandSeparator={true}
                                                displayType={'text'}
                                                suffix={'$'}
                                                value={extraInfor.priceTypeData.valueEn} />
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>
                            <div className='payment'>
                                <FormattedMessage id="patient.extra-info-doctor.payment" />
                                {extraInfor && extraInfor.paymentTypeData &&
                                    language === LANGUAGES.VI ? extraInfor.paymentTypeData.valueVi : ''}
                                {extraInfor && extraInfor.paymentTypeData &&
                                    language === LANGUAGES.EN ? extraInfor.paymentTypeData.valueEn : ''}
                            </div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfo(false)}>
                                    <FormattedMessage id="patient.extra-info-doctor.hide-price" />
                                </span>
                            </div>
                        </>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
