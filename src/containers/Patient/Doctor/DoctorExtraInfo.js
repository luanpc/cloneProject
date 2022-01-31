import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorDetail.scss';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import Select from 'react-select';
import './DoctorExtraInfo.scss';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isShowDetailInfo: false
        })
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }


    }

    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetailInfo: status
        })
    }

    render() {
        let { isShowDetailInfo } = this.state;
        return (
            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <div className='text-address'>ĐỊA CHỈ KHÁM</div>
                    <div className='name-clinic'>Phòng khám Chuyên khoa Da Liễu</div>
                    <div className='detail-address'>207 Phố Huế - Hai Bà Trưng - Hà Nội</div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfo === false &&
                        <div className='short-info'>GIÁ KHÁM: 300.000d.
                            <span onClick={() => this.showHideDetailInfo(true)}> Xem chi tiet</span>
                        </div>
                    }
                    {isShowDetailInfo === true &&
                        <>
                            <div className='title-price'>GIÁ KHÁM: </div>
                            <div className='detail-info'>
                                <div className='price'>
                                    <span className='left'>Giá khám</span>
                                    <span className='right'>300.000đ</span>
                                </div>
                                <div className='note'>
                                    Được ưu tiên khám trước khi đật khám qua BookingCare.
                                    Giá khám cho người nước ngoài là 30 USD
                                </div>
                            </div>
                            <div className='payment'>
                                Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ
                            </div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfo(false)}>
                                    Ẩn bảng giá
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
