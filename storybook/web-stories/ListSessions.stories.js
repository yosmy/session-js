import React from 'react';
import {ThemeProvider} from "@yosmy/style";
import {EmptyLayout} from "@yosmy/ui";
import theme from "../Theme";

import {ListSessions} from '../ListSessions';

export default {
  title: 'ListSessions',
  component: ListSessions,
};

const Template = () => {
    return <ThemeProvider theme={theme}>
        <ListSessions
            ui={{
                layout: EmptyLayout
            }}
            api={{
                collectSessions: (users, devices, skip, limit, onReturn) => {
                    onReturn([
                        {
                            id: "1",
                            user: "user-1",
                            device: "device-1"
                        },
                        {
                            id: "2",
                            user: "user-2",
                            device: "device-2"
                        },
                    ]);
                },
                collectPhones: (users, phones, onReturn) => {
                    setTimeout(
                        () => {
                            onReturn([
                                {
                                    user: "user-1",
                                    country: "US",
                                    prefix: "1",
                                    number: "7867861234"
                                },
                                {
                                    user: "user-2",
                                    country: "US",
                                    prefix: "1",
                                    number: "7867865678"
                                }
                            ]);
                        },
                        3000
                    );
                },
                collectDevices: (ids, onReturn) => {
                    setTimeout(
                        () => {
                            onReturn([
                                {
                                    id: "device-1",
                                    data: {
                                        device: {
                                            modelName: "Model 1",
                                            osInternalBuildId: "Internal 1"
                                        }
                                    }
                                },
                                {
                                    id: "device-2",
                                    data: {
                                        device: {
                                            modelName: "Model 2",
                                            osInternalBuildId: "Internal 2"
                                        }
                                    }
                                }
                            ]);
                        },
                        3000
                    )
                },
            }}
            criteria={{
                user: null,
                devices: null,
                limit: 20
            }}
    />
    </ThemeProvider>
};

export const Default = Template.bind({});

