/*
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Huawei Inc.
 */

import { FormOutlined } from '@ant-design/icons';
import { Badge, Col, Empty, Row, Space, Tooltip, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import appStyles from '../../../../styles/app.module.css';
import serviceOrderStyles from '../../../../styles/service-order.module.css';
import serviceEmptyStyles from '../../../../styles/services-empty.module.css';
import tableStyles from '../../../../styles/table.module.css';
import { UserOrderableServiceVo, category } from '../../../../xpanse-api/generated';
import { createServicePageRoute } from '../../../utils/constants';
import { groupServicesByLatestVersion } from '../common/utils/groupServicesByLatestVersion.ts';
import ServicesLoadingError from '../query/ServicesLoadingError';
import userOrderableServicesQuery from '../query/userOrderableServicesQuery';
import { useOrderFormStore } from '../store/OrderFormStore';
import ServicesSkeleton from './ServicesSkeleton';
import { UserServiceLatestVersionDisplayType } from './UserServiceLatestVersionDisplayType.ts';

function Services(): React.JSX.Element {
    const { Paragraph } = Typography;
    const navigate = useNavigate();
    const location = useLocation();
    const [clearFormVariables] = useOrderFormStore((state) => [state.clearFormVariables]);

    useEffect(() => {
        clearFormVariables();
    }, [clearFormVariables]);

    const onSelectService = function (serviceName: string, latestVersion: string) {
        navigate(
            createServicePageRoute
                .concat('?serviceName=', serviceName)
                .concat('&latestVersion=', latestVersion.replace(' ', ''))
                .concat('#', location.hash.split('#')[1])
        );
    };

    const orderableServicesQuery = userOrderableServicesQuery(location.hash.split('#')[1] as category, undefined);

    if (orderableServicesQuery.isError) {
        return <ServicesLoadingError error={orderableServicesQuery.error} />;
    }

    if (orderableServicesQuery.isLoading || orderableServicesQuery.isFetching) {
        return <ServicesSkeleton />;
    }

    const userOrderableServiceList: UserOrderableServiceVo[] | undefined = orderableServicesQuery.data;
    let serviceList: UserServiceLatestVersionDisplayType[] = [];
    if (userOrderableServiceList !== undefined && userOrderableServiceList.length > 0) {
        serviceList = groupServicesByLatestVersion(userOrderableServiceList, '');
    }

    if (serviceList.length === 0) {
        return (
            <div className={serviceEmptyStyles.serviceBlankClass}>
                <Empty description={'No services available.'} />
            </div>
        );
    }

    return (
        <div className={tableStyles.genericTableContainer}>
            <div className={appStyles.contentTitle}>
                <FormOutlined />
                &nbsp;Select Service
            </div>

            <div className={serviceOrderStyles.servicesContentBody}>
                {serviceList.map((item, index) => {
                    return (
                        <Row key={index}>
                            <Col span={8} className={serviceOrderStyles.servicesContentBodyCol}>
                                <Space direction='vertical' size='middle'>
                                    <Badge.Ribbon text={item.latestVersion}>
                                        <div
                                            key={index}
                                            className={serviceOrderStyles.serviceTypeOptionDetail}
                                            onClick={() => {
                                                onSelectService(item.name, item.latestVersion);
                                            }}
                                        >
                                            <div className={serviceOrderStyles.serviceTypeOptionImage}>
                                                <img
                                                    className={serviceOrderStyles.serviceTypeOptionServiceIcon}
                                                    src={item.icon}
                                                    alt={'App'}
                                                />
                                            </div>
                                            <div className={serviceOrderStyles.serviceTypeOptionInfo}>
                                                <span className={serviceOrderStyles.serviceTypeOption}>
                                                    <Tooltip placement='topLeft' title={item.name}>
                                                        <Paragraph
                                                            className={serviceOrderStyles.serviceTypeOptionServiceName}
                                                            ellipsis={true}
                                                        >
                                                            {item.name}
                                                        </Paragraph>
                                                    </Tooltip>
                                                </span>
                                                <span className={serviceOrderStyles.serviceTypeOptionDescription}>
                                                    {item.content}
                                                </span>
                                            </div>
                                        </div>
                                    </Badge.Ribbon>
                                </Space>
                            </Col>
                        </Row>
                    );
                })}
            </div>
        </div>
    );
}

export default Services;
