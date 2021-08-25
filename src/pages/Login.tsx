// Imports
import React from 'react';
import { t } from "@lingui/macro"
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined} from '@ant-design/icons';

// Components
import { RoundedButton } from 'components/RoundedButton'


//
// Core
//

// Define main state type
type LoginState = {
    formProcessing: Boolean,
    formError: String | null
}

// Main element
const Login = () => {
    // Define state variables
    const [state, setState] = React.useState<LoginState>({ formProcessing: false, formError: null });

    // Define form variable
    const [form] = Form.useForm();

    //
    // UI Actions
    //
    const onPressSubmit = () => {
        form.submit();
    }

    const onSubmit = () => {
        setState(prevState => ({ ...prevState, formProcessing: true, formError: null }))

        form.validateFields()
			.then((values) => {
				
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
                        onFinish={onSubmit}
                    >
                        <Form.Item
                            name="mail"
                            rules={[{ required: true, type: "email", message: '' }]}
                            
                        >
                            <Input prefix={<UserOutlined />} placeholder={t`login_form_field_mail_placeholder`} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder={t`login_form_field_password_placeholder`} />
                        </Form.Item>

                        <RoundedButton className={`submitButton`} enabled={!state.formProcessing} loading={state.formProcessing} onClick={() => onPressSubmit()} text={t`login_form_main_cta`} />

                        <a className="forgotPassword" href="/forgot-password">{t`login_form_forgot_password_cta`}</a>
                    </Form>
                </div>
                <div className="formFooter">

                </div>
            </div>
        </div>
    )
 }

export default Login;
