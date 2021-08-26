// Imports
import React from 'react';
import { t } from "@lingui/macro"
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined} from '@ant-design/icons';
import {useHistory } from 'react-router-dom';

// Components
import { RoundedButton } from 'components/RoundedButton'

// Apollo / GraphQL
import {loginMutation} from 'graphql/api'

// Helpers
import { signIn } from 'helpers/auth';
import { useApolloClient } from '@apollo/client';

//
// Core
//

// Define main state type
type LoginState = {
    formProcessing: boolean,
    formError: string | null
}

// Main element
function Login() {
    // Define state variables
    const [state, setState] = React.useState<LoginState>({ formProcessing: false, formError: null });

    // Define form variable
    const [form] = Form.useForm();

    // Load needed hooks
    const history = useHistory();
    const apolloClient = useApolloClient();

    //
    // UI Actions
    //
    const onPressSubmit = () => {
        form.submit();
    }

    const onLoginSubmit = () => {
        setState(prevState => ({ ...prevState, formProcessing: true, formError: null }))

        // Validate the form
        form.validateFields()
			.then((values) => {
                // Call the login Mutation
                loginMutation(apolloClient, values.mail, values.password).then((loginResult) => {
                    signIn(loginResult.id, loginResult.accessToken).then(() => {
                        console.log("Signin done => Redirect to main dashboard")
                        // Redirect to home
                        history.push("/")
                    })
                })
                .catch((error) => {
                    setState(prevState => ({ ...prevState, formProcessing: false, formError: error.message }))
                })

			})
			.catch((errorInfo) => {
                setState(prevState => ({ ...prevState, formProcessing: false, formError: "Form not valid" }))
            });
    }
    
    //
    // Rendering
    //
    return (
        <div className="notConnectedContainer">
            <div className="bg"></div>
            <div className="formContainer">
                <div className="formContent">
                    <span className="formTitle">{t`login_form_title`}</span>
                    <Form
                        name="login"
                        form={form}
                        className="formContent"
                        wrapperCol={{ span: 24 }}
                        onFinish={onLoginSubmit}
                    >
                        <Form.Item
                            name="mail"
                            rules={[{ required: true, type: "email", message: '' }]}
                            
                        >
                            <Input prefix={<UserOutlined />} placeholder={t`global_form_field_mail_placeholder`} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder={t`global_form_field_password_placeholder`} />
                        </Form.Item>

                        <RoundedButton className={`submitButton`} enabled={!state.formProcessing} loading={state.formProcessing} onClick={() => onPressSubmit()} text={t`login_form_main_cta`} />

                        {state.formError != null && <span className="formError">{state.formError}</span>}
                        
                        <a className="forgotPassword" href="/forgot-password">{t`login_form_forgot_password_cta`}</a> 
                    </Form>
                </div>
                <div className="formFooter">
                    <span>{t`login_form_no_account`}&nbsp;&nbsp;<a href="/signup">{t`login_form_no_account_link`}</a></span>
                </div>
            </div>
        </div>
    )
}

export default Login;