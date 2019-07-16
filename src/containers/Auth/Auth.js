import React, { Component } from 'react';
import './Auth.css';

//Components
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';
//Redux
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
//Utility
import { updateObject, checkValidity } from '../../utility/utility';
export class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email@domain.com'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount() {
        //make sure we're not redirecting to checkout even if we did not start buildin a burger
        if (!this.props.startedBuilding && this.props.authRedirectPath !== '/') {
            this.props.initAuthRedirectPath();
        }
    }

    //Toggle between signup or login
    toggleAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp };
        })
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });

        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        };

        let form = (
            formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ))
        );
        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (<p>{this.props.error.message}</p>);
        }

        let redirectWhenAuth = null;
        if (this.props.isAuthenticated) {
            redirectWhenAuth = <Redirect to={this.props.authRedirectPath} />;
        }
        return (
            <div className="Auth">
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">{this.state.isSignUp ? 'SIGN UP' : 'LOG IN'}</Button>
                </form>
                <Button btnType="Danger" clicked={this.toggleAuthModeHandler}>SWITCH TO {this.state.isSignUp ? 'LOG IN ' : 'SIGN UP'}</Button>
                {redirectWhenAuth}
            </div>
        );

    }
};

const mapStateToProps = state => {
    return {
        //for changing UI
        loading: state.auth.loading,
        error: state.auth.error,
        //for redirecting if authenticated
        isAuthenticated: state.auth.token !== null,
        //for checking at component did mount
        startedBuilding: state.burger.startedBuilding,
        //and setting a dynamic path for our redirect
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.authenticateUser(email, password, isSignup)),
        initAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);