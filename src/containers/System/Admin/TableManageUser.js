import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                userRedux: this.props.users
            })
        }
    }
    handleDelete = (user) => {
        this.props.deleteUserRedux(user.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user)
    }
    render() {
        let arrUsers = this.state.userRedux;
        return (
            <table id='TableManageUser'>
                <tr>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
                {arrUsers && arrUsers.length > 0 &&
                    arrUsers.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className='btn-edit'
                                        onClick={() => this.handleEditUser(item)}
                                    >
                                        <i className='fas fa-pencil-alt'></i>
                                    </button>

                                    <button className='btn-delete'
                                        onClick={() => this.handleDelete(item)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch((actions.fetchAllUsersStart())),
        deleteUserRedux: (id) => dispatch(actions.deleteUserAction(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
