import React from 'react';
import PropTypes from "prop-types";
import {Container} from "@yosmy/ui";
import {Phone, PhonePlaceholder} from "@yosmy/phone";
import {Device, DevicePlaceholder} from "@yosmy/device";

const SessionLayout = ({
    children, ...props
}) => {
    return <Container
        flow="row"
        margin={{
            top: 2
        }}
        {...props}
    >
        {children}
    </Container>
}

const Session = ({
    user, device, onSelectUser, onSelectDevice, ...props
}) => {
    return <SessionLayout
        {...props}
    >
        {user && <Phone
            country={user.country}
            prefix={user.prefix}
            number={user.number}
            onClick={() => {
                onSelectUser(user.id);
            }}
        />}
        {device && <Device
            margin={{
                left: user ? 1 : undefined
            }}
            data={device.data}
            onClick={() => {
                onSelectDevice(device.id)
            }}
        />}
    </SessionLayout>
}

const SessionProps = {
    user: PropTypes.object,
    device: PropTypes.object,
    onSelectUser: PropTypes.func,
    onSelectDevice: PropTypes.func
}

Session.propTypes = SessionProps;

const SessionPlaceholder = ({
    user, device, ...props
}) => {
    return <SessionLayout
        {...props}
    >
        {user && <PhonePlaceholder />}
        {device && <DevicePlaceholder
            margin={{
                left: user ? 1 : undefined
            }}
        />}
    </SessionLayout>
};

const SessionPlaceholderProps = {
    user: PropTypes.string,
    device: PropTypes.string,
}

SessionPlaceholder.propTypes = SessionPlaceholderProps;

export {
    Session, SessionProps,
    SessionPlaceholder, SessionPlaceholderProps
};