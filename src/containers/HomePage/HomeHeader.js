import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';

class HomeHeader extends Component {
    changeLanguage = (language) => {
        //props of redux (not from parents to child)
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        //prop of redux
        let language = this.props.language;

        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className='fas fa-bars'></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.specialty" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.select-room" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.select-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.fee" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.check-health" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className='fas fa-question-circle'><FormattedMessage id="homeheader.support" /></i></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'><FormattedMessage id="banner.title1" /></div>
                        <div className='title2'><FormattedMessage id="banner.title2" /></div>
                        <div className='search'>
                            <i className='fas fa-search'></i>
                            <input type='text' placeholder='Tìm chuyên khoa' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-chuyen-khoa'></div>
                                <div className='text-child'><FormattedMessage id="banner.chuyenkhoa" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-kham-tu-xa'></div>
                                <div className='text-child'><FormattedMessage id="banner.khamtuxa" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-tong-quat'></div>
                                <div className='text-child'><FormattedMessage id="banner.khamtongquat" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-y-hoc'></div>
                                <div className='text-child'><FormattedMessage id="banner.yhoc" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-tinh-than'></div>
                                <div className='text-child'><FormattedMessage id="banner.tinhthan" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-nha-khoa'></div>
                                <div className='text-child'><FormattedMessage id="banner.nhakhoa" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
