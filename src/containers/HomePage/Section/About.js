import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {
    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói gì về BookingCare
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="300px"
                            src="https://www.youtube.com/embed/7tiR7SI4CkI"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>BookingCare-Khám bệnh online là Nền tảng Y tế Chăm sóc sức khỏe toàn diện kết nối người dùng đến với dịch vụ y tế - chăm sóc sức khỏe chất lượng, ..</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
