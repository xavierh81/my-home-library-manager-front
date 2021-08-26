// Imports
import React from 'react';
import { t } from "@lingui/macro"
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined, TagOutlined} from '@ant-design/icons';
import {useHistory } from 'react-router-dom';

// Components
import { RoundedButton } from 'components/RoundedButton'

// Apollo / GraphQL
import {registerMutation} from 'graphql/api'

// Helpers
import { signIn } from 'helpers/auth';
import { useApolloClient } from '@apollo/client';

//
// Core
//

// Define main state type
type RegisterState = {
    formProcessing: boolean,
    formError: string | null
}

// Main element
function Register() {
    // Define state variables
    const [state, setState] = React.useState<RegisterState>({ formProcessing: false, formError: null });

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

    const onRegisterSubmit = () => {
        setState(prevState => ({ ...prevState, formProcessing: true, formError: null }))

        // Validate the form
        form.validateFields()
			.then((values) => {
                // Call the login Mutation
                registerMutation(apolloClient, values.firstName, values.lastName, values.mail, values.password).then((loginResult) => {
                    signIn(loginResult.id, loginResult.accessToken).then(() => {
                        console.log("Signup done => Redirect to main dashboard")
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
            <div className="formContainer registerForm">
                <div className="formContent">
                    <span className="formTitle">{t`register_form_title`}</span>
                    <Form
                        name="login"
                        form={form}
                        className="formContent"
                        wrapperCol={{ span: 24 }}
                        onFinish={onRegisterSubmit}
                    >
                        <Form.Item
                            name="firstName"
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input prefix={<TagOutlined />} placeholder={t`global_form_field_firstname_placeholder`} />
                        </Form.Item>

                        <Form.Item
                            name="lastName"
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input prefix={<TagOutlined />} placeholder={t`global_form_field_lastname_placeholder`} />
                        </Form.Item>

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

                        <RoundedButton className={`submitButton`} enabled={!state.formProcessing} loading={state.formProcessing} onClick={() => onPressSubmit()} text={t`register_form_main_cta`} />

                        {state.formError != null && <span className="formError">{state.formError}</span>}
                    </Form>
                </div>
                <div className="formFooter">
                    <span>{t`register_form_already_have_account`}&nbsp;&nbsp;<a href="/login">{t`register_form_already_have_account_link`}</a></span>
                </div>
            </div>
        </div>
    )
}

export default Register;
