// Imports
import React, { useEffect } from 'react';
import { t } from "@lingui/macro"
import { useApolloClient } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';

import { Col, Form, Input, Row, notification } from 'antd';
import { MailOutlined, TagOutlined } from '@ant-design/icons';

// Apollo / GraphQL
import {getUser, updateUser} from 'graphql/api'

// Components
import MainLayout from 'components/templates/MainLayout';
import SettingsLayout from 'components/templates/SettingsLayout';
import { RoundedButton } from 'components/RoundedButton';

//
// Core
//

// Define main state type
type SettingsState = {
    user: any,
    formProcessing: boolean,
    formError: string | null
}

// Main element
function Settings() {
    // Load hooks
    const apolloClient = useApolloClient();

    // Define state variables
    const [state, setState] = React.useState<SettingsState>({ user: null, formProcessing: false, formError: null });

    // Define form variable
    const [form] = Form.useForm();

    // Run this at the page mount
    useEffect(() => {
        // Retrieve user
        getUser(apolloClient).then((user) => {
            setState(prevState => ({ ...prevState, user}))

            // Update form values with user retrieved
            form.setFieldsValue({firstName: user.firstName, lastName: user.lastName, mail: user.mail})
        })
        .catch((error) => {

        })
    }, [apolloClient, form])

    //
    // UI Actions
    //
    const onPressSubmit = () => {
        form.submit();
    }

    const onSubmit = () => {
        setState(prevState => ({ ...prevState, formProcessing: true, formError: null }))

        // Validate the form
        form.validateFields()
			.then((values) => {
                // Call the updateUser Mutation
                updateUser(apolloClient, values.firstName, values.lastName, values.mail).then((result) => {

                    notification.success({
                        message: t`settings_view_update_success_title`,
                        description: t`settings_view_update_success_desc`
                    })

                    setState(prevState => ({ ...prevState, formProcessing: false}))
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
    // Render
    //
    return (
        <MainLayout>
            <SettingsLayout title={t`settings_view_title`} icon={<FontAwesomeIcon icon={faSlidersH} />}>
                <h2>{t`settings_view_profile_update_title`}</h2>

                <Row>
                    <Col xs={24} sm={14} md={8}>
                        <Form
                            name="settings"
                            form={form}
                            className="siteForm"
                            wrapperCol={{ span: 24 }}
                            onFinish={onSubmit}
                            size="large"
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
                                <Input prefix={<MailOutlined />} placeholder={t`global_form_field_mail_placeholder`} />
                            </Form.Item>

                            <RoundedButton className={`submitButton`} enabled={!state.formProcessing} loading={state.formProcessing} onClick={() => onPressSubmit()} text={t`global_form_save_cta`} />

                            {state.formError != null && <span className="formError">{state.formError}</span>}
                        </Form>
                    </Col>
                </Row>

            </SettingsLayout>
            
        </MainLayout>
    )
}

export default Settings;
