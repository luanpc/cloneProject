import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { getAllSpecialty } from '../../../services/userService';
import './Specialty.scss';
class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            specialties: []
        })
    }
    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                specialties: res.data ? res.data : []
            })
        }
    }

    render() {
        let { specialties } = this.state;
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id={'homepage.specialty-popular'} /></span>
                        <button className='btn-section'><FormattedMessage id={'homepage.more-info'} /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {specialties && specialties.length > 0 &&
                                specialties.map((item, index) => {
                                    return (
                                        <div className='section-customize specialty-child' key={index}>
                                            <div className='bg-image section-specialty'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            ></div>
                                            <div className='specialty-name'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

// map state tu file appReducer.js
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
