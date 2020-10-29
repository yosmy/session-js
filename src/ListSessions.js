import React from 'react';
import PropTypes from "prop-types";
import {Container, LinePlaceholder, LoaderList, PrimaryButton, Text} from "@yosmy/ui";
import {enrich as phoneEnrich} from "@yosmy/phone";
import {enrich as deviceEnrich} from "@yosmy/device";
import {Session, SessionPlaceholder} from "./Session";

const ListSessions = ({
    ui, api, criteria, hide, onSelectUser, onSelectDevice
}) => {
    return <LoaderList
        ui={{
            layout: ui.layout,
            empty: () => {
                return <Text>No hay sessiones</Text>;
            },
            loading: () => {
                return <Container
                    margin={{
                        top: 2
                    }}
                >
                    <LinePlaceholder />
                    <LinePlaceholder />
                    <LinePlaceholder />
                </Container>
            },
            more: ({onClick}) => {
                return <Container
                    flow="row"
                    align={{
                        main: "center"
                    }}
                >
                    <PrimaryButton
                        margin={{
                            top: 2
                        }}
                        onClick={onClick}
                    >
                        <Text>Mostrar más</Text>
                    </PrimaryButton>
                </Container>
            },
            item: ({id, user, device}) => {
                if (typeof user === "string") {
                    return <SessionPlaceholder
                        key={id}
                        user={user}
                        device={device}
                    />;
                }

                user = !hide.user ? user : undefined;
                device = !hide.device ? device : undefined;

                return <Session
                    key={id}
                    user={user}
                    device={device}
                    onSelectUser={onSelectUser}
                    onSelectDevice={onSelectDevice}
                />
            }
        }}
        criteria={{
            query: {
                user: criteria.user,
                devices: criteria.devices,
            },
            limit: criteria.limit,
        }}
        onCollect={(query, skip, limit) => {
            return new Promise((resolve) => {
                api.collectSessions(
                    query.user,
                    query.devices,
                    skip,
                    limit,
                    // onReturn
                    (sessions) => {
                        resolve({
                            items: sessions,
                            onEnrich: async (sessions) => {
                                sessions = await phoneEnrich.enrichUsers(
                                    sessions,
                                    // filter
                                    () => {
                                        return true;
                                    },
                                    // pick
                                    (session) => {
                                        return session.user;
                                    },
                                    // collect
                                    (users) => {
                                        return new Promise((resolve) => {
                                            api.collectPhones(
                                                users,
                                                null,
                                                resolve
                                            );
                                        })
                                    },
                                    // enrich
                                    (session, user) => {
                                        return {
                                            ...session,
                                            user: user
                                        }
                                    }
                                );

                                sessions = await deviceEnrich.enrichDevices(
                                    sessions,
                                    // filter
                                    () => {
                                        return true;
                                    },
                                    // pick
                                    (session) => {
                                        return session.device;
                                    },
                                    // collect
                                    (devices) => {
                                        return new Promise((resolve) => {
                                            api.collectDevices(
                                                devices,
                                                resolve
                                            );
                                        })
                                    },
                                    // enrich
                                    (session, device) => {
                                        return {
                                            ...session,
                                            device: device
                                        }
                                    }
                                );

                                return sessions;
                            }
                        });
                    },
                )
            });
        }}
    />
}

const Props = {
    ui: PropTypes.shape({
        layout: PropTypes.func.isRequired
    }).isRequired,
    api: PropTypes.shape({
        collectSessions: PropTypes.func.isRequired,
        collectPhones: PropTypes.func.isRequired,
        collectDevices: PropTypes.func.isRequired,
    }).isRequired,
    criteria: PropTypes.shape({
        user: PropTypes.string,
        devices: PropTypes.arrayOf(PropTypes.string),
        limit: PropTypes.number
    }).isRequired,
    hide: PropTypes.shape({
        user: PropTypes.bool,
        device: PropTypes.bool,
    }).isRequired,
    onSelectUser: PropTypes.func,
    onSelectDevice: PropTypes.func
}

ListSessions.propTypes = Props;

ListSessions.defaultProps = {
    hide: {
        user: false,
        device: false
    }
};

export {ListSessions, Props};