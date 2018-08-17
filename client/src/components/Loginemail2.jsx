import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import UserRemixGallery from '../UserRemixGallery';
import UserButtons from '../UserButtons';

class Loginregister extends Component {

    constructor(props) {
        super(props);

        // this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            user: [],
            signupFormVisible: false,
        };
    }

    render() {
        return (
            
        <div className="login-form">
            {this.state.user ? (
                <div className="user" onSubmit={this.showProfile}>
                    {/* <h1 className="hello">HELLO {this.state.user.username}</h1>
                    <h1 className="hello"></h1> */}
                    <UserRemixGallery/>
                    {/* <UserButtons/> */}
                    {this.ifDisplay()}
                    <button className="submitbuttons" onClick={this.logout}> I'm button </button>
                    {/* <button className="submitbuttons" onClick={this.logout}>Log Out</button> */}
                </div>
            ) : (
                <div className="user-form">
                    <button className="topbuttons" onClick={this.showSignupForm} disabled={this.state.signupFormVisible}>Register</button>
                    <button className="topbuttons" onClick={this.showLoginForm} disabled={!this.state.signupFormVisible}>Login</button>
                    {this.state.signupFormVisible ? (
                        <form id="registerForm" onSubmit={this.register}>
                            {/* <h2>Register</h2> */}
                            <div className="form-field">
                                <label htmlFor="registerEmail">Email:</label>
                                <input name="registerEmail" type="text" required />
                            </div>
                            <div className="form-field">
                                <label htmlFor="registerUsername">Username:</label>
                                <input name="registerUsername" type="text" required />
                            </div>
                            <div className="form-field">
                                <label htmlFor="registerPassword">Password:</label>
                                <input name="registerPassword" type="password" required />
                            </div>
                            <button className="submitbuttons" type="submit">Register</button>
                        </form>
                    ) : (
                        <form id="loginForm" onSubmit={this.login}>
                            {/* <h2>Login</h2> */}
                            <div className="form-field">
                                <label htmlFor="username">Username:</label>
                                <input name="username" type="text" required />
                            </div>
                            <div className="form-field">
                                <label htmlFor="password">Password:</label>
                                <input name="password" type="password" required />
                            </div>
                            <button className="submitbuttons" type="submit">Login</button>
                        </form>
                    )}
                </div>
            )
            }
        </div>
        );
    }

    ifDisplay = (res) => {
        const loggedUserId = this.state.user.id;
        if (isNaN(loggedUserId)) {
            return (
                'Please click a button to Login or Register'
            );
        }
        return (
            'Please click button to Logout'
        );
    }

    showLoginForm = (event) => {
        this.setState({
            signupFormVisible: false,
        })
    }

    showSignupForm = (event) => {
        this.setState({
            signupFormVisible: true,
        })
    }

    register = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: '/auth/signup',
            data: {
                email: event.target.registerEmail.value,
                username: event.target.registerUsername.value,
                password: event.target.registerPassword.value,
            }
        })
            .then((res) => {
                this.showLoginForm();
                console.log(res);
            })
            .catch((res) => {
                console.log(res);
                // Is there where alert box would go for failed registration?
                swal("Registration Failed", "...please try again!");
            });
    }

    login = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: '/auth/login',
            data: {
                username: event.target.username.value,
                password: event.target.password.value,
            }
        })
        .then((res) => {
            this.setState({
                user: res.data.user,
                showSignupForm: false,
            })
            // console.log(res);
        })
        .catch((res) => {
            console.log(res);
            // Is there where alert box would go for failed login?
            swal("Incorrect Login", "...please try again!");
        });
    }

    logout = () => {
        axios({
            method: 'get',
            url: '/auth/logout'
        })
        .then(() => {
            this.setState({
                user: null,
            })
        })
        .catch((res) => {
            console.log(res);
        });
    }
}

export default Loginregister;
